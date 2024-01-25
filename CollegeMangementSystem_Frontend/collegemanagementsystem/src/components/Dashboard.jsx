import { useEffect, useState } from "react";
import userservice from "../service/userservice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogout } from "../service/auth";

const Dashboard = () => {

    const [userList, setUserList] = useState([]);
    // const [msg, setMsg] = useState("");// instead of using msg now using toasts
    useEffect(() => {
        init();
    }, [])

    const init = () => {
        userservice.getAllUsers()
            .then((res) => {
                setUserList(res.data);
            })
            .catch((error) => {
                if (error.response.status == 400 | error.response.status == 401) {
                    toast.error(error.response.data);
                    toast.error("Sorry!! You are not authorized for dashboard view!");
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            })
    }

    const deleteUserDetails = (userEmail) => {
        userservice.deleteUser(userEmail)
            .then((res) => {
                // setMsg("User details removed successfully!");
                toast.success("User details removed successfully!");
                init();
            })
            .catch((error) => {
                if (error.response.status == 400 | error.response.status == 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            })
    }

    const deleteAllUserDetails = () => {
        userservice.deleteAllUsers()
            .then((res) => {
                // setMsg("All user details removed successfully!");
                toast.success("All user details removed successfully!");
                init();
            })
            .catch((error) => {
                if (error.response.status == 400 | error.response.status == 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            })
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        doLogout();
        console.log("logout clicked");
        navigate("/login");
    }

    return (
        <div className="container mt-3">
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header text-center fw-bold fs-5">
                                User Details
                                {/* <p className='text-success'>{msg}</p> */}
                                <div className="d-flex justify-content-md-end">
                                    <button onClick={handleLogout} className="btn btn-warning m-1 text-dark fw-bold">Logout</button>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sl No</th>
                                            <th scope="col">User Id</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Mobile</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">DOB</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userList.map((user, num) =>
                                                <tr key={num}>
                                                    <td>{num + 1}</td>
                                                    <td>{user.userId}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.userEmail}</td>
                                                    <td>{user.userMobile}</td>
                                                    <td>{user.userAddress}</td>
                                                    <td>{user.userDob}</td>
                                                    <td>{user.userGender}</td>
                                                    <td>{user.roles}</td>
                                                    <td>
                                                        <Link to={'/edituser/' + user.userId} className="btn btn-sm btn-primary m-1">Edit</Link>
                                                        <button onClick={(e) => (deleteUserDetails(user.userEmail))} className="btn btn-sm btn-danger m-1">Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <button onClick={(e) => (deleteAllUserDetails())} className="btn btn-warning m-1 text-dark fw-bold">Clear All</button>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;