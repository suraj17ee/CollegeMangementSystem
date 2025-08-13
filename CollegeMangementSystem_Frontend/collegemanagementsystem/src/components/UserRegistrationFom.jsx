import React, { useState } from 'react';
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './UserRegistrationFom.css';

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
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Email validation
    const handleEmailBlur = () => {
        const gmailPattern = /.*@gmail\.com$/;
        if (gmailPattern.test(user.userEmail)) {
            setValidEmail(true);
        } else {
            toast.error("Invalid email address !!");
            setValidEmail(false);
        }
    };

    // Mobile validation
    const handleMobileBlur = () => {
        const mobilePattern = /^\+91\d{10}$/;
        if (mobilePattern.test(user.userMobile)) {
            setValidMobile(true);
        } else {
            toast.error("Invalid mobile number!! Starts with +91");
            setValidMobile(false);
        }
    };

    // Role selection
    const VerifyRole = (e) => {
        if (e.target.value === 'norole') {
            toast.error('Please select a role');
        } else {
            setUser({ ...user, roles: e.target.value.split(',') });
        }
    };

    // Step 1: Send OTP
    const sendOtp = (e) => {
        e.preventDefault();
        if (!validEmail || !validMobile) {
            toast.error("Please enter valid email & mobile first!");
            return;
        }

        userservice.sendOtp(user.userEmail)
            .then(() => {
                toast.success("OTP sent to your email!");
                setOtpSent(true);
            })
            .catch(() => {
                toast.error("Failed to send OTP!");
            });
    };

    // Step 2: Verify OTP
    const verifyOtp = (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }

        userservice.verifyOtp(user.userEmail, otp)
            .then(() => {
                toast.success("OTP verified successfully!");
                setOtpVerified(true);
            })
            .catch(() => {
                toast.error("OTP verification failed!");
            });
    };

    // Step 3 & 4: Register User -> Send Registration Mail
    const registerUser = (e) => {
        e.preventDefault();

        userservice.registerUser(user)
            .then(() => {
                toast.success("User registered successfully!!");

                // Step 4: Send Registration Mail
                return userservice.sendRegistrationMail(user.userEmail);
            })
            .then(() => {
                toast.success("Registration email sent!");
                resetForm();
            })
            .catch((error) => {
                if (error.response?.status === 400 || error.response?.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                }
            });
    };

    // Reset form
    const resetForm = () => {
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
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setValidEmail(false);
        setValidMobile(false);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4 p-4 reg-card">
                <div className="text-center mb-4">
                    <i className="bi bi-person-plus-fill text-primary fs-1"></i>
                    <h3 className="fw-bold mt-2">Create an Account</h3>
                    <p className="text-muted">Fill out the form below to register</p>
                </div>

                <form 
                    onSubmit={
                        !otpSent
                            ? sendOtp
                            : !otpVerified
                                ? verifyOtp
                                : registerUser
                    } 
                    id="reg-form"
                >
                    <div className="mb-3">
                        <input
                            type="text"
                            name="userName"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userName}
                            placeholder="👤 Username"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            name="userPassword"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userPassword}
                            placeholder="🔑 Password"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            name="userEmail"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            value={user.userEmail}
                            placeholder="📧 Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="userAddress"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userAddress}
                            placeholder="🏠 Address"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="userMobile"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            onBlur={handleMobileBlur}
                            value={user.userMobile}
                            placeholder="📱 Mobile (+91...)"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="date"
                            name="userDob"
                            className="form-control rounded-pill"
                            onChange={handleChange}
                            value={user.userDob}
                            required
                        />
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="radioMale"
                                value="male"
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="radioMale">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="radioFemale"
                                value="female"
                                onChange={handleChange}
                            />
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

                    {/* OTP field after Send OTP */}
                    {otpSent && !otpVerified && (
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control rounded-pill"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button
                        className="btn btn-primary w-100 rounded-pill fw-bold"
                        disabled={!validEmail || !validMobile}
                    >
                        {!otpSent
                            ? "Send OTP"
                            : !otpVerified
                                ? "Verify OTP"
                                : "Register User"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistrationFom;
