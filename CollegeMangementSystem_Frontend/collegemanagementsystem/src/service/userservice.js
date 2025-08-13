import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/v1/user";
var token = localStorage.getItem("token");
class UserService {
    registerUser(user) {
        return axios.post(API_URL+"/signup", user);
    }
    getAllUsers() {
        return axios.get(API_URL + "/all",{headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
    }
    getUserById(id) {
        return axios.get(API_URL + "/" + id,{headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
    }
    getUserByEmail(email) {
        return axios.get(API_URL + "/get/" + email,{headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
    }
    deleteUser(email) {
        return axios.delete(API_URL + "/delete/" + email,{headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
    }
    updateUser(id, user) {
        return axios.patch(API_URL + "/update/" + id, user,{headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
    }
    deleteAllUsers() {
        return axios.delete(API_URL + "/delete",{headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
    }
    generateToken(userObject){
        return axios.post(API_URL+"/authenticate",userObject);
    }
    sendOtp(emailId) {
        return axios.post(`http://localhost:9095/mail/send?emailId=${encodeURIComponent(emailId)}`);
    }
    verifyOtp(emailId, otp) {
        return axios.post(
            `http://localhost:9095/mail/verify?emailId=${encodeURIComponent(emailId)}&otp=${encodeURIComponent(otp)}`
        );
    }
    sendRegistrationMail(email) {
        return axios.post(`http://localhost:9095/mail/sendmail?emailId=${email}`);
    }

}
export default new UserService;