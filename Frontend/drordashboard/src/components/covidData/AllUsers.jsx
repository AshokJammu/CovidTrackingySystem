import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Search from "../Search";
import Navbar from "../../Navbar/Navbar";
// import { loginUserData } from "../redux/Login/action";

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      checkStatus: false,
      quarantineId:"",
      quarantineDays:"",
      covidId:""

    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/drorUsers").then(
      (res) =>
        this.setState({
          userdata: res.data
        })
      // console.log(res.data)
    );
  }

  handleCovid = (id) => {
    // console.log(id);
    this.setState({
      covidId:id
    })
  };

  handleConfirm = () => {
    const {covidId} = this.state
    let obj = {
      empId:covidId,
      days:14,
      status:1
    }
    axios.post("http://localhost:5000/drorUsers/statusUpdate",obj)
    .then((res) =>res.data);
  };

  handleAdd=()=>{
    //console.log()
    const {quarantineDays,quarantineId} = this.state
    let obj = {
      empId:quarantineId,
      days:quarantineDays,
      status:2
    }
    axios.post("http://localhost:5000/drorUsers/statusUpdate",obj)
    .then((res) =>res.data);
  }

  handleRecovery=(id)=>{
    let obj = {
      empId:id,
      days:0,
      status:0
    }
    axios.post("http://localhost:5000/drorUsers/statusUpdate",obj)
    .then((res) =>res.data);
  }

  render() {
    const { userdata, checkStatus,quarantineDays,quarantineId } = this.state;
    // const userArr = userdata.data;
    // console.log(userdata, "alldata");
    console.log(checkStatus,quarantineDays,quarantineId, "check");
    return (
      <>
        {/* <h1>All users List</h1> */}
        <Navbar />
        <Search />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Emp Id</th>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {userdata &&
            userdata.map((item) => (
              <tbody>
                <tr>
                  <th scope="row">{item.empId}</th>
                  {item.status === 0 && <td>Healthy</td>}
                  {item.status === 1 && <td>Covid</td>}
                  {item.status === 2 && <td>Quarantine</td>}
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>
                    {item.status === 0 ? 
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() => this.handleCovid(item.empId)}
                    >
                      Mark As Covid
                    </button> : <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => this.handleRecovery(item.empId)}
                    >
                      Mark As Recovery
                    </button> 
                     }
                  </td>
                </tr>
              </tbody>
            ))}
        </table>

        {/* {userdata && userdata.map(item => {
                    return ( */}
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Are You Sure?
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">Do you want to mark as covid +ve</div>
              <div>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="checkboxNoLabel"
                  value=""
                  aria-label="..."
                  onClick={() =>
                    this.setState({
                      checkStatus: !checkStatus,
                    })
                  }
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Choose Primary Contact list
                </label>

                {checkStatus && (
                  <div class="input-group">
                    <select
                      class="form-select"
                      id="inputGroupSelect04"
                      aria-label="Example select with button addon"
                      value={quarantineId}
                      onChange={(e) =>
                        this.setState({
                          quarantineId: e.target.value,
                        })
                      }
                    >
                      <option selected>EmpID</option>
                      {userdata &&
                        userdata.map((item) => {
                          return (
                            <>
                              <option value={item.empId}>{item.empId}</option>
                            </>
                          );
                        })}
                    </select>
                    <select
                      class="form-select"
                      id="inputGroupSelect04"
                      aria-label="Example select with button addon"
                      value={quarantineDays}
                      onChange={(e) =>
                        this.setState({
                          quarantineDays: e.target.value,
                        })
                      }
                    >
                      <option selected>Days</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="1">4</option>
                      <option value="2">5</option>
                      <option value="3">6</option>
                      <option value="3">7</option>
                    </select>
                    <button class="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => this.handleAdd()}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => this.handleConfirm()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* )
                  }) } */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  username: state.login.username,
  message: state.login.message,
  isLogin: state.login.isLogin,
  loginData: state.login.loginData,
});

export default connect(mapStateToProps, null)(AllUsers);
