import {
    GET_USER
  } from "./actionType";

  
  const initState = {
    allUsersData: []
  };
  
  const reducer = (state = initState, action) => {
    // console.log(action.payload, "api");
    switch (action.type) {
      case GET_USER:
        return {
          ...state,
        allUsersData:action.payload
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  