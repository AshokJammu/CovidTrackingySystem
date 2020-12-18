import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
  } from "./actionType";
  import axios from "axios";
  // import { registerUserFailure } from "../Registration/action";
  
  export const loginUserRequest = payload => ({
    type: LOGIN_USER_REQUEST,
    payload: payload
  });
  
  export const loginUserSuccess = payload => ({
    type: LOGIN_USER_SUCCESS,
    payload
  });
  
  export const loginUserFailure = payload => ({
    type: LOGIN_USER_FAILURE,
    payload
  });
  
  export const loginUserData = payload => dispatch => {
    console.log(payload, "amm");
    dispatch(loginUserRequest(payload));
  
    return axios
      .post("http://localhost:5000/drorlogin", { ...payload })
      .then(res => {
          console.log(res.data,"ax")
        return res.data;
      })
      .then(res => dispatch(loginUserSuccess(res)))
      .catch(err => {
        dispatch(loginUserFailure(err));
      });
  };
  