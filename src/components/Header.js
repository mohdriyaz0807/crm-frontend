import React,{useState} from 'react'
import {Navbar,Nav} from 'react-bootstrap'

const Header = () => {
    // const[token,settoken]=useState('')
    // settoken(localStorage.getItem('token'))
    return (
        <>
        <Navbar bg="info" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Easy CRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{float:'right'}}>
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {(token) ?  <Nav.Link href="/Logout">LogOut</Nav.Link> : 
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link> }
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        <br/>
        </>
    )
}

export default Header
