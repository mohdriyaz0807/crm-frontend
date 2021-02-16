import React , {useState} from 'react'
import {Form , Col, Button } from 'react-bootstrap'
import {Alert } from '@material-ui/lab'


function AddContactsForm(props) {
    
  const handleOnSubmit = async (event) => {

    setLoading(true)

    event.preventDefault()
    try{
    var contact = await fetch("https://crm-easy.herokuapp.com/contact",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('token')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(contact.message === "success"){
      console.log(contact.message)
      setLoading(false)
      setAlert({display : true , message : "contact created successfully"  , severity : "success" })
      {props.Rerender(true)}
    }
    else{
      console.log(contact.message)
      setLoading(false)
      setAlert({display : true , message : contact.message , severity : "error" })
    }
    setData({email : '' , name : "" , company : "" })
  }catch(err){
    setLoading(false)
    setAlert({display : true , message : "Something went wrong..." , severity : "error" })
  }

  }

  const handleOnChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data))
    temp[prop] = value;
    setData(temp)
  }

  const [data, setData] = useState({email : '' , name : "" , company : "" })
  const [loading , setLoading ] = useState(false)
  const [alert , setAlert ] = useState({display : false , message : "" ,severity : "error" })

    return (
      <>
      { alert.display ?  <Alert severity={alert.severity} onClose={() => { setAlert( {display : false} ) }} >{alert.message}</Alert> : <></> }
    
<Form onSubmit={handleOnSubmit} >
  <Form.Row>
      <Form.Group as={Col} md="3" >
      <Form.Label>Name </Form.Label>
      <Form.Control placeholder="Name" type="text" onChange={handleOnChange} name="name" value={data.name} />
    </Form.Group>
      <Form.Group as={Col} md="3" >
      <Form.Label>E-mail </Form.Label>
      <Form.Control placeholder="email" type="email" onChange={handleOnChange} name="email" value={data.email} />
    </Form.Group>
      <Form.Group as={Col} md="3" >
      <Form.Label>Company </Form.Label>
      <Form.Control placeholder="company" type="text" onChange={handleOnChange} name="company" value={data.company} />
    </Form.Group>
      <Form.Group as={Col} md="3" className="pt-4">
      <Button type="submit" disabled={loading}>{loading ? "Please Wait" : "Submit"}</Button>
    </Form.Group>
  </Form.Row>
</Form>
</>
    )
}

export default AddContactsForm
