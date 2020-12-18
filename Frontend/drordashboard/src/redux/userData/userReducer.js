import {
    FETECH_USERS_FAILURE,
    FETECH_USERS_SUCCESS,
    FETECH_USERS_REQUEST
  } from "./actionTypes";
  // import { loadData } from "./localStorage";
  
  const initState = {
    value: 0,
    isLoad: false,
    userData: [],
    page: "",
    perPage: ""
  };
  
  const reducer = (state = initState, action) => {
    // console.log(action.payload, "api");
    switch (action.type) {
      case FETECH_USERS_REQUEST:
        return {
          ...state,
          isLoad: false,
          isError: false
        };
      case FETECH_USERS_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          isLoad: true,
          page: action.page,
          perPage: action.perPage
        };
  
      case FETECH_USERS_FAILURE:
        return {
          ...state,
          isError: true,
          isLoad: false
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  