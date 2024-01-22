import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, doLogout } from './auth';

const UserDashboard =() =>{
    
    const navigate = useNavigate();

    const HandleLogout = () => {
        doLogout();
        console.log("logout clicked");
        navigate("/login");
    }

    if(isLoggedIn()){
        return (
            <div>
                <h1>user profile</h1>
                <button className="btn btn-primary col-3 mt-3" onClick={HandleLogout}>Logout</button>
            </div>
        )
    } else {
        return <Navigate to={"/login"}/>;
    }
    // return isLoggedIn() ? <div><h1>user profile</h1></div> : <Navigate to={"/login"}/>
}

export default UserDashboard;