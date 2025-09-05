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
        <div className="container-fluid py-4"> {/* full-width base */}
            <div className="dashboard">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <div className="card-header dashboard-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold">📋 Welcome to ADMIN view {userList.length > 0 ? userList[0].userName.toUpperCase() : "Admin"} !</h5>
                        <button onClick={handleLogout} className="btn btn-dark btn-sm fw-bold shadow-sm">
                            🚪 Logout
                        </button>
                    </div>

                    <div className="card-body">
                        {userList.length > 0 ? (
                            <div className="row g-3">
                                {userList.map((user, num) => {
                                    const isFirstRow = num === 0;
                                    return (
                                        <div key={num} className="col-12 col-md-6 col-lg-4">
                                            <div
                                                className={`card shadow-sm border-0 rounded-4 h-100 ${
                                                    isFirstRow ? "border-warning border-3" : ""
                                                }`}
                                            >
                                                <div className="card-body d-flex flex-column justify-content-between">
                                                    <div>
                                                        <h5 className="card-title fw-bold mb-2">{user.userName}</h5>
                                                        <p className="card-text text-muted mb-1"><strong>User ID:</strong> {user.userId}</p>
                                                        <p className="card-text text-muted mb-1"><strong>Email:</strong> {user.userEmail}</p>
                                                        <p className="card-text text-muted mb-1"><strong>Mobile:</strong> {user.userMobile}</p>
                                                        <p className="card-text text-muted mb-1"><strong>Address:</strong> {user.userAddress}</p>
                                                        <p className="card-text text-muted mb-1"><strong>DOB:</strong> {user.userDob}</p>
                                                        <p className="card-text text-muted mb-1"><strong>Gender:</strong> {user.userGender}</p>
                                                        <p className="mb-0">
                                                            <span className="badge bg-info text-dark">{user.roles}</span>
                                                        </p>
                                                    </div>
                                                    <div className="mt-3 text-end">
                                                        {!isFirstRow && (
                                                            <>
                                                                <Link
                                                                    to={`/edituser/${user.userId}`}
                                                                    className="btn btn-sm btn-outline-primary me-2"
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-muted py-4">No users found</p>
                        )}
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
    );
};

export default Dashboard;
