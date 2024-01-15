import React, { useState } from 'react';
import './Login.css';
import userservice from '../service/userservice';

const Login = () => {

    const [userObject, setUserObject] = useState({
        username: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const [responseData, setResponseData] = useState('');

    const VerifyUserName = (e) => {
        setUserObject({ ...userObject, username: e.target.value });
    }
    const VerifyUserPassword = (e) => {
        setUserObject({ ...userObject, password: e.target.value });
    }

    const LoginClick =() => {
        // var username = document.getElementById("username").value;
        // var password = document.getElementById("password").value;
        // window.localStorage.setItem("username",username);
        // window.localStorage.setItem("userName",userObject.username);
        // window.localStorage.setItem("userPassword",userObject.password);
        userservice.generateToken(userObject)
        .then((res) => {
            setMsg("User credentials sent successfully!!");
            console.log(res.data);
            setResponseData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <form onSubmit={LoginClick}>
            <h3><span className="bi bi-person-fill"></span> User Login</h3>
                <p className='text-success fs-5 fw-bold'>{msg}</p>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" 
                    onChange={VerifyUserName}
                    value={userObject.username}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" 
                    onChange={VerifyUserPassword}
                    value={userObject.password}/>
                </div>
                <div className="form-group just">
                    <button className="btn btn-primary col-12 mt-3">Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Login;