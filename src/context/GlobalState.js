import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  users: [],
  error: null,
  loading: true
};

// create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getUsers() {
    try {
      const res = await axios.get(
        "https://dev-441752-admin.okta.com/api/v1/users?limit=200",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "SSWS 00qthC_Tls-hpzrR2uHvPtIVKyCgD1AAP6Vasd7RxQ"
          }
        }
      );

      dispatch({
        type: "GET_USERS",
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err.response
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        error: state.error,
        loading: state.loading,
        getUsers
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
