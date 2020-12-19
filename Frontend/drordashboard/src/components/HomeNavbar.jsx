import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function getData(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch {
    return undefined;
  }
}

// function saveData(key, data) {
//     localStorage.setItem(key, JSON.stringify(data))
// }

export default class HomeNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userExist: "",
    };
  }

  componentDidMount() {
    this.setState({
      userExist: getData("cutomerExist"),
    });
  }
 
  render() {
    console.log(this.props)
    return (
      <div>
        <div class="d-flex justify-content-between alert alert-success">
          <div>
            <Link to="/" class="navbar-brand" href="#">
              <img
                src="data:image/png;base64,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"
                width="100"
                height="75"
                alt="Meetup"
              />
            </Link>
          </div>
          <div>
            <h2 class="pt-3 pb-4 text-center font-bold font-up deep-purple-text">
              COVID +ve Employee Tracking System
            </h2>
          </div>
          <div>
            {this.state.userExist && (
              <>
               <div class="d-flex">
                   <div class="mr-5">

                    <CgProfile style={{ height: 30, width:30 ,"marginRight":20, "marginTop":7}}/> 
                   </div>
                <button class="btn btn-danger ml-5" onClick={()=> this.props.logFn()}>Logout</button> 
               </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
