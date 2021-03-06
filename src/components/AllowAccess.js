import React, { useEffect, useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import {Alert } from '@material-ui/lab'
import {Table  ,Dropdown } from 'react-bootstrap'

function AllowAccess() {
  const [render,Rerender] = useState(false)

    useEffect(() =>{
        fetch("https://crm-easy.herokuapp.com/access",{
      method: "GET",
      headers: {
        "auth" : localStorage.getItem('token')
      }
    }).then((res) => res.json()).then(data => {
        if(data.message === "success"){
            setLoading(false)
            setAccessUsers(data.users)
        }
        else {
            setLoading(false)
        }
    }).catch(err => {console.log(err)})
    } , [render] )



    const handleChange = (id , permission ) => {
        console.log(id , permission)
        fetch("https://crm-easy.herokuapp.com/access",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('token')
      },
      body : JSON.stringify( {  _id : id , permission : permission } )
    }).then((res) => res.json()).then(data => {
        if(data.message === "success") {
            setAlert({display : true , message : "Changes have been made successfully" , severity:"success" })
            Rerender(true)
        }
        else{
            setAlert({display : true , message : data.message , severity:"error" })
        }
    }).catch(err => {
        console.log(err)
    })

    }

    const [accessUsers, setAccessUsers] = useState([])
    const [loading , setLoading ] = useState(true)
    const [alert , setAlert ] = useState({display : false , message : "" , severity:"error" })

    if(loading) 
    return(<>
        <Skeleton variant="rect" height={"50px"}  />
        <Skeleton variant="rect" height={"50px"}  />
        <Skeleton variant="rect" height={"50px"}  /> </>)

else

    return (
       <>
       { alert.display ?  <Alert severity={alert.severity} onClose={() => { setAlert( {display : false} ) }} >{alert.message}</Alert> : <></> }
       
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Level</th>
      <th>Access</th>
      <th>Allow Access</th>
    </tr>
  </thead>
  <tbody>
      {accessUsers ? accessUsers.map(user => (
              <tr key = {user._id} >
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>{user.access}</th>
              <th>{user.permission}</th>
              <th><Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Modify
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item as="button" onClick={() => { handleChange(user._id , 'none') }} >None</Dropdown.Item>
    <Dropdown.Item as="button" onClick={() => { handleChange(user._id , 'view') }} >View Only</Dropdown.Item>
    <Dropdown.Item as="button" onClick={() => { handleChange(user._id , 'edit') }} >View and Edit</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></th>
            </tr>
      )):
      <h1>No Users to display</h1> }
  </tbody>
  </Table>
  </>
    )
}

export default AllowAccess
