import React , {useEffect , useState} from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import {Alert , AlertTitle} from '@material-ui/lab'
import DeleteIcon from '@material-ui/icons/Delete';
import {Table  } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress';

function ContatsList(props) {
    useEffect(() => {
         fetch("https://crm-easy.herokuapp.com/contact", {
             method : "GET",
             headers : {
                "auth" : localStorage.getItem('token')
             }
         } ).then(res => res.json()).then((data) =>{
             // Upadte 
             setLoading(false)
             if(data.message === "success"){
                console.log(data)
                setContacts(data.contacts)
             }
             else{
                setAlert({display : true , message : data.message })
             }
         }).catch((err) => {
            setAlert({display : true , message : err-"Something went wrong try again later" })
         })
    }, [props.render])

    const handleDelete=(id)=>{
      setAction(<CircularProgress color="inherit" />)
      fetch(`https://crm-easy.herokuapp.com/contact/${id}`, {
        method : "PUT",
        headers : {
           "auth" : localStorage.getItem('token')
        }
    }).then(res => res.json()).then((data) =>{
        {props.Rerender(true)}
        })
    .catch((err) => {
      setAlert({display : true , message : err-"Something went wrong try again later" })
    })
    setAction(<DeleteIcon fontSize="small" />)
  }
    const [contacts , setContacts ] =useState([])
    const [loading , setLoading ] = useState(true)
    const [alert , setAlert ] = useState({display : false , message : "" })
    const [action,setAction] =useState(<DeleteIcon fontSize="small" />)
    if(loading)
        return(<>
            <Skeleton variant="rect" height={"50px"}  />
            <Skeleton variant="rect" height={"50px"}  />
            <Skeleton variant="rect" height={"50px"}  /> </>)
    else
    return (
        <> 
        {alert.display ? <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  {alert.message}<strong> - check it out!</strong>
</Alert> : <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Company</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
{contacts ? contacts.map( (contact , index ) => (
                <tr key={contact._id}>
                <td>{index+1}</td>
              <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.company}</td>
                <td onClick={()=>handleDelete(contact._id)}>{action}</td>
              </tr>
    )):
    <h1>No Contacts to Display</h1> }
  </tbody>
</Table> } 
        </>
    )
}

export default ContatsList
