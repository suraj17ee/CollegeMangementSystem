import { useEffect, useState } from "react";
import userservice from "../service/userservice";
import { Link } from "react-router-dom";

const Home = () => {

    const [userList, setUserList] = useState([]);
    const [msg, setMsg] = useState("");
    useEffect(() => {
        init();
    }, [])

    const init = () => {
        userservice.getAllUsers()
            .then((res) => {
                setUserList(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteUserDetails = (userEmail) => {
        userservice.deleteUser(userEmail)
            .then((res) => {
                setMsg("User details removed successfully!");
                init();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteAllUserDetails = () => {
        userservice.deleteAllUsers()
            .then((res) => {
                setMsg("All user details removed successfully!");
                init();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header text-center fw-bold fs-5">
                            User Details
                            <p className='text-success'>{msg}</p>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Sl No</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userList.map((user, num) =>
                                            <tr key={num}>
                                                <td>{num + 1}</td>
                                                <td>{user.userName}</td>
                                                <td>{user.userEmail}</td>
                                                <td>{user.userAddress}</td>
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
    );
}
export default Home;