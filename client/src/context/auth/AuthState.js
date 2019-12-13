import React, { useReducer } from "react";
import axios from "axios";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { ERROR, REGISTER } from "../types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    token: null,
    currentUser: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register
  const registerUser = async values => {
    try {
      const res = await axios.post("/users", values, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER, payload: res.data.token });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Login
  const loginUser = async () => {
    console.log("login");
  };

  // Logout
  const logoutUser = async () => {
    console.log("logout");
  };

  // Get user ??
  const getUser = async () => {
    console.log("get user --- set token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        currentUser: state.currentUser,
        registerUser,
        loginUser,
        logoutUser,
        getUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
