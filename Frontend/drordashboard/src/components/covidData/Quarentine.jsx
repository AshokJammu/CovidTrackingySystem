import React from "react";
import Navbar from "../../Navbar/Navbar";
import Search from "../Search";
import axios from "axios";
import HomeNavbar from "../HomeNavbar";
class Quarentine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        quarantineUserData: [],
        dataFlag:false
    };
  }

  componentDidMount() {

    axios.get("https://drorcovidinfo.herokuapp.com/drorUsers").then(
      (res) =>
        this.setState({
          quarantineUserData: res.data
        })
      
    );
     
    setTimeout (()=>{
       var newData = this.state. quarantineUserData.filter(item=> item.status === 2 && item)

       this.setState({
        quarantineUserData:newData,
           dataFlag:true
       })
    },3000)

  }

  handleRecovery = (id) => {
    const { quarantineUserData} = this.state
    console.log(id)
    var newStatus =  quarantineUserData.filter(item=> {
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
        covidUserData:newStatus
    })

    axios
      .post("https://drorcovidinfo.herokuapp.com/drorUsers/statusUpdate", obj)
      .then((res) => res.data);
  };

  render() {
      const { quarantineUserData} = this.state
      console.log( quarantineUserData,"covid")
    return (
      <div>
          <HomeNavbar />
        <Navbar />
        {  quarantineUserData.length > 0 && this.state.dataFlag ?  
            <>
        <Search />
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Emp Id</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Quarantine days</th>
              <th scope="col">Action</th>
               
            </tr>
          </thead>
          
          { quarantineUserData &&
             quarantineUserData
            .filter(item=> item.status === 2 && item)
            .map((item) => (
              <tbody>
                <tr>
                  <th scope="row">{item.empId}</th>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.days}</td>
                  <td>
                    
                      <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => this.handleRecovery(item.empId)}
                    >
                      Mark As Recovery
                    </button> 
                     
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
        </> : <h3 class="text-secondery">Ooops Data not Found</h3>
        }
      </div>
    
    );
  }
}

export default Quarentine;
