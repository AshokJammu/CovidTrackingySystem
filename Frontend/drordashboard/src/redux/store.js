import {createStore, combineReducers,applyMiddleware,compose} from 'redux'

 
import reducerLogin from './Login/loginReducer'
import getUsers from './userData/userReducer'
import thunk from "redux-thunk";

 
const rootReducer =combineReducers({
    login:reducerLogin,
    allUsersData:getUsers
     
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    createComposer(
        applyMiddleware(
            thunk,
        )
    )
)
export default store