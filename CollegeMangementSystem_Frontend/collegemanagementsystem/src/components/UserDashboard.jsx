import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, doLogout } from "../service/auth";
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import './UserDashboard.css';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [showProfile, setShowProfile] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        userservice.getUserByEmail(localStorage.getItem("username"))
            .then((res) => setUserData(res.data))
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 401) {
                    toast.error(error.response.data);
                    toast.error("Sorry!! You are not authorized for dashboard view!");
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            });
    };

    const HandleLogout = () => {
        doLogout();
        navigate("/login");
    };

    if (!isLoggedIn()) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="dashboard-container">
            {/* Left Section - Dashboard Content */}
            <div className={`default-section ${!showProfile ? 'full-width' : ''}`}>
                <div className="top-bar">
                    <button 
                        className="toggle-btn" 
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        {showProfile ? "Hide Profile" : "Show Profile"}
                    </button>
                </div>
                <h2>Welcome to Your Dashboard 🎯</h2>
                <p>Here you can view your profile details, manage your account, and explore features.</p>
                <div className="placeholder-box">
                    <span className="bi bi-bar-chart-fill"></span>
                    <p>Some stats or charts can go here...</p>
                </div>
            </div>

            {/* Right Section - Profile Panel */}
            {showProfile && (
                <div className="profile-section">
                    <div className="profile-card">
                        {userData ? (
                            <>
                                <div className="profile-header">
                                    <span className="bi bi-person-circle profile-icon"></span>
                                    <h3>{userData.userName}</h3>
                                    <p className="profile-email">{userData.userEmail}</p>
                                </div>
                                <div className="profile-actions">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={HandleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                                <div className="profile-details">
                                    {Object.entries(userData).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
