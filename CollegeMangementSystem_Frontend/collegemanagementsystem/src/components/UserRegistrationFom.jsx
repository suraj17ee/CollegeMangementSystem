import React, { useState } from 'react';
import './UserRegistrationFom.css';
import userservice from '../service/userservice';
import { toast } from 'react-toastify';

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

    // const [msg, setMsg] = useState("");// instead of using msg now using toasts
    const [validEmail, setValidEmail] = useState(false);
    const [validMobile, setValidMobile] = useState(false);

    const VerifyUserName = (e) => {
        setUser({ ...user, userName: e.target.value });
    };
    const VerifyUserPassword = (e) => {
        setUser({ ...user, userPassword: e.target.value.trim() });
    }
    const VerifyUserEmail = (e) => {
        setUser({ ...user, userEmail: e.target.value.trim() });
    }
    const VerifyUserAddress = (e) => {
        setUser({ ...user, userAddress: e.target.value.trim() });
    }
    const VerifyUserGender = (e) => {
        setUser({ ...user, userGender: e.target.value });
    }
    const VerifyUserDob = (e) => {
        setUser({ ...user, userDob: e.target.value });
    }
    const VerifyUserMobile = (e) => {
        setUser({ ...user, userMobile: e.target.value });
    }

    const handleEmailBlur = () => {
        const { userEmail } = user;
        const gmailPattern = /.*@gmail\.com/;
        if (gmailPattern.test(userEmail)) {
            setValidEmail(true);
        } else {
            toast("Invalid email address !!");
            setValidEmail(false);
        }
    };
    
    const handleMobileBlur = () => {
        const { userMobile } = user;
        const mobilePattern = /^\+91\d{10}$/;
        if (mobilePattern.test(userMobile)) {
            setValidMobile(true);
        } else {
            toast("Invalid mobile number!! Starts with +91");
            setValidMobile(false);
        }
    };

    function VerifyRole(e) {
        if (e.target.value == 'norole') {
            alert('please select a role');
        } else {
            setUser({
                ...user,
                roles: e.target.value.split(',')
            });
        }
    }

    const UserRegister = (e) => {
        e.preventDefault();
        // console.log(user);
        userservice.registerUser(user)
            .then((res) => {
                // setMsg("User registered successfully!!");
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
                if (error.response.status == 400 | error.response.status == 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            })
    }

    return (
        <div className='container mt-3'>
            <div className='reg-box'>
                <form onSubmit={UserRegister} id='reg-form'>
                    <div className="formhead">
                        <h3><span className="bi bi-person-fill"></span> User Registration</h3>
                        {/* <p className='text-success fs-5 fw-bold'>{msg}</p> */}
                    </div>
                    <div className="form-group mt-3">
                        {/* <label className="form-label">User Name</label> */}
                        <div>
                            <input type="text"
                                name="userName"
                                className='form-control'
                                onChange={VerifyUserName}
                                value={user.userName}
                                placeholder='Enter Your Username'
                            />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        {/* <label className="form-label">Password</label> */}
                        <div>
                            <input type="text"
                                name="password"
                                className='form-control'
                                onChange={VerifyUserPassword}
                                value={user.userPassword}
                                placeholder='Enter Your Password'
                            />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        {/* <label className="form-label">Email</label> */}
                        <div>
                            <input type="email"
                                name="email"
                                className='form-control'
                                onChange={VerifyUserEmail}
                                onBlur={handleEmailBlur}
                                value={user.userEmail}
                                placeholder='Enter Your Email'
                            />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        {/* <label className="form-label">Address</label> */}
                        <div>
                            <input type="text"
                                name="address"
                                className='form-control'
                                onChange={VerifyUserAddress}
                                value={user.userAddress}
                                placeholder='Enter Your Address'
                            />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        {/* <label className="form-label">Mobile</label> */}
                        <div>
                            <input type="text"
                                name="mobile"
                                className='form-control'
                                onChange={VerifyUserMobile}
                                onBlur={handleMobileBlur}
                                value={user.userMobile}
                                placeholder='Enter Your Phone Number:'
                            />
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        {/* <label className="form-label">DOB</label> */}
                        <div>
                            <input type="date"
                                name="dob"
                                className='form-control'
                                onChange={VerifyUserDob}
                                value={user.userDob}
                            />
                        </div>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            name="gender"
                            id="radi1"
                            value="male"
                            onChange={VerifyUserGender} />
                        <label className="form-check-label">
                            Male
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            name="gender"
                            id="radio2"
                            value="female"
                            onChange={VerifyUserGender}
                        />
                        <label className="form-check-label">
                            Female
                        </label>
                    </div>

                    <select className='form-select mt-1' onChange={VerifyRole}>
                        <option value="norole">Please select a role</option>
                        <option value="ROLE_USER">User</option>
                    </select>

                    <div className="form-group mt-1">
                        <button className='btn btn-primary col-12' disabled={!validEmail || !validMobile}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserRegistrationFom;