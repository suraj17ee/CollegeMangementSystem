import React, { useState } from 'react';
import './Login.css';
import userservice from '../service/userservice';
import { toast } from 'react-toastify';
import { doLogin } from './auth';

const Login = () => {

    const [userObject, setUserObject] = useState({
        username: "",
        password: "",
    });

    // const [msg, setMsg] = useState(""); // instead of using msg now using toasts
    const [responseData, setResponseData] = useState();

    const VerifyUserName = (e) => {
            setUserObject({ ...userObject, username: e.target.value.trim() });
    }
    const VerifyUserPassword = (e) => {
        setUserObject({ ...userObject, password: e.target.value.trim() });
    }

    const LoginClick = (e) => {
        e.preventDefault();
        if (userObject.username == '' || userObject.password == '') {
            toast.error("Username and Password required!!");
        } else {
            userservice.generateToken(userObject)
                .then((res) => {
                    // setMsg("User credentials sent successfully!!");
                    toast.success("User credentials sent successfully!!");
                    console.log(res.data);
                    //save the data to localstorage
                    doLogin(res.data,()=>{
                        console.log("login details saved in local storage!");
                    })
                    setResponseData(res.data);
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
            <div className="login-box">
                <form onSubmit={LoginClick} id='login-form'>
                    <h3><span className="bi bi-person-fill"></span> User Login</h3>
                    {/* <p className='text-success fs-5 fw-bold'>{msg}</p> */}
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" id="username"
                            onChange={VerifyUserName}
                            value={userObject.username} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                            onChange={VerifyUserPassword}
                            value={userObject.password} />
                    </div>
                    <div className="form-group just">
                        <button className="btn btn-primary col-12 mt-3">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;