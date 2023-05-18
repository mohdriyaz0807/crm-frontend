import React, {useState} from 'react';
import { Paper , Grid ,FormControl,Input,InputLabel,Button,makeStyles,FormLabel,Radio,FormControlLabel,RadioGroup } from '@material-ui/core';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { API_PATH } from '../../utils/api';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(4),
      flexGrow: 1,
      backgroundImage:'url(https://i.pinimg.com/originals/e2/34/b5/e234b5999940f25089b7bfd89ab74651.jpg)'
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title:{
        fontSize:'150%',
        fontFamily:'serif',
        fontStyle:'bold',
        textAlign:'center'
    }
  }));

const Register = () =>{
    const [data,setData]=useState({name:"",email:"",password:"", access : "",permission:"none"})
    const [loading , setLoading ] = useState(false)
    const SweetAlert =(status,data)=>{
        Swal.fire({
          icon: status,
          title: 'Alert',
          text: data,
      })
      }
    const submit = async ()=>{
      if(Object.values(data).length>=4){
    setLoading(true)
    try {
        var user = await fetch(`${API_PATH}/register`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(data)
        }).then((res) => res.json())
        if(user.icon === "success"){
          console.log(user.message)
          setLoading(false)
          SweetAlert(user.icon,user.message)
          setData( {name : "" , email : '' , password : "" , access : ""} )
          window.location.href='/Login'
        }
        else{
          console.log(user.message)
          setLoading(false)
          SweetAlert(user.icon,user.message)
        }
      }
      catch(err) {
        console.log(err);
    }}else{
      SweetAlert('warning','Please Fill all fields')
    }
      }
    const classes = useStyles()
    return(
        <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12} md={7} className={classes.title}>
          <h1>Easy CRM</h1><h2>Register now to get the Exclusive Benefits</h2>
          </Grid>
        <Grid item sm={8} xs={12} md={5}>
        <Paper className={classes.paper} >
            <FormControl >
            <InputLabel htmlFor="my-name">Full Name</InputLabel>
            <Input type='text' id="my-name" onChange={e=>setData({...data,name:e.target.value})} value={data.name}/>
            </FormControl><br/>
            <FormControl >
            <InputLabel htmlFor="my-mail">Email address</InputLabel>
            <Input type='email' id="my-mail" onChange={e=>setData({...data,email:e.target.value})} value={data.email}/>
            </FormControl><br/>
            <FormControl>
            <InputLabel htmlFor="my-password">Password</InputLabel>
            <Input type='password' id="my-password" onChange={e=>setData({...data,password:e.target.value})} value={data.password} aria-describedby="my-helper-text1" />
            </FormControl><br/><br/>
            <FormControl component="fieldset">
            <FormLabel component="legend">Register as</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={data.access} onChange={e=>setData({...data,access:e.target.value})}>
                <FormControlLabel value="admin" control={<Radio />} label="Manager" />
                <FormControlLabel value="user" control={<Radio />} label="Employee" />
            </RadioGroup>
            </FormControl>
            <br/>
            <Button variant="contained" color="primary" onClick={submit}>
            {loading ? "Please Wait.." : "Register" }
            </Button><br/><br/>
            <FormControl>
            <Link to='./Login'>Back</Link>
            </FormControl>
            </Paper>
            </Grid>
            </Grid>
            </div>
    )
}

export default Register;