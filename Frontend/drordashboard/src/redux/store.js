import {createStore, combineReducers,applyMiddleware,compose} from 'redux'

 
import reducerLogin from './Login/loginReducer'
import thunk from "redux-thunk";

 
const rootReducer =combineReducers({
    login:reducerLogin,
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