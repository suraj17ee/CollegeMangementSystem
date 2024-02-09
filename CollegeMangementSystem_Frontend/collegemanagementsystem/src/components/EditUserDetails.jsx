import { useEffect, useState } from "react";
import userservice from "../service/userservice";
import { useNavigate, useParams } from "react-router-dom";
// import './EditUserDetails.css';
import { toast } from 'react-toastify';

const EditUserDetails = () => {
    const [user, setUser] = useState({
        userId: "",
        userName: "",
        userPassword: "",
        userEmail: "",
        userAddress: "",
        userMobile: "",
        userDob: "",
        userGender: "",
        roles: []
    });
    // const [msg, setMsg] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validMobile, setValidMobile] = useState(false);

    const { id } = useParams();
    // console.log(email);

    useEffect(() => {
        userservice.getUserById(id)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                if (error.response.status == 400 | error.response.status == 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.log(error);
                }
            })
    }, []);

    const navigate = useNavigate();

    const VerifyUserName = (e) => {
        setUser({ ...user, userName: e.target.value.trim() });
    }
    const VerifyUserPassword = (e) => {
        setUser({ ...user, userPassword: e.target.value });
    }
    const VerifyUserEmail = (e) => {
        setUser({ ...user, userEmail: e.target.value });
    }
    const VerifyUserAddress = (e) => {
        setUser({ ...user, userAddress: e.target.value.trim() });
    }
    // const VerifyUserGender = (e) => {
    //     setUser({ ...user, userGender: e.target.value });
    // }
    const VerifyUserDob = (e) => {
        setUser({ ...user, userDob: e.target.value });
    }
    const VerifyUserMobile = (e) => {
        setUser({ ...user, userMobile: e.target.value.trim() });
    }
    // const VerifyRole = (e) => {
    //     setUser({ ...user, roles: e.target.value.split(',') });
    // }

    const handleEmailBlur = () => {
        const { userEmail } = user;
        const gmailPattern = /.*@gmail\.com$/;
        if (gmailPattern.test(userEmail)) {
            setValidEmail(true);
        } else {
            toast.error("Invalid email address !!");
            setValidEmail(false);
        }
    };

    const handlePasswordBlur = () => {
        const { userPassword } = user;
        const passwordPattern = /^.{5,10}$/;
        if (passwordPattern.test(userPassword)) {
            setValidPassword(true);
        } else {
            toast.error("Invalid password !! Password must contain 5-10 characters");
            setValidPassword(false);
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

    const UserUpdate = (e) => {
        e.preventDefault();
        // console.log(user);
        userservice.updateUser(id, user)
            .then((res) => {
                toast.success(user.userName + "'s details updated successfully!!");
                navigate("/dashboard");
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
            {/* <div className="edit-box"> */}
            <form onSubmit={UserUpdate} id="edit-form" className='w-50 m-auto border border-1 border-dark rounded p-3'>
                <div className="formhead text-center">
                    <h3><span className="bi bi-person-fill"></span> Update User</h3>
                </div>
                {/* <p className='text-success fs-5 fw-bold'>{msg}</p> */}
                <div className="form-group mt-1">
                    {/* <label className="form-label">User Name</label> */}
                    <div>
                        <input type="text"
                            name="userName"
                            className='form-control'
                            onChange={VerifyUserName}
                            value={user.userName}
                            placeholder="Update your username"
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
                            onBlur={handlePasswordBlur}
                            value={user.userPassword}
                            placeholder="Enter new password"
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
                            placeholder="Update your email"
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
                            placeholder="Update your address"
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
                            placeholder='Enter Phone Number:'
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

                <div className="form-group mt-1">
                    {/* <label className="form-label">Gender</label> */}
                    <div>
                        <input type="text" readOnly
                            className='form-control'
                            // onChange={VerifyGender}
                            value={user.userGender}
                        />
                    </div>
                </div>

                <div className="form-group mt-1">
                    {/* <label className="form-label">Role</label> */}
                    <div>
                        <input type="text" readOnly
                            className='form-control'
                            // onChange={VerifyRole}
                            value={user.roles.at(0)}
                        />
                    </div>
                </div>

                <div className="form-group mt-1">
                    <button className='btn btn-primary col-12' disabled={!validEmail || !validPassword || !validMobile}>Update</button>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
}
export default EditUserDetails;