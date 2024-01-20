package com.collegemanagement.entity;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.hibernate.engine.jdbc.connections.spi.JdbcConnectionAccess;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CustomIdGenerator implements IdentifierGenerator {

	private static final long serialVersionUID = 1L;

	private final String prefix = "USER-";
	private long sequence = 0;

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) {
		JdbcConnectionAccess jdbcConnectionAccess = null;
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		try {
			jdbcConnectionAccess = session.getJdbcConnectionAccess();
			connection = jdbcConnectionAccess.obtainConnection();
			statement = connection.createStatement();

//			String query = "select count(user_id) as Id from userdata"; //sol-1 by counting number of users present in db
			String query = "select max(user_id) from userdata"; // sol-2 by fetching the latest user inserted in db

			resultSet = statement.executeQuery(query);

			if (resultSet.next()) {
//				sequence = resultSet.getInt(1)+1; //sol-1
				String dbId = resultSet.getString(1); // sol-2
				if (dbId == null) {
					return prefix + String.format("%03d", ++sequence);
				} else {
					sequence = Integer.parseInt(dbId.substring(prefix.length()));
					return prefix + String.format("%03d", ++sequence);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (statement != null) {
					statement.close();
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