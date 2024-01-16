// is loggedin
export const isLoggedIn = () => {
    let data = localStorage.getItem("data")
    if (data != null) {
        return true;
    } else {
        return false;
    }
}

//do login - set to local storage
export const doLogin = (data,next) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("jwttoken", data.jwtToken);
    next();
}

//do logout - remove from local storage
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
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