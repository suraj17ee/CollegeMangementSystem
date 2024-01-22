// is loggedin
export const isLoggedIn = () => {
    let data = localStorage.getItem("token")
    if (data != null) {
        return true;
    } else {
        return false;
    }
}

//do login - set to local storage
export const doLogin = (data, next) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userrole", data.userrole);
    next();
}

//do logout - remove from local storage
export const doLogout = () => {
    localStorage.clear();
}

//get current user details
export const getCurrentUserDetails = () => {
    if (isLoggedIn) {
        return JSON.parse(localStorage.getItem("data"));
    }
    else {
        return false;
    }
}