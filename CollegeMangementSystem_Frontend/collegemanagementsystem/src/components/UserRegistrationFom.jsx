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
                        <label className="form-label">User Name</label>
                        <div>
                            <input type="text"
                                name="userName"
                                className='form-control'
                                onChange={VerifyUserName}
                                value={user.userName}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div>
                            <input type="text"
                                name="password"
                                className='form-control'
                                onChange={VerifyUserPassword}
                                value={user.userPassword}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <div>
                            <input type="text"
                                name="email"
                                className='form-control'
                                onChange={VerifyUserEmail}
                                value={user.userEmail}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <div>
                            <input type="text"
                                name="address"
                                className='form-control'
                                onChange={VerifyUserAddress}
                                value={user.userAddress}
                            />
                        </div>
                    </div>

                    <select className='form-select mt-3' onChange={VerifyRole}>
                        <option value="norole">Please select a role</option>
                        <option value="USER">User</option>
                    </select>

                    <div className="form-group">
                        <button className='btn btn-primary mt-3 col-12'>SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserRegistrationFom;