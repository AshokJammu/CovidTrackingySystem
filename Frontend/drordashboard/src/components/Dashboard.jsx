import React from "react";
import Navbar from "../Navbar/Navbar";
import Router from "../Navbar/Router";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  render() {
    const { search } = this.state;
    console.log(search);
    return (
      <>
        <h1>List of Employeess</h1>
        <Navbar />
        <Router />
        
        <input
          type="text"
          onChange={(e) =>
            this.setState({
              search: e.target.value,
            })
          }
          value={search}
        />

        <button>SEARCH</button>
      </>
    );
  }
}

export default Dashboard;
