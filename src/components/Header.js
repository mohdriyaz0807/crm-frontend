import React,{useState,useEffect} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import Logout from './User/Logout'

const Header = () => {
    const[auth,setauth]=useState({jwt:''})
    useEffect(() => {
        return () => {
            setauth({jwt:localStorage.getItem('token')})
        }
    }, [auth])

    return (
        <>
        <Navbar bg="info" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Easy CRM</Navbar.Brand>
        {auth.jwt ? 
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{float:'right'}}>
            <Nav className="mr-auto">
            <Nav.Link href="/Leads">Leads</Nav.Link>
            <Nav.Link href="/Contacts">Contacts</Nav.Link>
            <Nav.Link href="/ServiceRequest">ServiceRequest</Nav.Link>
            <Nav.Link onClick={()=>{localStorage.clear()}}>Logout</Nav.Link>
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
