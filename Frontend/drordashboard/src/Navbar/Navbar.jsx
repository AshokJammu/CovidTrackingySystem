import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* <h1>NavBar</h1> */}
      <div>
        <Link to="/" style={{ padding: 20 }}>
         Allusers
        </Link>

        <Link to="/covid" style={{ padding: 20 }}>
          Covid
        </Link>

        <Link to="/dashboard" style={{ padding: 20 }}>
          DASHBOARD
        </Link>
      </div>
    </>
  );
};

export default Navbar;
