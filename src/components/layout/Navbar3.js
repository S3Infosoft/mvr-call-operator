import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  
} from "reactstrap";
import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light mb-4 navhdr">
        <Link className="navbar-brand" to="/">
          <img src="../assets/img/logo_sm.png" width="89" height="25" alt="S3InfoSoft"></img>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-2">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/staff">
                Dashboard
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/user">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <UncontrolledDropdown direction="down">
          <DropdownToggle nav>
            <img
              src="../../assets/img/6.jpg"
              className="img-avatar imgAvtr"
              alt="admin@s3infosofft.com"
              
            />
          </DropdownToggle>
          <DropdownMenu right className="drpMenu">
            <DropdownItem header tag="div" className="text-center hdrMnu">
              <strong>Account</strong>
            </DropdownItem>
            <DropdownItem header tag="div" className="text-center hdrMnu">
              <strong>Settings</strong>
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-user"></i> Profile
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-wrench"></i> Settings
            </DropdownItem>
            <DropdownItem onClick={e => this.props.onLogout(e)}>
              <i className="fa fa-lock"></i> Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </nav>
    );
  }
}
