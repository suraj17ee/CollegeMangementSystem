import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, doLogout } from "../service/auth";

const UserDashboard = () => {

    const navigate = useNavigate();

    const HandleLogout = () => {
        doLogout();
        console.log("logout clicked");
        navigate("/login");
    }

    if (isLoggedIn()) {
        return (
            <div>
                <div class="card w-25 m-3">
                    <div className="card-header">
                    <h3><span className="bi bi-person-fill"></span> {localStorage.getItem("username")} </h3>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Logged in users details will appear here.</p>
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