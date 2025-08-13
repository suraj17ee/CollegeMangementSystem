import { useEffect, useState } from "react";
import userservice from "../service/userservice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogout } from "../service/auth";
import './Dashboard.css';

const Dashboard = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        userservice.getAllUsers()
            .then((res) => {
                setUserList(res.data);
            })
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 401) {
                    toast.error(error.response.data);
                    toast.error("Sorry!! You are not authorized for dashboard view!");
                } else {
                    toast.error("Error while connecting to server!!");
                    console.error(error);
                }
            });
    };

    const deleteUserDetails = (userEmail) => {
        userservice.deleteUser(userEmail)
            .then(() => {
                toast.success("User details removed successfully!");
                init();
            })
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.error(error);
                }
            });
    };

    const deleteAllUserDetails = () => {
        userservice.deleteAllUsers()
            .then(() => {
                toast.success("All user details removed successfully!");
                init();
            })
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.error(error);
                }
            });
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        doLogout();
        navigate("/login");
    };

    return (
        <div className="container py-4">
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div className="card-header dashboard-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">📋 User Details</h5>
                                <button onClick={handleLogout} className="btn btn-dark btn-sm fw-bold shadow-sm">
                                    🚪 Logout
                                </button>
                            </div>

                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="dashboard-table-header">
                                            <tr>
                                                <th>Sl No</th>
                                                <th>User Id</th>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Address</th>
                                                <th>DOB</th>
                                                <th>Gender</th>
                                                <th>Role</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userList.length > 0 ? (
                                                userList.map((user, num) => {
                                                    const isFirstRow = num === 0;
                                                    return (
                                                        <tr key={num} className={isFirstRow ? "table-warning" : ""}>
                                                            <td>{num + 1}</td>
                                                            <td>{user.userId}</td>
                                                            <td>{user.userName}</td>
                                                            <td>{user.userEmail}</td>
                                                            <td>{user.userMobile}</td>
                                                            <td>{user.userAddress}</td>
                                                            <td>{user.userDob}</td>
                                                            <td>{user.userGender}</td>
                                                            <td>
                                                                <span className="badge bg-info text-dark">{user.roles}</span>
                                                            </td>
                                                            <td className="text-center">
                                                                {!isFirstRow && (
                                                                    <>
                                                                        <Link
                                                                            to={`/edituser/${user.userId}`}
                                                                            className="btn btn-sm btn-outline-primary me-1"
                                                                        >
                                                                            ✏️ Edit
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => deleteUserDetails(user.userEmail)}
                                                                            className="btn btn-sm btn-outline-danger"
                                                                        >
                                                                            🗑️ Delete
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="text-center text-muted py-4">
                                                        No users found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="card-footer dashboard-footer text-end">
                                <button
                                    onClick={deleteAllUserDetails}
                                    className="btn btn-dark fw-bold shadow-sm"
                                >
                                    🧹 Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;