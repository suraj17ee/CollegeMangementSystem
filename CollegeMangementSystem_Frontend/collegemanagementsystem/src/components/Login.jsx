import React, { useState } from 'react';
// import './Login.css';
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import { doLogin } from "../service/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [userObject, setUserObject] = useState({
        username: "",
        password: "",
    });

    // const [msg, setMsg] = useState(""); // instead of using msg now using toasts
    const [validEmail, setValidEmail] = useState(false);
    const [responseData, setResponseData] = useState();
    const navigate = useNavigate();

    const VerifyUserName = (e) => {
        setUserObject({ ...userObject, username: e.target.value });
    }
    const VerifyUserPassword = (e) => {
        setUserObject({ ...userObject, password: e.target.value.trim() });
    }

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
        if (userObject.username == '' || userObject.password == '') {
            toast.error("Username and Password required!!");
        } else {
            userservice.generateToken(userObject)
                .then((res) => {
                    // setMsg("User credentials sent successfully!!");
                    console.log(res.data);
                    //save the data to localstorage
                    doLogin(res.data, () => {
                        console.log("login details saved in local storage!");
                    })
                    const role = localStorage.getItem("userrole");
                    toast.success("User LoggedIn as an " + role.substring('ROLE_'.length).toUpperCase());
                    setResponseData(res.data);
                    // setUserObject({
                    //     username: "",
                    //     password: "",
                    // });
                    if (role == "ROLE_ADMIN") {
                        navigate("/dashboard");
                    } else {
                        navigate("/profile")
                    }

                })
                .catch((error) => {
                    if (error.response.status == 400 | error.response.status == 401) {
                        toast.error(error.response.data);
                    } else {
                        toast.error("Error while connecting to server!!");
                        console.log(error);
                    }
                })
        }
    }

    return (
        <div className='container mt-3'>
            <form onSubmit={LoginClick} id='login-form' className='w-50 m-auto border border-1 border-dark rounded p-3'>
                <div className="formhead text-center">
                    <h3><span className="bi bi-person-fill"></span> User Login</h3>
                    {/* <p className='text-success fs-5 fw-bold'>{msg}</p> */}
                </div>
                <div className="form-group mt-3">
                    {/* <label className="form-label">Username</label> */}
                    <input type="email" className="form-control" id="username"
                        onChange={VerifyUserName}
                        onBlur={handleEmailBlur}
                        value={userObject.username}
                        placeholder='Enter Your Email'
                    />
                </div>
                <div className="form-group mt-3">
                    {/* <label className="form-label">Password</label> */}
                    <input type="password" className="form-control" id="password"
                        onChange={VerifyUserPassword}
                        value={userObject.password}
                        placeholder='Enter Your Password'
                    />
                </div>
                <div className="form-group mt-3">
                    <button className="btn btn-primary col-12" disabled={!validEmail}>Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Login;