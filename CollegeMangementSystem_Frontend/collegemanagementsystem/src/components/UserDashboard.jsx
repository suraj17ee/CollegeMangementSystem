import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, doLogout } from "../service/auth";
import userservice from '../service/userservice';
import { toast } from 'react-toastify';

const UserDashboard = () => {

    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        userservice.getUserByEmail(localStorage.getItem("username"))
            .then((res) => {
                setUserData(res.data);
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

    const HandleLogout = () => {
        doLogout();
        console.log("logout clicked");
        navigate("/login");
    }

    if (isLoggedIn()) {
        return (
            <div>
                <div className="card w-25 m-3">
                    <div className="card-header">
                        <h3><span className="bi bi-person-fill"></span> {localStorage.getItem("username")} </h3>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Your Details</h5>
                        <div>
                            {
                                Object.entries(userData).map(([user,key]) => (
                                   <div>
                                     <p key={key+1}>{user.userId}</p>
                                    <p key={key+1}>{user.userName}</p>
                                   </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary col-3 mt-3" onClick={HandleLogout}>Logout</button>
                    </div>
                </div>

            </div>
        )
    } else {
        return <Navigate to={"/login"} />;
    }
    // return isLoggedIn() ? <div><h1>user profile</h1></div> : <Navigate to={"/login"}/>
}

export default UserDashboard;