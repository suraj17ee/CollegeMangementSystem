import { useEffect, useState } from "react";
import userservice from "../service/userservice";
import { useNavigate, useParams } from "react-router-dom";

const EditUserDetails = () => {
    const [user, setUser] = useState({
        userId: "",
        userName: "",
        userPassword: "",
        userEmail: "",
        userAddress: "",
        roles: []
    });
    const [msg, setMsg] = useState("");

    const { id } = useParams();
    // console.log(email);

    useEffect(() => {
        userservice.getUserById(id)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const navigate = useNavigate();

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
    const VerifyRole = (e) => {
        setUser({ ...user, roles: e.target.value.split(',') });
    }

    const UserUpdate = (e) => {
        e.preventDefault();
        // console.log(user);
        userservice.updateUser(id, user)
            .then((res) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='conrtainer'>
            <form onSubmit={UserUpdate}>
                <h3><span className="bi bi-person-fill"></span> Update User</h3>
                <p className='text-success fs-5 fw-bold'>{msg}</p>
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

                <div className="form-group">
                    <label className="form-label">Role</label>
                    <div>
                        <input type="text"
                            className='form-control'
                            onChange={VerifyRole}
                            value={user.roles.at(0)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <button className='btn btn-primary mt-3 col-12'>Update</button>
                </div>
            </form>
        </div>
    );
}
export default EditUserDetails;