import React ,{useEffect, useState} from "react";
import {Paper,makeStyles,Grid,Typography,Button} from '@material-ui/core';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btn:{
    display: 'flex',
    justifyContent:'center',
    marginTop:'5%'
  },
  firstline:{
    padding:theme.spacing(2),
    backgroundImage: 'url(https://i.pinimg.com/originals/05/bb/0e/05bb0e21f08fe5753f8b88204f0a99db.jpg)',
    backgroundSize: 'cover',
    height:'40vh'
    },
  paper: {
    padding: theme.spacing(4),
    boxShadow:'3px 5px gray',
    backgroundColor:"lightslategray",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    textDecorationLine:'none',
    color:'white',
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
            if(data.icon == "warning"){
              SweetAlert(data.icon,data.message)
              window.location.href='/Login'
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
          <Paper className={classes.firstline} >
          </Paper>
        </Grid>
        </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} >
          <Paper className={classes.paper}>
            <Typography>
            Service Request - {state.service.length}
            </Typography>
      <Link to='./ServiceRequest' style={{textDecoration :'none'}}><Button variant='contained' color="secondary">
        View 
      </Button>
      </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4} >
          <Paper className={classes.paper}>
            <Typography>
            Leads - {state.leads.length}
            </Typography>
        <Link to='./Leads' style={{textDecoration :'none'}}><Button variant='contained' color="secondary">
          View  </Button>
        </Link>
          </Paper>
          </Grid>
        <Grid item xs={12} sm={4} md={4} >
          <Paper className={classes.paper}>
            <Typography>
            Contacts - {state.contacts.length}
            </Typography>
        <Link to='./Contacts' style={{textDecoration :'none'}}><Button variant='contained' color="secondary">
          View 
        </Button>
        </Link>
          </Paper>
          </Grid>
      </Grid>
      {(localStorage.getItem('userdata').access!=="Employee")?
          <div className={classes.btn}><Link to='./AllowAccess' style={{textDecoration :'none'}}><Button variant='contained' color="secondary">Allow Access</Button></Link></div>
          :""}
    </div>
  )
    }



export default Dashboard;
