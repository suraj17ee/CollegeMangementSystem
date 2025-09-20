import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, doLogout } from "../service/auth";
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import './UserDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const MAX_IMAGES = 5;

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [activeSection, setActiveSection] = useState('profile');

    // Separate states
    const [uploadedImages, setUploadedImages] = useState([]); // local before upload
    const [serverImages, setServerImages] = useState([]); // from API after upload

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

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (uploadedImages.length + files.length > MAX_IMAGES) {
            toast.error(`You can upload only up to ${MAX_IMAGES} images.`);
            return;
        }

        const newImages = files.map(file => ({
            file,
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setUploadedImages(prev => [...prev, ...newImages]);
    };

    // upload images to server
    const handleUploadToServer = async () => {
        if (uploadedImages.length === 0) {
            toast.warning("No images to upload!");
            return;
        }
        try {
            await userservice.uploadUserImages(userData.userId, uploadedImages);
            toast.success("Images uploaded successfully!");
            setUploadedImages([]);
        } catch (err) {
            console.error(err);
            toast.error("Error uploading images!");
        }
    };

    // Fetch images from server
    const fetchServerImages = async () => {
        try {
            const res = await userservice.getUserImages(userData.userId);
            setServerImages(res.data || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load images from server");
        }
    };

    // Whenever Docs or Analytics tab is opened, fetch fresh images
    useEffect(() => {
        if (activeSection === "docs" || activeSection === "analytics") {
            fetchServerImages();
        }
    }, [activeSection]);

    const uploadedCount = serverImages.length;
    const remainingCount = MAX_IMAGES - uploadedCount;

    if (!isLoggedIn()) return <Navigate to={"/login"} />;

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <nav className="sidebar-nav">
                <h2 className="sidebar-title">Dashboard</h2>
                <ul className="sidebar-list">
                    <li className={activeSection === 'profile' ? 'active' : ''} onClick={() => setActiveSection('profile')}>
                        <span className="bi bi-person"></span> Profile
                    </li>
                    <li className={activeSection === 'docs' ? 'active' : ''} onClick={() => setActiveSection('docs')}>
                        <span className="bi bi-files"></span> Your Docs
                    </li>
                    <li className={activeSection === 'upload' ? 'active' : ''} onClick={() => setActiveSection('upload')}>
                        <span className="bi bi-upload"></span> Upload Docs
                    </li>
                    <li className={activeSection === 'analytics' ? 'active' : ''} onClick={() => setActiveSection('analytics')}>
                        <span className="bi bi-bar-chart"></span> Analytics
                    </li>
                    <li className="logout-item" onClick={HandleLogout}>
                        <span className="bi bi-box-arrow-right"></span> Logout
                    </li>
                </ul>
            </nav>

            {/* Main Section */}
            <div className="default-section full-width">

                {/* Profile */}
                {activeSection === 'profile' && (
                    <div className="profile-section">
                        <h2>Profile</h2>
                        {userData ? (
                            <div className="profile-container">
                                <div className="profile-header-large">
                                    <span className="bi bi-person-circle profile-icon-large"></span>
                                    <div>
                                        <h3>{userData.userName}</h3>
                                        <p className="profile-email">{userData.userEmail}</p>
                                    </div>
                                </div>
                                <div className="profile-details-grid">
                                    {Object.entries(userData).map(([key, value]) => (
                                        <div key={key} className="profile-detail-card">
                                            <span className="detail-key">{key}</span>
                                            <span className="detail-value">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : <p>Loading...</p>}
                    </div>
                )}

                {/* Docs: this code works with static file path like "/uploads/USER-002_6tcG2s_Thankyou.jpg */}
                {/* {activeSection === 'docs' && (
                    <div className="docs-section">
                        <h2>Your Documents</h2>
                        <div className="image-preview-grid">
                            {serverImages.length > 0 ? serverImages.map((img, index) => (
                                <div key={index} className="image-card">
                                    <img src={img.url} alt={img.name || `Image ${index}`} />
                                    <p className="image-name">{img.name || `Image ${index + 1}`}</p>
                                </div>
                            )) : <p>No documents uploaded yet.</p>}
                        </div>
                    </div>
                )} */}

                {/* Docs */}
                {activeSection === 'docs' && (
                    <div className="docs-section">
                        <h2>Your Documents</h2>
                        <div className="image-preview-grid">
                            {serverImages.length > 0 ? serverImages.map((file, index) => (
                                <div key={index} className="image-card">
                                    {/* Use url from backend */}
                                    <img
                                        src={file.url}
                                        alt={`Document ${index + 1}`}
                                    />
                                    {/* Show file name from backend */}
                                    <p className="image-name">{file.name}</p>
                                </div>
                            )) : <p>No documents uploaded yet.</p>}
                        </div>
                    </div>
                )}

                {/* Upload */}
                {activeSection === 'upload' && (
                    <div className="docs-section">
                        <h2>Upload Your Documents</h2>
                        <div className="upload-section">
                            <label className="upload-label">
                                {uploadedImages.length < MAX_IMAGES
                                    ? `Click or drag images here (Max ${MAX_IMAGES})`
                                    : "Upload limit reached!"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    disabled={uploadedImages.length >= MAX_IMAGES}
                                />
                            </label>
                            <p className="upload-count">{uploadedImages.length} / {MAX_IMAGES} images selected</p>
                        </div>

                        <button className="upload-btn" onClick={handleUploadToServer}>Upload</button>

                        <div className="image-preview-grid">
                            {uploadedImages.map((img, index) => (
                                <div key={index} className="image-card">
                                    <img src={img.url} alt={img.name} />
                                    <div className="image-overlay">
                                        <button className="remove-btn" onClick={() => {
                                            setUploadedImages(uploadedImages.filter((_, i) => i !== index));
                                        }}>×</button>
                                    </div>
                                    <p className="image-name">{img.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analytics */}
                {activeSection === 'analytics' && (
                    <div>
                        <h2>Analytics</h2>
                        <div className="placeholder-box">
                            <span className="bi bi-bar-chart-fill"></span>
                            <p>Uploaded documents overview</p>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={[
                                        { name: "Uploaded", value: uploadedCount },
                                        { name: "Remaining", value: remainingCount }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    <Cell fill="#4CAF50" />
                                    <Cell fill="#FF5722" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;