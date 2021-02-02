import React ,{useEffect, useState} from "react";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
import { setusertype } from "./components/Redux/User/user-actions";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Dashboard = ({ usertype ,setusertype }) => {
    let history = useHistory()

    useEffect(()=>{
        
        fetch("", {
            method : "GET",
            headers : {
              "auth" : localStorage.getItem('crmApplication')
            }
        }).then(res => res.json()).then((data) =>{ 
            if(data.message === "authorization failed"){
              setusertype(null);
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
          <Paper className={classes.paper}>
          
          </Paper>
        </Grid>
        </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} onClick={}>
          <Paper className={classes.paper}>
            <Typography>
            Service Request
            </Typography>
            <Typography>
            {state.service.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} onClick={}>
          <Paper className={classes.paper}>
            <Typography>
            Leads
            </Typography>
            <Typography>
            {state.leads.length}
            </Typography>
          </Paper>
          </Grid>
        <Grid item xs={12} sm={12} md={4} onClick={}>
          <Paper className={classes.paper}>
            <Typography>
            Contacts
            </Typography>
            <Typography>
            {state.contacts.length}
            </Typography>
          </Paper>
          </Grid>
      </Grid>
    </div>
  )
    }


const mapStateToProps = (state) => ({
  usertype : state.user.usertype
});

const mapDispatchToProps = (dispatch) => ({
  setusertype : (user) => dispatch(setusertype(user))
})

export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);
