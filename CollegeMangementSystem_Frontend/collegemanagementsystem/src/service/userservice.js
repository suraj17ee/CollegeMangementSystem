import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/v1/user";
let token = localStorage.getItem("token");

class UserService {
    registerUser(user) {
        return axios.post(API_URL + "/signup", user);
    }

    getAllUsers() {
        return axios.get(API_URL + "/all", {
            headers: this.getAuthHeaders(),
        });
    }

    getUserById(id) {
        return axios.get(API_URL + "/" + id, {
            headers: this.getAuthHeaders(),
        });
    }

    getUserByEmail(email) {
        return axios.get(API_URL + "/get/" + email, {
            headers: this.getAuthHeaders(),
        });
    }

    deleteUser(email) {
        return axios.delete(API_URL + "/delete/" + email, {
            headers: this.getAuthHeaders(),
        });
    }

    updateUser(id, user) {
        return axios.patch(API_URL + "/update/" + id, user, {
            headers: this.getAuthHeaders(),
        });
    }

    deleteAllUsers() {
        return axios.delete(API_URL + "/delete", {
            headers: this.getAuthHeaders(),
        });
    }

    generateToken(userObject) {
        return axios.post(API_URL + "/authenticate", userObject);
    }

    sendOtp(emailId) {
        return axios.post(
            `http://localhost:9095/mail/send?emailId=${encodeURIComponent(
                emailId
            )}`
        );
    }

    verifyOtp(emailId, otp) {
        return axios.post(
            `http://localhost:9095/mail/verify?emailId=${encodeURIComponent(
                emailId
            )}&otp=${encodeURIComponent(otp)}`
        );
    }

    sendRegistrationMail(userObject) {
        return axios.post(`http://localhost:9095/mail/sendmail`, {
            email: userObject.userEmail,
            otp: userObject.otp,
        });
    }

    getUserImages(userId) {
        return axios.get(`${API_URL}/files/${userId}`,{
            headers: this.getAuthHeaders()
        });
    }

    uploadUserImages(userId, images) {
        const formData = new FormData();
        images.forEach(img => formData.append("files", img.file));

        return axios.post(
            `${API_URL}/${userId}/upload`,
            formData,
            {
            headers: {
                ...this.getAuthHeaders(),
                "Content-Type": "multipart/form-data"
            }
        }
        );
    }

    getAuthHeaders() {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
    }
}

export default new UserService();
