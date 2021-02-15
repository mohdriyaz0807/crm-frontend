import React,{useState} from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router,Redirect } from "react-router-dom";
import {Login ,String} from "./components/User/Login";
import Register from "./components/User/Register";
import Forgot from "./components/User/Forgot";
import Reset from "./components/User/Reset";
import ContactsList from "./components/Contacts/ContactsList"
import LeadList from "./components/Lead/LeadList";
import ServiceList from "./components/ServiceRequest/ServiceList";
import Dashboard from "./components/Dashboard";
import AllowAccess from './components/AllowAccess'
import Error from './components/Error'



function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
        <Login/> 
          </Route>
        <Route path="/Login">
        <Login/> 
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard/>
        </Route>
        <Route exact path="/Register">
         <Register/>
        </Route>
        <Route path="/String">
          <String/>
        </Route>
        <Route exact path="/Forgot">
         <Forgot/>
        </Route>
        <Route exact path="/Reset">
         <Reset/>
        </Route>
        <Route path="/Contacts">
            <ContactsList/>
        </Route>
        <Route path="/ServiceRequest">
            <ServiceList/>
        </Route>
        <Route path="/Leads">
            <LeadList/>
        </Route>
        <Route path="/AllowAccess">
            <AllowAccess/>
        </Route>
        <Route path="*">
            <Error/>
        </Route>
      </Switch>
      </Router>
    </>
  );
}

export default App;