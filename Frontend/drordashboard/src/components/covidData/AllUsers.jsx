import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Search from "../Search";
import Navbar from "../../Navbar/Navbar";
import HomeNavbar from "../HomeNavbar";
// import { loginUserData } from "../redux/Login/action";
function getData(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch {
    return undefined;
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: "",
      checkStatus: false,
      quarantineId: "",
      quarantineDays: "",
      covidId: "",
      quarantineMessage: false,
      userExist: "",
      logOutFlag: false,
      quarantineFlag: false,
      covidFlag: false,
      statuArr: []
    };
  }

  componentDidMount() {
    this.setState({
      userExist: getData("cutomerExist"),
    });
    axios.get("https://drorcovidinfo.herokuapp.com/drorUsers").then(
      (res) =>
        this.setState({
          userdata: res.data,
        })
      // console.log(res.data)
    );
  }

  handleCovid = (id) => {
    // console.log(id);
    this.setState({
      covidId: id,
    });
  };

  handleConfirm = () => {
    const { covidId,statuArr,userdata } = this.state;
    var newStatus = userdata.filter(item=> {
      if(item.empId === Number(covidId)){
        item.status = 1
        item.days = 14
        return item
      }else{
        return item
      }
    })

    let obj = {
      empId: Number(covidId),
      days: 14,
      status: 1,
    };
    this.setState({
      covidFlag: true,
       statuArr:[...statuArr,obj],
       userdata:newStatus
    });

    axios
      .post("https://drorcovidinfo.herokuapp.com/drorUsers/statusUpdate", obj)
      .then((res) => res.data);
  };

  handleAdd = () => {
    //console.log()
    const { quarantineDays, quarantineId, quarantineMessage,statuArr,userdata } = this.state;

    var newStatus = userdata.filter(item=> {
      if(item.empId === Number(quarantineId)){
        item.status = 2
        item.days = Number(quarantineDays)
        return item
      }else{
        return item
      }
    })
    let obj = {
      empId: Number(quarantineId),
      days: Number(quarantineDays),
      status: 2,
    };

    this.setState({
      quarantineMessage: !quarantineMessage,
      quarantineFlag: true,
      covidFlag: false,
      statuArr: [...statuArr,obj],
      userdata: newStatus
    });


    axios
      .post("https://drorcovidinfo.herokuapp.com/drorUsers/statusUpdate", obj)
      .then((res) => res.data);
  };

  handleRecovery = (id) => {
    const {userdata} = this.state
    var newStatus = userdata.filter(item=> {
      if(item.empId === Number(id)){
        item.status = 0
        item.days = 0
        return item
      }else{
        return item
      }
    })
    let obj = {
      empId: id,
      days: 0,
      status: 0,
    };

    this.setState({
      userdata:newStatus
    })

    axios
      .post("https://drorcovidinfo.herokuapp.com/drorUsers/statusUpdate", obj)
      .then((res) => res.data);
  };

  handleLogout = () => {
    console.log("logout");
    saveData("cutomerExist", null);
    this.setState({
      logOutFlag: true,
      userExist: "",
    });
    // window.location.reload(false);
    // this.props.history.push("/");
  };

  render() {

    const {
      userdata,
      checkStatus,
      quarantineDays,
      quarantineId,
      quarantineMessage,
      userExist,
      quarantineFlag,
      covidFlag,
      covidId,
      statuArr
    } = this.state;
    // const userArr = userdata.data;
    console.log(userdata, "alldata");
    // console.log(checkStatus, quarantineDays, quarantineId, "check");

    if (getData("cutomerExist") === null) {
      console.log("history");
      this.props.history.push("/");
    }

    return (
      <>
        {/* <h1>All users List</h1> */}
        <HomeNavbar logFn={this.handleLogout} />
        <Navbar />
        <Search />
        <table className="table table-striped">
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
                  {/* <td>
                    {item.status === 0 && !quarantineFlag && !covidFlag && (
                      <span class="text-success">Healthy</span>
                    )}
                    {item.status === 1 && !quarantineFlag && !covidFlag && (
                      <span class="text-danger">Covid</span>
                    )}
                    {item.status === 2 && !quarantineFlag && !covidFlag && (
                      <span class="text-warning">Quarantine</span>
                    )}
                    {quarantineFlag && item.empId === quarantineId ? (
                      <span class="text-warning">Quarantine</span>
                    ) : (
                      <>
                        {quarantineFlag && (
                          <>
                            {item.status === 0 && (
                              <span class="text-success">Healthy</span>
                            )}
                            {item.status === 1 && (
                              <span class="text-danger">Covid</span>
                            )}
                            {item.status === 2 && (
                              <span class="text-warning">Quarantine</span>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {covidFlag && item.empId === covidId ? (
                      <span class="text-danger">Covid</span>
                    ) : (
                      <>
                        {covidFlag && (
                          <>
                            {item.status === 0 && (
                              <span class="text-success">Healthy</span>
                            )}
                            {item.status === 1 && (
                              <span class="text-danger">Covid</span>
                            )}
                            {item.status === 2 && (
                              <span class="text-warning">Quarantine</span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td> */}
                  {/* <td>
                    { statuArr.length > 0 ?  statuArr.filter(ele=>
                         {if(ele.empId === item.empId){
                           return ele
                         }}
                      )  && statuArr[0].empId == item.empId ?  <>{statuArr[0].status === 0  && (
                        <span class="text-success">First if Healthy</span>
                      )}
                      {statuArr[0].status === 1 &&  (
                        <span class="text-danger"> first if Covid</span>
                      )}
                      {statuArr[0].status  === 2  && (
                        <span class="text-warning"> first if  Quarantine</span>
                      )}</> :
                       <>
                      {item.status === 0  && (
                      <span class="text-success">  first else Healthy</span>
                    )}
                    {item.status === 1 &&   (
                      <span class="text-danger"> first elseCovid</span>
                    )}
                    {item.status === 2 &&   (
                      <span class="text-warning">first else Quarantine</span>
                    )} 
                      </> 
                    :
                    <>
                   {item.status === 0 &&   (
                   <span class="text-success">main else Healthy</span>
                 )}
                 {item.status === 1 &&   (
                   <span class="text-danger"> main else  Covid</span>
                 )}
                 {item.status === 2 &&   (
                   <span class="text-warning">main else  Quarantine</span>
                 )}
                   </>   
                    }
                  </td> */}
                  <td>
                  {item.status === 0 &&   (
                   <span class="text-success">Healthy</span>
                 )}
                 {item.status === 1 &&   (
                   <span class="text-danger">Covid</span>
                 )}
                 {item.status === 2 &&   (
                   <span class="text-warning">Quarantine</span>
                 )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>

                  <td>
                  {item.status === 0 &&  (
                   <button
                   type="button"
                   class="btn btn-danger"
                   data-toggle="modal"
                   data-target="#exampleModalCenter"
                   onClick={() => this.handleCovid(item.empId)}
                 >
                   Mark As Covid
                 </button>
                 )}
                 {item.status === 1 &&   (
                   <button
                   type="button"
                   class="btn btn-success"
                   onClick={() => this.handleRecovery(item.empId)}
                 >
                   Mark As Recovery
                 </button>
                 )}
                 {item.status === 2 &&   (
                   <button
                   type="button"
                   class="btn btn-success"
                   onClick={() => this.handleRecovery(item.empId)}
                 >
                   Mark As Recovery
                 </button>
                 )}
                  </td>
                  {/* <td>
                  {statuArr.length > 0 ?  statuArr.filter(ele=>
                         {if(ele.empId == item.empId){
                           return ele
                         }}
                      )  && statuArr[0].empId == item.empId ?  <>{statuArr[0].status === 0  && (
                        <button
                        type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => this.handleCovid(item.empId)}
                      >
                        Mark As Covid
                      </button>
                      )}
                      {statuArr[0].status === 1 &&  (
                         <button
                         type="button"
                         class="btn btn-success"
                         onClick={() => this.handleRecovery(item.empId)}
                       >
                         Mark As Recovery
                       </button>
                      )}
                      {statuArr[0].status  === 2  && (
                        <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => this.handleRecovery(item.empId)}
                      >
                        Mark As Recovery
                      </button>
                      )}</> :
                       <>
                      {item.status === 0 &&   (
                      <button
                      type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() => this.handleCovid(item.empId)}
                    >
                      Mark As Covid
                    </button>
                    )}
                    {item.status === 1 &&  (
                      <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => this.handleRecovery(item.empId)}
                    >
                      Mark As Recovery
                    </button>
                    )}
                    {item.status === 2 &&   (
                      <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => this.handleRecovery(item.empId)}
                    >
                      Mark As Recovery
                    </button>
                    )} 
                      </> 
                    :
                    <>
                   {item.status === 0 &&  (
                   <button
                   type="button"
                   class="btn btn-danger"
                   data-toggle="modal"
                   data-target="#exampleModalCenter"
                   onClick={() => this.handleCovid(item.empId)}
                 >
                   Mark As Covid
                 </button>
                 )}
                 {item.status === 1 &&   (
                   <button
                   type="button"
                   class="btn btn-success"
                   onClick={() => this.handleRecovery(item.empId)}
                 >
                   Mark As Recovery
                 </button>
                 )}
                 {item.status === 2 &&   (
                   <button
                   type="button"
                   class="btn btn-success"
                   onClick={() => this.handleRecovery(item.empId)}
                 >
                   Mark As Recovery
                 </button>
                 )}
                   </>   
                    }
                  </td> */}
                  {/* <td>
                    {item.status === 0 && !quarantineFlag && !covidFlag ? (
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => this.handleCovid(item.empId)}
                      >
                        Mark As Covid
                      </button>
                    ) : (
                      <>
                        {!quarantineFlag && !covidFlag && (
                          <button
                            type="button"
                            class="btn btn-success"
                            onClick={() => this.handleRecovery(item.empId)}
                          >
                            Mark As Recovery
                          </button>
                        )}
                      </>
                    )}
                    {quarantineFlag && item.empId === quarantineId ? (
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => this.handleRecovery(item.empId)}
                      >
                        Mark As Recovery
                      </button>
                    ) : (
                      <>
                        {quarantineFlag && (
                          <>
                            {item.status === 0 ? (
                              <button
                                type="button"
                                class="btn btn-danger"
                                onClick={() => this.handleCovid(item.empId)}
                              >
                                Mark As Covid
                              </button>
                            ) : (
                              <button
                                type="button"
                                class="btn btn-success"
                                onClick={() => this.handleRecovery(item.empId)}
                              >
                                Mark As Recovery
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {covidFlag && item.empId === covidId ? (
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => this.handleRecovery(item.empId)}
                      >
                        Mark As Recovery
                      </button>
                    ) : (
                      <>
                        {covidFlag && (
                          <>
                            {item.status === 0 ? (
                              <button
                                type="button"
                                class="btn btn-danger"
                                onClick={() => this.handleCovid(item.empId)}
                              >
                                Mark As Covid
                              </button>
                            ) : (
                              <button
                                type="button"
                                class="btn btn-success"
                                onClick={() => this.handleRecovery(item.empId)}
                              >
                                Mark As Recovery
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td> */}
                </tr>
              </tbody>
            ))}
        </table>

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
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      onClick={() => this.handleAdd()}
                    >
                      Add
                    </button>
                  </div>
                )}
                {quarantineMessage
                  ? "Successfully Added to Quarantine"
                  : "Please Add to Quarantinee"}
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
                  class="btn btn-primary close"
                  data-dismiss="modal"
                  aria-label="Close"
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
