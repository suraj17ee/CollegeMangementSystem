import axios from "axios";

const API_URL = "http://localhost:8001/v1/user";
var token = localStorage.getItem("jwttoken");
class UserService {
    registerUser(user) {
        return axios.post(API_URL, user,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        });
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
}
export default new UserService;