import React from "react";
// import { FormControl } from "@material-ui/core";
import { connect } from "react-redux";
import { loginUserData } from "../redux/Login/action";
// import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: "",
      password: "",
    };
  }
  render() {
    const { password, empId} = this.state;
    // console.log(password,empId)
    const { isLogin, loginUserData,loginData } = this.props;
    console.log(isLogin,loginData, "props");
    // console.log(token, empId, message, "logggjsx");
    return (
      <>
        <div class="mb-3 row">
          {/* <label for="staticEmail" class="col-sm-2 col-form-label">Email</label> */}
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value={empId}
              placeholder="Enter EmpID"
              onChange={(e) =>
                this.setState({
                  empId: e.target.value,
                })
              }
            />
          </div>
        </div>
        <br />
        <div class="mb-3 row">
          {/* <label for="inputPassword" class="col-sm-2 col-form-label">Password</label> */}
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              value={password}
              placeholder="Enter Password"
              onChange={(e) =>
                this.setState({
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        <br />
        <button
          onClick={() => {
            loginUserData(this.state);
          }}
        >
          SUBMIT
        </button>
         
        <h3>{loginData.message}</h3>
        {console.log(loginData.error)}
        {/* {loginData.error === false && <Redirect to="/dashboard" />} */}
        {loginData.error === false && <Dashboard/>}
      </>
       
    );
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
  message: state.login.message,
  isLogin: state.login.isLogin,
  loginData:state.login.loginData
});
const mapDispatchToProps = dispatch => ({
  loginUserData: payload => dispatch(loginUserData(payload))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
// export default Login;
