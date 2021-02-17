import React,{useState,useEffect} from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {Login ,String} from "./components/User/Login";
import Register from "./components/User/Register";
import Forgot from "./components/User/Forgot";
import Reset from "./components/User/Reset";
import Contacts from "./components/Contacts/Contacts"
import Leads from "./components/Lead/Leads";
import Service from "./components/ServiceRequest/Service";
import Dashboard from "./components/Dashboard";
import AllowAccess from './components/AllowAccess'
import Error from './components/Error'
import Header from './components/Header'



function App() {
  const[auth,setauth]=useState({jwt:''})
  useEffect(() => {
    return () => {
        setauth({jwt:localStorage.getItem('token')})
    }
}, [])
  return (
    <>
    <Header auth={auth}/>
    <Router>
      <Switch>
        <Route exact path="/">
        <Login/> 
          </Route>
        <Route path="/Login">
        <Login/> 
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard setauth={setauth}/>
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
            <Contacts/>
        </Route>
        <Route path="/ServiceRequest">
            <Service/>
        </Route>
        <Route path="/Leads">
            <Leads/>
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