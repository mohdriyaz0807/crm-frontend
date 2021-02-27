import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'

const Header = () => {

    return (
        <>
        <Navbar bg="info" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Easy CRM</Navbar.Brand>
        {['Login','Register','Forgot','ResetPassword',''].some(i=>window.location.href.split('/').includes(i))===false ? 
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{float:'right'}}>
            <Nav className="mr-auto">
            <Nav.Link href="/AllowAccess">AllowAccess</Nav.Link>
            <Nav.Link href="/Leads">Leads</Nav.Link>
            <Nav.Link href="/Contacts">Contacts</Nav.Link>
            <Nav.Link href="/ServiceRequest">ServiceRequest</Nav.Link>
            <Nav.Link href="/Login" onClick={()=>{localStorage.clear()}}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </>
        : '' }
        </Navbar>
        <br/>
        </>
    )
}

export default Header
