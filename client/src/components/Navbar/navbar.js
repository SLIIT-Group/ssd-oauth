import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const Navbar = (props) => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const body = {
      code: code,
    };

    axios
      .post(`http://localhost:5000/googleDrive/getToken`, body)
      .then((data) => {
        if (data) {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("scope", data.data.scope);
          localStorage.setItem("token_type", data.data.token_type);
          localStorage.setItem("expiry_date", data.data.expiry_date);
          localStorage.setItem("id_token", data.data.id_token);
        }
      })
      .catch((err) => {
        /*error*/
      });
  }, []);

  const logout = () => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("scope", "");
    localStorage.setItem("token_type", "");
    localStorage.setItem("expiry_date", "");
    localStorage.setItem("id_token", "");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="ssd-navbar">
        <Link to={"/"} className="navbar-brand ssd-navbar-header">
          {" "}
          SSD Assignment 2
        </Link>
        <div className="ssd-empty-space" />
        <ul className="navbar-nav mr-auto ssd-navbar-sub-header">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} className="nav-link" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
