import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Login, String } from "./components/User/Login";
import Register from "./components/User/Register";
import Forgot from "./components/User/Forgot";
import Reset from "./components/User/Reset";
import Contacts from "./components/Contacts/Contacts";
import Leads from "./components/Lead/Leads";
import Service from "./components/ServiceRequest/Service";
import Dashboard from "./components/Dashboard";
import AllowAccess from "./components/AllowAccess";
import Error from "./components/Error";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route exact path="/Dashboard">
            <Navbar>
            <Dashboard />
            </Navbar>
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route path="/String/:verifystring">
            <String />
          </Route>
          <Route exact path="/Forgot">
            <Forgot />
          </Route>
          <Route exact path="/ResetPassword/:randomString">
            <Reset />
          </Route>
          <Route path="/Contacts">
          <Navbar>
            <Contacts />
            </Navbar>
          </Route>
          <Route path="/ServiceRequest">
          <Navbar>
            <Service />
            </Navbar>
          </Route>
          <Route path="/Leads">
          <Navbar>
            <Leads />
            </Navbar>
          </Route>
          <Route path="/AllowAccess">
          <Navbar>
            <AllowAccess />
            </Navbar>
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
