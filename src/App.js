import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { GlobalProvider } from './context/GlobalState';


import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Staff from "./components/pages/Staff";
import Login from "./components/auth/Login";
import { Users } from "./components/users/Users";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";


function onAuthRequired({ history }) {
  history.push("/login");
}



class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <Router>
          <Security
            issuer={process.env.REACT_APP_ORG_ID}
            clientId={process.env.REACT_APP_CLIENT_ID}
            redirectUri={window.location.origin + "/implicit/callback"}
            onAuthRequired={onAuthRequired}
            pkce={true}
          >
            <div className="App">
              <Navbar />
              <div className="container">
                <Route path="/" exact={true} component={Home} />
                <SecureRoute path="/staff" exact={true} component={Staff} />
                <SecureRoute path="/user" exact={true} component={Users} />
                <SecureRoute path="/dashboard" exact={true} component={Dashboard} />
                <Route
                  path="/login"
                  render={() => <Login baseUrl="https://dev-441752.okta.com" />}
                />
                <Route path="/implicit/callback" component={ImplicitCallback} />
              </div>
            </div>
          </Security>
        </Router>
      </GlobalProvider>
    );
  }
}

export default App;
