import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { withAuth } from "@okta/okta-react";
import "./Navbar.css";

export default withAuth(
  class Navbar extends Component {
    state = { authenticated: null };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login("/staff");
    };

    logout = async () => {
      this.props.auth.logout("/login");
    };
    render() {
      const accessAuth = this.state.authenticated ? (
        <DropdownItem onClick={this.logout}>
          <i className="fa fa-lock"></i> Logout
        </DropdownItem>
      ) : (
          <DropdownItem onClick={this.login}>
            <i className="fa fa-unlock-alt"></i> Login
          </DropdownItem>
        );

      return (
        <nav className="navbar navbar-expand-sm navbar-light mb-4 navhdr">
          <Link className="navbar-brand" to="/">
            <img
              src="../assets/img/logo_sm.png"
              width="89"
              height="25"
              alt="S3InfoSoft"
            ></img>
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
              {/* <li className="nav-item px-2">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li> */}
              <li className="nav-item px-2">
                <Link className="nav-link" to="/staff">
                  Home
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item px-2 ">
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
              {accessAuth}
            </DropdownMenu>
          </UncontrolledDropdown>
        </nav>
      );
    }
  }
);
