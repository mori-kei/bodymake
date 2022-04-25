import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";
import { Route } from "react-router-dom";
const PrivateRoute = ({component, ...rest}) => {
  const {currentUser} = useContext(AuthContext);
  const Component = currentUser ? component : Login;

  return<Route {...rest} component={Component} />
}



export default PrivateRoute;