import React,{useState,useEffect} from 'react';
import {Paper , Grid , FormControl,FormHelperText,Input,InputLabel,Button,makeStyles  } from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from "axios"
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
    padding: theme.spacing(4),
    flexGrow: 1,
    backgroundImage:'url(https://i.pinimg.com/originals/e2/34/b5/e234b5999940f25089b7bfd89ab74651.jpg)'
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
    fontSize:'100%',
    fontFamily:'serif',
    fontStyle:'bold',
    textAlign:'center',
},
note:{
  textAlign:'center',
  backgroundColor:'lightblue',
  paddingBlock:'2%',
  border:'4px solid white',
  borderTopStyle:'curl'
}
}));

const Login =() =>{
  let url='https://crm-easy.herokuapp.com'

  useEffect(() => {
  fetch(`${url}/login`,{
    method: "GET",
    headers: {
      "auth" : localStorage.getItem('token')
    },
  }).then((res) => res.json())
  .then((data) =>{
    console.log(data)
    if(data.message===true){
      window.location.href='/Dashboard'
    }
  }).catch((err) => {
    console.log(err)
 })
}, [])

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
          SweetAlert('warning',err)
          console.log(err)
        setLoading(false)
      }
    }
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Grid container spacing={2} alignItems='center'>
            <Grid item sm={4} xs={12} md={7} className={classes.title}>
            <h1>Easy CRM</h1><h2><i>Business Made Easy</i></h2>
            <p>India's Best Customer Relationship Management Application</p>
            </Grid>
            <Grid item sm={8} xs={12} md={5}>
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
            <Button variant="contained" color="secondary" disabled={loading} onClick={submit}>
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
            <div className={classes.note}>
            <h4>For Login purpose, use below credentials</h4>
            <p>Email : admin@crm.com</p>
            <p>Password : 12451245</p>
            </div>
            </Grid>
            </Grid>
            </div>
    )
}

const String=()=>{
    let url='https://crm-easy.herokuapp.com'
    const href = window.location.href.split('/')
    const requiredstring = href[href.length-1]
    const SweetAlert =(status,data)=>{
      Swal.fire({
        icon: status,
        title: 'Alert',
        text: data,
    })
    }
    const show=async()=>{
    const res=await axios.get(`${url}/confirm/${requiredstring}`)
    console.log(res.data)
    SweetAlert('success',res.message)
    }
    show()
}

export  {Login ,String}
