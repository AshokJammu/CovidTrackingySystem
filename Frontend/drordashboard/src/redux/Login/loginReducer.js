import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
  } from "./actionType";
  
  const initState = {
    isLogin: false,
    loginData: "",
    username: "",
    message: ""
  };
  
  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const loginReducer = (state = initState, action) => {
    console.log(action.payload, "rrr");
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        return {
          ...state,
          username: action.payload.username,
          isLogin: false
        };
      case LOGIN_USER_SUCCESS:
        saveData("cutomerExist",{"username":action.payload.data[0].name ,"usertype":action.payload.data[0].userType})
        return {
          ...state,
          loginData: action.payload,
          isLogin: true,
          message: action.payload.message
        };
      case LOGIN_USER_FAILURE:
        return {
          ...state,
          isLogin: false,
          message: action.payload.message
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  