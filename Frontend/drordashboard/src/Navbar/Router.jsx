import React from "react";
import { Route,Switch } from "react-router-dom";
import AllUsers from "../components/covidData/AllUsers";
import Covid from "../components/covidData/Covid";
import Quarentine from "../components/covidData/Quarentine";

import Login from "../components/Login";

const Router = () => {
  return (
    <>
    <Switch>
    <Route path="/" exact render={(props)=> <Login {...props} /> } />
      <Route path="/admin/dashboard/all"   render={(props)=> <AllUsers {...props}/>} />
      <Route path="/admin/dashboard/covid" render={(props)=> <Covid {...props}/>}  />
      <Route path="/admin/dashboard/quarantine" render={(props)=> <Quarentine {...props}/>}  />

    </Switch>
    </>
  );
};

export default Router;
