import * as types from '../actions/ActionTypes';

const initialState = {
    login: {
        status: 'INIT'
    },
    signup: {
        status: 'INIT',
        error: -1
    },
    user: {
        isLoggedIn: false,
        currentUser: "",
        currentUserId:""
    },
    leave:{
      status: 'INIT',
      error: -1
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        /* LOGIN */
        case types.AUTH_LOGIN:
          return {
            ...state,
            login: {
              status: "WAITING"
            }
          }
        case types.AUTH_LOGIN_SUCCESS:
          return {
            ...state,
            login: {
              status: "SUCCESS"
            },
            user:{
              isLoggedIn: true,
              currentUser : action.user.displayName,
              currentUserId :action.user.authId
            }
          }
        case types.AUTH_LOGIN_FAILURE:
          return {
            ...state,
            login: {
              status: "FAILURE",
              error: action.error
            }
          }
        case types.AUTH_SIGNUP:
          return {
            ...state,
            signup: {
                status: "WAITING",
                error : -1
            }
          }
        case types.AUTH_SIGNUP_SUCCESS:
        return {
          ...state,
          signup: {
              status: "SUCCESS",
              error : -1
          }
        }
        case types.AUTH_SIGNUP_FAILURE:
        return {
          ...state,
          signup: {
              status: "FAILURE",
              error : action.error
          }
        }
        case types.AUTH_LEAVE:
          return {
            ...state,
            leave: {
                status: "WAITING",
                error : -1
            }
          }
        case types.AUTH_LEAVE_SUCCESS:
        return {
          ...state,
          leave: {
              status: "SUCCESS",
              error : -1
          },
          user:{
            isLoggedIn: false,
            currentUser : "",
            currentUserId:""
          }
        }
        case types.AUTH_LEAVE_FAILURE:
        return {
          ...state,
          leave: {
              status: "FAILURE",
              error : action.error
          }
        }

        case types.AUTH_GET_STATUS:
          return state;
        case types.AUTH_GET_STATUS_SUCCESS:
        if(action.user){
          return {
            ...state,
            user:{
              isLoggedIn: true,
              currentUser : action.user.displayName,
              currentUserId :action.user.authId
            }
          }
        } else{
          return {
            ...state,
            user:{
              isLoggedIn: false,
              currentUser : "",
              currentUserId :""
            }
          }
        }

        case types.AUTH_GET_STATUS_FAILURE:
          return {
            ...state,
            user:{
              isLoggedIn: false,
              currentUser : "",
              currentUserId:""
            }
          }
        case types.AUTH_LOGOUT:
          return {
            ...state,
            user:{
              isLoggedIn: false,
              currentUser : "",
              currentUserId:""
            }
          }
        default:
            return state;
    }
}
