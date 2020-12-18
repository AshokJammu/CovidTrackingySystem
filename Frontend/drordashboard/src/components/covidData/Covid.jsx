import React from "react";
import Navbar from "../../Navbar/Navbar";
import Search from "../Search";
import axios from "axios";
class Covid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        covidUserData:""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/drorUsers").then(
      (res) =>
        this.setState({
            covidUserData: res.data
        })
      
    );
  }

  render() {
      const {covidUserData} = this.state
      console.log(covidUserData )
    return (
      <div>
        <Navbar />
        <Search />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Emp Id</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Quarantine days</th>
              <th scope="col">#of Quarantines</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {/* {people.filter(person => person.age < 60).map(filteredPerson => (
        <li>
          {filteredPerson.name}
        </li>
      ))} */}
          {covidUserData &&
            covidUserData
            .filter(item=> item.status ===1)
            .map((item) => (
              <tbody>
                <tr>
                  <th scope="row">{item.empId}</th>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.days}</td>
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
      </div>
    );
  }
}

export default Covid;
