import React from "react";
// import { FormControl } from "@material-ui/core";
import { connect } from "react-redux";
import { loginUserData } from "../redux/Login/action";
// import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import HomeNavbar from "./HomeNavbar";

function getData(key) {
  try {
      let data = localStorage.getItem(key)
      data = JSON.parse(data)
      return data
  }
  catch{
      return undefined
  }
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: "",
      password: "",
      idFlag: false,
      passwordFlag:false
    };
  }

  handleLogin =()=>{
    let {empId,password,idFlag,passwordFlag} = this.state

    if(empId === "" || password == ""){
      this.setState({
        idFlag:!idFlag,
        passwordFlag:!passwordFlag
      })
    }else{
      let obj={
        empId:empId,
        password:password
      }
      this.props.loginUserData(obj)
    }
  }
  render() {
    const { password, empId,passwordFlag,idFlag} = this.state;
    // console.log(password,empId)
    const { isLogin,loginData } = this.props;
    console.log(isLogin,loginData, "props");
    if(loginData && getData("cutomerExist")){

        if(isLogin && loginData.data[0].userType === "admin"){
          this.props.history.push("/admin/dashboard/all")
        }
    }


    return (
      <>
      <HomeNavbar props={this.props}/>
      <div class="border border-dark mx-5">
        
        <div class="mb-3 row px-5 my-4">
           <div class="col-sm-10">
            <input
              type="text"
              className={`form-control  ${idFlag ? 'is-invalid' : ''}`}
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
            {idFlag && <p class="text-danger">Please enter valid EmployeeID</p>}
        </div>
        <br />
        <div class="mb-3 row px-5 my-4">
           <div class="col-sm-10">
            <input
              type="password"
              className={`form-control  ${passwordFlag ? 'is-invalid' : ''}`}
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
            {passwordFlag && <p class="text-danger">Please enter valid Password</p>}
        </div>
        <button class="btn btn-primary btn-center"
          onClick={() => {
            this.handleLogin();
          }}
        >
          LOGIN
        </button>
      </div>
        <br />
         
        {/* {console.log(loginData.error)} */}
        {/* {loginData.error === false && <Redirect to="/dashboard" />} */}
        {/* {loginData.error === false && <Dashboard/>} */}
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
