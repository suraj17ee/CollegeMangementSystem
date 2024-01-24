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
        userMobile:"",
        userDob:"",
        userGender:"",
        roles: []
    });

    // const [msg, setMsg] = useState("");// instead of using msg now using toasts

    const VerifyUserName = (e) => {
        setUser({ ...user, userName: e.target.value });
    }
    const VerifyUserPassword = (e) => {
        setUser({ ...user, userPassword: e.target.value });
    }
    const VerifyUserEmail = (e) => {
        setUser({ ...user, userEmail: e.target.value });
    }
    const VerifyUserAddress = (e) => {
        setUser({ ...user, userAddress: e.target.value });
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
                    userMobile:"",
                    userDob:"",
                    userGender:"",
                    roles: []
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='container mt-3'>
            <div className='reg-box'>
                <form onSubmit={UserRegister} id='reg-form'>
                    <div className="formhead">
                    <h3><span className="bi bi-person-fill"></span> User Registration</h3>
                    {/* <p className='text-success fs-5 fw-bold'>{msg}</p> */}
                    </div>
                    <div className="form-group">
                        {/* <label className="form-label">User Name</label> */}
                        <div>
                            <input type="text"
                                name="userName"
                                className='form-control'
                                onChange={VerifyUserName}
                                value={user.userName}
                                placeholder='Enter User Name'
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* <label className="form-label">Password</label> */}
                        <div>
                            <input type="text"
                                name="password"
                                className='form-control'
                                onChange={VerifyUserPassword}
                                value={user.userPassword}
                                placeholder='Enter Password'
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        {/* <label className="form-label">Email</label> */}
                        <div>
                            <input type="text"
                                name="email"
                                className='form-control'
                                onChange={VerifyUserEmail}
                                value={user.userEmail}
                                placeholder='Enter Your Email'
                            />
                        </div>
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
                        {/* <label className="form-label">Mobile</label> */}
                        <div>
                            <input type="text"
                                name="mobile"
                                className='form-control'
                                onChange={VerifyUserMobile}
                                value={user.userMobile}
                                placeholder='Enter Phone Number:'
                            />
                        </div>
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
                    <label className="form-label">Gender</label>
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
                    </div>

                    <select className='form-select mt-3' onChange={VerifyRole}>
                        <option value="norole">Please select a role</option>
                        <option value="USER">User</option>
                    </select>

                    <div className="form-group">
                        <button className='btn btn-primary mt-3 col-12'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserRegistrationFom;