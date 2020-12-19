import React from "react"
import './App.css';
import Routes from "./Navbar/Router"


import { Redirect } from "react-router-dom";


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


function App() {
  var userExit = getData("cutomerExist")
  // if(userExit === undefined){
  //   <Redirect to="/" />
  // }
  return (
    <div className="App ">
     
       <br></br>
      <Routes />
    </div>
  );
}

export default App;
