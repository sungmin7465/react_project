import { AUTH_LEAVE, AUTH_LEAVE_SUCCESS, AUTH_LEAVE_FAILURE, AUTH_LOGOUT,
         AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_SIGNUP,
         AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_FAILURE, AUTH_GET_STATUS,
         AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE} from './ActionTypes';
import axios from 'axios';

/*============================================================================
    authentication
==============================================================================*/

var API_URL = process.env.NODE_ENV === "production" ? "http://1.239.127.120:3001" : "http://localhost:3000";

/* LOGIN */
const axiosInstance = axios.create({
  baseURL: API_URL
});

export function loginRequest(userId, password, type) {

    var selectRequest = (type) =>{

        if(type === "local"){
            return axiosInstance.post('/api/account/login', { userId, password })
        } else if (type === "facebook"){
            console.log(type)
            return axiosInstance.get('/api/account/login/facebook')
        } else if (type === "google"){
            return axiosInstance.get('/api/account/login/google')
        }
    }


    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return selectRequest(type)
        .then((response) => {
            // SUCCEED

            dispatch(loginSuccess(response.data.user));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure(error.response.data.code));
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(user) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        user
    };
}

export function loginFailure(error) {
    return {
        type: AUTH_LOGIN_FAILURE,
        error
    };
}

/* SIGNUP*/
export function signupRequest(userId, password, displayName) {
    return (dispatch) => {
        // Inform SIGNUP API is starting
        dispatch(signup());

        return axiosInstance.post('/api/account/signup', { userId, password, displayName })
        .then((response) => {
            dispatch(signupSuccess());
        }).catch((error) => {
            dispatch(signupFailure(error.response.data.code));
        });
    };
}

export function signup() {
    return {
        type: AUTH_SIGNUP
    };
}

export function signupSuccess() {
    return {
        type: AUTH_SIGNUP_SUCCESS,
    };
}

export function signupFailure(error) {
    return {
        type: AUTH_SIGNUP_FAILURE,
        error
    };
}

/* Logout */
export function logoutRequest() {
    return (dispatch) => {
        return axiosInstance.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function leaveRequest(id) {
    return (dispatch) => {
        // TO BE IMPLEMENTED
        dispatch(leave());

        return axiosInstance.delete('/api/account/' + id)
        .then((response)=> {
            dispatch(leaveSuccess());
        }).catch((error) => {
            console.log(error);
            dispatch(leaveFailure(error.response.data.code));
        });
    };
}

export function leave() {
    return {
        type: AUTH_LEAVE
    };
}

export function leaveSuccess() {
    return {
        type: AUTH_LEAVE_SUCCESS
    };
}

export function leaveFailure(error) {
    return {
        type: AUTH_LEAVE_FAILURE,
        error
    };
}


/* GET STATUS */

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());
        return axiosInstance.get('/api/account/getinfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.user));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(user) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        user
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}
