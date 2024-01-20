package com.collegemanagement.entity;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.hibernate.engine.jdbc.connections.spi.JdbcConnectionAccess;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CustomIdGenerator implements IdentifierGenerator {

	private static final long serialVersionUID = 1L;

	private final String prefix = "USER-";
	private long sequence;

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) {
		JdbcConnectionAccess jdbcConnectionAccess = null;
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		try {
			jdbcConnectionAccess = session.getJdbcConnectionAccess();
			connection = jdbcConnectionAccess.obtainConnection();

			// Use a single query to get the maximum user_id and check if any rows exist
			String query = "SELECT MAX(user_id), COUNT(user_id) FROM userdata";
			preparedStatement = connection.prepareStatement(query);
			resultSet = preparedStatement.executeQuery();
			if (resultSet.next()) {
				int rowCount = resultSet.getInt(2);
				if (rowCount == 0) {
					// If no rows exist, reset the sequence to the starting value
					sequence = 0;
				} else {
					// If rows exist, update the sequence based on the maximum user_id
					String dbId = resultSet.getString(1);
					sequence = (dbId == null) ? 0 : Integer.parseInt(dbId.substring(prefix.length()));
				}
				// Increment the sequence for the next user_id
				return prefix + String.format("%03d", ++sequence);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (preparedStatement != null) {
					preparedStatement.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}