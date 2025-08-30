import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, doLogout } from "../service/auth";
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import './UserDashboard.css';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [activeSection, setActiveSection] = useState('docs'); // 'profile', 'docs', 'analytics'
    const navigate = useNavigate();

    useEffect(() => {
        userservice.getUserByEmail(localStorage.getItem("username"))
            .then((res) => setUserData(res.data))
            .catch((error) => {
                if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                    toast.error(error.response.data);
                    toast.error("Sorry!! You are not authorized for dashboard view!");
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            });
    }, []);

    const HandleLogout = () => {
        doLogout();
        navigate("/login");
    };

    if (!isLoggedIn()) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div className="dashboard-container">
            {/* Left Navigation Bar */}
            <nav className="sidebar-nav">
                <h2 className="sidebar-title">Dashboard</h2>
                <ul className="sidebar-list">
                    <li
                        className={activeSection === 'profile' ? 'active' : ''}
                        onClick={() => setActiveSection('profile')}
                    >
                        <span className="bi bi-person"></span> Profile
                    </li>
                    <li
                        className={activeSection === 'docs' ? 'active' : ''}
                        onClick={() => setActiveSection('docs')}
                    >
                        <span className="bi bi-files"></span> Your Docs
                    </li>
                    <li
                        className={activeSection === 'analytics' ? 'active' : ''}
                        onClick={() => setActiveSection('analytics')}
                    >
                        <span className="bi bi-bar-chart"></span> Analytics
                    </li>
                    <li
                        className="logout-item"
                        onClick={HandleLogout}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="bi bi-box-arrow-right"></span> Logout
                    </li>
                </ul>
            </nav>

            {/* Main Section Content */}
            <div className="default-section full-width">
                {activeSection === 'docs' && (
                    <div>
                        <h2>Your Documents</h2>
                        <div className="placeholder-box">
                            <span className="bi bi-files"></span>
                            <p>Document list or upload section goes here...</p>
                        </div>
                    </div>
                )}
                {activeSection === 'analytics' && (
                    <div>
                        <h2>Analytics</h2>
                        <div className="placeholder-box">
                            <span className="bi bi-bar-chart-fill"></span>
                            <p>Analytics charts or stats go here...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Modal/Drawer */}
            {activeSection === 'profile' && (
                <div className="profile-overlay" onClick={() => setActiveSection('docs')}>
                    <div className="profile-modal" onClick={e => e.stopPropagation()}>
                        <div className="profile-card">
                            {userData ? (
                                <>
                                    <div className="profile-header">
                                        <span className="bi bi-person-circle profile-icon"></span>
                                        <h3>{userData.userName}</h3>
                                        <p className="profile-email">{userData.userEmail}</p>
                                    </div>
                                    <div className="profile-details">
                                        {Object.entries(userData).map(([key, value]) => (
                                            <li key={key}>
                                                <strong>{key}:</strong> {value}
                                            </li>
                                        ))}
                                    </div>
                                    <div className="profile-actions">
                                        <button className="btn btn-secondary" onClick={() => setActiveSection('docs')}>
                                            Close
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
