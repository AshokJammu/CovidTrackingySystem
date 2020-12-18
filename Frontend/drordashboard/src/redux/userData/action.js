import {
    FETECH_USERS_FAILURE,
    FETECH_USERS_REQUEST,
    FETECH_USERS_SUCCESS
  } from "./actionTypes";
  
  import axios from "axios";

  export const fetchUserRequest = payload => ({
    type: FETECH_USERS_REQUEST
  });
  
  export const fetchUserSuccess = payload => ({
    type: FETECH_USERS_SUCCESS,
    payload
  });
  
  export const fetchUserFailure = payload => ({
    type: FETECH_USERS_FAILURE,
    payload
  });
  
  // it returns other function
  // thunk
  export const fetchUserData = (payload) => dispatch => {
    // console.log("arun", fetchUserData);
    console.log(payload, page, "all");
    dispatch(fetchUserRequest());
    return axios
      .get("http://localhost:5000/drorUsers")
      .then(res => res.data.items)
      .then(res => dispatch(fetchUserSuccess(res)))
      .then(err => dispatch(fetchUserFailure(err)));
  };
  