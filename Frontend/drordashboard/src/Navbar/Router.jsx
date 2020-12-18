import React from "react";
import { Route } from "react-router-dom";
import AllUsers from "../components/covidData/AllUsers";
import Covid from "../components/covidData/Covid";
import Quarentine from "../components/covidData/Quarentine";

const Router = () => {
  return (
    <>
      <Route path="/" exact component={AllUsers} />
      <Route path="/covid" component={Covid} />
      <Route path="/dashboard" component={Quarentine} />
    </>
  );
};

export default Router;
