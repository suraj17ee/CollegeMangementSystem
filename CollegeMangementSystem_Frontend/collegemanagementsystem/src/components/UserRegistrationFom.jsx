import React, { useState } from 'react';
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './UserRegistrationFom.css'; // custom styling

const UserRegistrationFom = () => {
    const [user, setUser] = useState({
        userName: "",
        userPassword: "",
        userEmail: "",
        userAddress: "",
        userMobile: "",
        userDob: "",
        userGender: "",
        roles: []
    });

    const [validEmail, setValidEmail] = useState(false);
    const [validMobile, setValidMobile] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value.trim() });
    };

    const handleEmailBlur = () => {
        const { userEmail } = user;
        const gmailPattern = /.*@gmail\.com/;
        if (gmailPattern.test(userEmail)) {
            setValidEmail(true);
        } else {
            toast.error("Invalid email address !!");
            setValidEmail(false);
        }
    };

    const handleMobileBlur = () => {
        const { userMobile } = user;
        const mobilePattern = /^\+91\d{10}$/;
        if (mobilePattern.test(userMobile)) {
            setValidMobile(true);
        } else {
            toast.error("Invalid mobile number!! Starts with +91");
            setValidMobile(false);
        }
    };

    const VerifyRole = (e) => {
        if (e.target.value === 'norole') {
            alert('Please select a role');
        } else {
            setUser({ ...user, roles: e.target.value.split(',') });
        }
    };

    const UserRegister = (e) => {
        e.preventDefault();
        userservice.registerUser(user)
            .then(() => {
                toast.success("User registered successfully!!");
                setUser({
                    userName: "",
                    userPassword: "",
                    userEmail: "",
                    userAddress: "",
                    userMobile: "",
                    userDob: "",
                    userGender: "",
                    roles: []
                });
            })
            .catch((error) => {
                if (error.response?.status === 400 || error.response?.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4 p-4 reg-card">
                <div className="text-center mb-4">
                    <i className="bi bi-person-plus-fill text-primary fs-1"></i>
                    <h3 className="fw-bold mt-2">Create an Account</h3>
                    <p className="text-muted">Fill out the form below to register</p>
                </div>
                <form onSubmit={UserRegister} id="reg-form">
                    <div className="mb-3">
                        <input type="text"
                            name="userName"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userName}
                            placeholder="👤 Username"
                        />
                    </div>

                    <div className="mb-3">
                        <input type="password"
                            name="userPassword"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userPassword}
                            placeholder="🔑 Password"
                        />
                    </div>

                    <div className="mb-3">
                        <input type="email"
                            name="userEmail"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            value={user.userEmail}
                            placeholder="📧 Email"
                        />
                    </div>

                    <div className="mb-3">
                        <input type="text"
                            name="userAddress"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userAddress}
                            placeholder="🏠 Address"
                        />
                    </div>

                    <div className="mb-3">
                        <input type="text"
                            name="userMobile"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            onBlur={handleMobileBlur}
                            value={user.userMobile}
                            placeholder="📱 Mobile (+91...)"
                        />
                    </div>

                    <div className="mb-3">
                        <input type="date"
                            name="userDob"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userDob}
                        />
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="radioMale"
                                value="male"
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="radioMale">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="radioFemale"
                                value="female"
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="radioFemale">
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <select className="form-select rounded-pill" onChange={VerifyRole}>
                            <option value="norole">Please select a role</option>
                            <option value="ROLE_USER">User</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary w-100 rounded-pill fw-bold"
                        disabled={!validEmail || !validMobile}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistrationFom;