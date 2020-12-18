import React from 'react'
import { connect } from "react-redux";
// import { loginUserData } from "../redux/Login/action";

class AllUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <>
                <h1>All users List</h1>
            </>
        )
    }
}
const mapStateToProps = state => ({
  username: state.login.username,
  message: state.login.message,
  isLogin: state.login.isLogin,
  loginData:state.login.loginData
});
 
export default connect(
  mapStateToProps,
  null
)(AllUsers);