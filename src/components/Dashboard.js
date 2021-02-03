import React ,{useEffect, useState} from "react";
import {Paper,makeStyles,Grid,Typography,Button} from '@material-ui/core';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  firstline:{
    textAlign:'center',
    fontSize:'200%',
    fontFamily:'serif',
    padding:theme.spacing(2),
    },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    textDecorationLine:'none'
  },
}));


const Dashboard = () => {
  let url='https://crm-easy.herokuapp.com'
  const SweetAlert =(status,data)=>{
    Swal.fire({
      icon: status,
      title: 'Alert',
      text: data,
  })
  }
    useEffect(()=>{
        fetch(`${url}/dashboard`, {
            method : "GET",
            headers : {
              "auth" : localStorage.getItem('token')
            }
        }).then(res => res.json()).then((data) =>{ 
            if(data.message === "session ended"){
              SweetAlert(data.icon,data.message)
            } else{
            console.log(data)
            setstate(data) 
          }
    })} , [] )

    const [state, setstate] = useState({service : "" , leads : "" , contacts : "" })
    

    const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={classes.firstline}>
          <h6>Hello {localStorage.getItem('userdata').name}, Here we are Happy to help with your buisness.</h6>
          </Paper>
        </Grid>
        </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} >
      <Link to='./ServiceRequest'>
          <Paper className={classes.paper}>
            <Typography>
            Service Request
            </Typography>
            <Typography>
            {state.service.length}
            </Typography>
          </Paper></Link>
        </Grid>
        <Grid item xs={12} sm={4} md={4} >
        <Link to='./Leads'>
          <Paper className={classes.paper}>
            <Typography>
            Leads
            </Typography>
            <Typography>
            {state.leads.length}
            </Typography>
          </Paper></Link>
          </Grid>
        <Grid item xs={12} sm={4} md={4} >
        <Link to='./Contacts'>
          <Paper className={classes.paper}>
            <Typography>
            Contacts
            </Typography>
            <Typography>
            {state.contacts.length}
            </Typography>
          </Paper></Link>
          </Grid>
      </Grid>
      {(localStorage.getItem('userdata').access!=="Employee")?
      <Grid container spacing={10}>
        <Grid item xs={4} sm={4}md={4}></Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Paper className={classes.paper}>
          <Link to='./AllowAccess'><Button>Allow Access</Button></Link>
          </Paper>
        </Grid>
        </Grid>:""}
    </div>
  )
    }



export default Dashboard;
