import React, { useState } from 'react';
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import { doLogin } from "../service/auth";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Login.css'; // optional custom styling

const Login = () => {
    const [userObject, setUserObject] = useState({
        username: "",
        password: "",
    });

    const [validEmail, setValidEmail] = useState(false);
    const [responseData, setResponseData] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const VerifyUserName = (e) => {
        setUserObject({ ...userObject, username: e.target.value });
    };
    const VerifyUserPassword = (e) => {
        setUserObject({ ...userObject, password: e.target.value.trim() });
    };

    const handleEmailBlur = () => {
        const { username } = userObject;
        const gmailPattern = /.*@gmail\.com/;
        if (gmailPattern.test(username)) {
            setValidEmail(true);
        } else {
            toast.error("Invalid email address !!");
            setValidEmail(false);
        }
    };

    const LoginClick = (e) => {
        e.preventDefault();
        if (userObject.username === '' || userObject.password === '') {
            toast.error("Username and Password required!!");
        } else {
            userservice.generateToken(userObject)
                .then((res) => {
                    doLogin(res.data, () => {
                        console.log("login details saved in local storage!");
                    });
                    const role = localStorage.getItem("userrole");
                    toast.success("User LoggedIn as an " + role.substring('ROLE_'.length).toUpperCase());
                    setResponseData(res.data);

                    if (role === "ROLE_ADMIN") {
                        navigate("/dashboard");
                    } else {
                        navigate("/profile");
                    }
                })
                .catch((error) => {
                    if (error.response?.status === 400 || error.response?.status === 401) {
                        toast.error(error.response.data);
                    } else {
                        toast.error("Error while connecting to server!!");
                        console.log(error);
                    }
                });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: "3rem" }}></i>
                    <h3 className="fw-bold mt-2">Sign In</h3>
                    <p className="text-muted small">Access your account</p>
                </div>
                <form onSubmit={LoginClick} id="login-form">
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <i className="bi bi-envelope-fill"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                id="username"
                                onChange={VerifyUserName}
                                onBlur={handleEmailBlur}
                                value={userObject.username}
                                placeholder="Enter Your Email"
                            />
                        </div>
                    </div>

                    <div className="form-group mb-3 position-relative">
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                <i className="bi bi-lock-fill"></i>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                onChange={VerifyUserPassword}
                                value={userObject.password}
                                placeholder="Enter Your Password"
                            />
                            <span
                                className="input-group-text bg-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                            </span>
                        </div>
                    </div>

                    <button className="btn btn-primary w-100 rounded-pill fw-bold" disabled={!validEmail}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
