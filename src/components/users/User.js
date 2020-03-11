import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./User.css";

const apiUrl = `http://localhost:8080`;

class User extends Component {
  state = {
    users: []
  };

  async createUser() {
    await axios.get(apiUrl + "/user-create");
    this.loadUsers();
  }

  async loadUsers() {
    const res = await axios.get(apiUrl + "/users");
    this.setState({
      users: res.data
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    return (
      <div className="App1">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => this.createUser()}>Create Users:</button>
          <p>Users list:</p>
          <ul>
            {this.state.users.map(user => (
              <li key={user._id}>id: {user._id}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default User;
