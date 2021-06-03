import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Projects from "../pages/Projects";
import Team from "../pages/Team";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/projects" component={Projects} />
          <PrivateRoute path="/team" component={Team} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Signin} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
