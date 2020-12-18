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
      </>
    );
  }
}

export default Dashboard;
