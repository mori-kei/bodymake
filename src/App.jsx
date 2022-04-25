import React from "react"

import { BrowserRouter as Router } from "react-router-dom"
import { Route } from "react-router-dom"
import { Switch } from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import { AuthProvider } from "./auth/AuthProvider"
import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import Home from "./components/Home"
import Goal from "./components/Goal"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
    
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/goal" component={Goal} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
     
        </Switch>
      </Router>
    </AuthProvider>
  );
};
export default App;