import axios from "axios";

const API_URL = "http://localhost:8001/user";
class UserService {
    registerUser(user) {
        return axios.post(API_URL, user);
    }
    getAllUsers() {
        return axios.get(API_URL + "/all");
    }
    getUserById(id) {
        return axios.get(API_URL + "/" + id);
    }
    deleteUser(email) {
        return axios.delete(API_URL + "/delete/" + email);
    }
    updateUser(id, user) {
        return axios.patch(API_URL + "/update/" + id, user);
    }
    deleteAllUsers() {
        return axios.patch(API_URL + "/delete");
    }
    generateToken(UserObject){
        return axios.post("http://localhost:8001/authenticate",UserObject);
    }
}
export default new UserService;