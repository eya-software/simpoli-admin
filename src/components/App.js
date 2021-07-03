import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Policies from "../pages/Policies";
import News from "../pages/News";
import Create from "../pages/Create";

function App() {
  return (
    <Router>
      <CookiesProvider>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/policies" component={Policies} />
            <PrivateRoute path="/news" component={News} />
            <PrivateRoute path="/create" component={Create} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Signin} />
          </Switch>
        </AuthProvider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
