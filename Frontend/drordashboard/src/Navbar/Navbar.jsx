import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light alert alert-primary">
        <form class="container-fluid justify-content-start">
          <button class="btn btn-outline-success me-2" type="button">
            <Link to="/admin/dashboard/all" style={{ padding: 20 }}>
            Allusers
          </Link>
          </button>
          <button class="btn btn-outline-success me-2" type="button">
          <Link to="/admin/dashboard/covid" style={{ padding: 20 }}>
          Covid
        </Link>
          </button>

          <button class="btn btn-outline-success me-2" type="button">
          <Link to="/admin/dashboard/quarantine" style={{ padding: 20 }}>
          Quarantine
        </Link>
          </button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
