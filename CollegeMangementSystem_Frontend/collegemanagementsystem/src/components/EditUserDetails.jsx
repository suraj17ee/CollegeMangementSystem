import { useEffect, useState } from "react";
import userservice from "../service/userservice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import './EditUserDetails.css'; // We'll add styling here

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

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validMobile, setValidMobile] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        userservice.getUserById(id)
            .then(res => setUser(res.data))
            .catch(error => {
                if (error.response?.status === 400 || error.response?.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.error(error);
                }
            });
    }, [id]);

    const handleChange = (field, value) => {
        setUser({ ...user, [field]: value });
    };

    const handleEmailBlur = () => {
        const gmailPattern = /.*@gmail\.com$/;
        if (gmailPattern.test(user.userEmail)) setValidEmail(true);
        else {
            toast.error("Invalid email address !!");
            setValidEmail(false);
        }
    };

    const handlePasswordBlur = () => {
        const passwordPattern = /^.{5,10}$/;
        if (passwordPattern.test(user.userPassword)) setValidPassword(true);
        else {
            toast.error("Invalid password !! Password must contain 5-10 characters");
            setValidPassword(false);
        }
    };

    const handleMobileBlur = () => {
        const mobilePattern = /^\+91\d{10}$/;
        if (mobilePattern.test(user.userMobile)) setValidMobile(true);
        else {
            toast.error("Invalid mobile number!! Starts with +91");
            setValidMobile(false);
        }
    };

    const UserUpdate = (e) => {
        e.preventDefault();
        userservice.updateUser(id, user)
            .then(() => {
                toast.success(`${user.userName}'s details updated successfully!!`);
                navigate("/dashboard");
            })
            .catch(error => {
                if (error.response?.status === 400 || error.response?.status === 401) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Error while connecting to server!!");
                    console.error(error);
                }
            });
    };

    return (
        <div className="container py-4">
            <div className="card shadow-lg rounded-4 edit-card mx-auto p-4" style={{ maxWidth: '600px' }}>
                <div className="card-header text-center bg-success text-white rounded-top">
                    <h3><span className="bi bi-person-fill"></span> Update User</h3>
                </div>
                <form onSubmit={UserUpdate} className="card-body">
                    <div className="mb-3">
                        <input type="text"
                            className="form-control shadow-sm"
                            placeholder="Update your username"
                            value={user.userName}
                            onChange={e => handleChange("userName", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            className="form-control shadow-sm"
                            placeholder="Enter new password"
                            value={user.userPassword}
                            onChange={e => handleChange("userPassword", e.target.value)}
                            onBlur={handlePasswordBlur}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email"
                            className="form-control shadow-sm"
                            placeholder="Update your email"
                            value={user.userEmail}
                            onChange={e => handleChange("userEmail", e.target.value)}
                            onBlur={handleEmailBlur}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control shadow-sm"
                            placeholder="Update your address"
                            value={user.userAddress}
                            onChange={e => handleChange("userAddress", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control shadow-sm"
                            placeholder="Enter Phone Number"
                            value={user.userMobile}
                            onChange={e => handleChange("userMobile", e.target.value)}
                            onBlur={handleMobileBlur}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="date"
                            className="form-control shadow-sm"
                            value={user.userDob}
                            onChange={e => handleChange("userDob", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control shadow-sm bg-light"
                            value={user.userGender}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control shadow-sm bg-light"
                            value={user.roles.at(0)}
                            readOnly
                        />
                    </div>
                    <button type="submit"
                        className="btn btn-success w-100 fw-bold shadow-sm"
                        disabled={!validEmail || !validPassword || !validMobile}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUserDetails;
