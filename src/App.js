import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Navbar from "./components/layout/Navbar";
import Navbar2 from "./components/layout/Navbar2";
import Navbar3 from "./components/layout/Navbar3";
import Home from "./components/pages/Home";
import Staff from "./components/pages/Staff";
import Login from "./components/auth/Login";
import User from "./components/users/User";

import "./App.css";

function onAuthRequired({ history }) {
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer={process.env.REACT_APP_ORG_ID}
          clientId={process.env.REACT_APP_CLIENT_ID}
          redirectUri={window.location.origin + "/implicit/callback"}
          onAuthRequired={onAuthRequired}
          pkce={true}
        >
          <div className="App">
            <Navbar3 />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <SecureRoute path="/user" exact={true} component={User} />
              <Route
                path="/login"
                render={() => <Login baseUrl="https://dev-441752.okta.com" />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
