import React, {useState} from 'react';
import { Paper , Grid ,FormControl,Input,InputLabel,Button,makeStyles,FormLabel,Radio,FormControlLabel,RadioGroup } from '@material-ui/core';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(4),
      flexGrow: 1,
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
    let url='https://crm-easy.herokuapp.com'
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
    setLoading(true)
    try {
        var user = await fetch(`${url}/register`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(data)
        }).then((res) => res.json())
        if(user.icon === "success"){
          console.log(user.message)
          setLoading(false)
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
    }
      }
    const classes = useStyles()
    return(
        <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12} md={4}>
          <h1>Easy CRM</h1><h2>Register now to get the Exclusive Benefits</h2>
          </Grid>
        <Grid item sm={6} xs={12} md={4}>
        <Paper className={classes.paper}>
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
                <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
            </RadioGroup>
            </FormControl>
            <br/>
            <Button variant="contained" color="primary" disabled={loading} onClick={submit}>
            {loading ? "Please Wait.." : "Register" }
            </Button><br/>
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