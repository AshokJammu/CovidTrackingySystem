import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* <h1>NavBar</h1> */}
      <div>
        <Link to="/admin/dashboard/all" style={{ padding: 20 }}>
         Allusers
        </Link>

        <Link to="/admin/dashboard/covid" style={{ padding: 20 }}>
          Covid
        </Link>

        <Link to="/admin/dashboard/quarantine" style={{ padding: 20 }}>
          Quarantine
        </Link>
      </div>
    </>
  );
};

export default Navbar;
