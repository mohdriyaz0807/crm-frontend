import React,{useState} from 'react';
import {Paper , Grid , FormControl,FormHelperText,Input,InputLabel,Button,makeStyles  } from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from "axios"
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
    padding: theme.spacing(4),
    flexGrow: 1,
    marginBottom:'15%',
    },
    firstline:{
    textAlign:'center',
    fontSize:'150%',
    fontFamily:'serif',
    },
    paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
},
title:{
    fontSize:'150%',
    fontFamily:'serif',
    fontStyle:'bold',
    textAlign:'center'
},
note:{
  textAlign:'center',
}
}));

const Login =() =>{
    let url='https://crm-easy.herokuapp.com'
    const [data,setData]=useState({email:"",password:""})
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
        var user = await fetch(`${url}/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(data)
        }).then((res) => res.json())
        console.log(user)
        if(user.icon === "success"){
        setLoading(false)
        localStorage.setItem("token",user.token)
        localStorage.setItem("userdata",JSON.stringify(user.result))
        window.location.href='/Dashboard'
        }
        else{
          setLoading(false)
          SweetAlert(user.icon,user.message)
          console.log(user.message)
        }
      }
      catch(err) {
        console.log(err)
        setLoading(false)
      }
    }
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Grid container spacing={2}>
            <Grid item sm={4} xs={12} md={6} className={classes.title}>
            <h1>Easy CRM</h1><h2>Business Made Easy</h2>
            </Grid>
            <Grid item sm={8} xs={12} md={6}>
            <Paper className={classes.paper}>
            <h1 className={classes.firstline}>Login</h1>
            <FormControl >
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input type='email' id="my-input" aria-describedby="my-helper-text" onChange={e=>setData({...data,email:e.target.value})} value={data.email} />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl><br/>
            <FormControl>
            <InputLabel htmlFor="my-input1">Password</InputLabel>
            <Input type='password' id="my-input1" aria-describedby="my-helper-text1" onChange={e=>setData({...data,password:e.target.value})} value={data.password}/>
            <FormHelperText id="my-helper-text1">Password may be case sensitive</FormHelperText>
            </FormControl><br/><br/>
            <FormControl>
            <Button variant="contained" color="primary" disabled={loading} onClick={submit}>
            {loading ? "Logging in.." : "Login" }
            </Button>
            </FormControl><br/><br/>
            <FormControl>
            <Link to='./Register'>New User?</Link>
            </FormControl><br/><br/>
            <FormControl>
            <Link to='./Forgot'>Forgot Password?</Link>
            </FormControl>
            </Paper>
            </Grid>
            </Grid><hr/>
            <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={12} className={classes.note}>
            <p>For Login purpose, use below credentials</p>
            <p>Email : admin@crm.com</p>
            <p>Password : 12451245</p>
            </Grid>
            </Grid>
            </div>
    )
}

const String=()=>{
    let url='https://crm-easy.herokuapp.com'
    const requiredstring = localStorage.getItem('userdata').verifystring
    const show=async()=>{
    const res=await axios.get(`${url}/confirm/${requiredstring}`)
    console.log(res.data)
    }
    show()
}

export  {Login ,String}
