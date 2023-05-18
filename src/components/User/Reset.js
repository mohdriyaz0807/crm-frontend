import React, {useState} from 'react';
import { Paper , Grid ,FormControl,Input,InputLabel,Button,makeStyles,FormHelperText } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { API_PATH } from '../../utils/api';


const useStyle = makeStyles((theme)=>({
root:{
    padding: theme.spacing(4),
    flexGrow: 1,
    textAlign:'center',
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
},
note:{
    textAlign:'center',
    backgroundColor:'lightblue',
    paddingBlock:'2%',
    border:'4px solid white',
    borderTopStyle:'curl'
  }
}))


const Forgot = () => {
          const [data,setData]=useState({password:"",repassword:"",randomstring:""})
          const [loading , setLoading ] = useState(false)
          const SweetAlert =(status,data)=>{
              Swal.fire({
                icon: status,
                title: 'Alert',
                text: data,
            })
            }
          const submit = async ()=>{
              let href = window.location.href.split('/')
              setData({...data,randomstring : href[href.length-1]})
              if(data.password===data.repassword){
              setLoading(true)
              try {
              var user = await fetch(`${API_PATH}/reset`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
              }).then((res) => res.json())
              console.log(user)
              if(user.icon === "success"){
              setLoading(false)
              SweetAlert(user.icon,user.message)
              window.location.href='/Login'
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
        }else{
                SweetAlert('warning','Password Mismatch')
            }
          }
          const classes = useStyle()
    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems='center'>
            <Grid item sm={4} xs={12} md={7} className={classes.title}>
            <h1>Easy CRM</h1><h2><i>Business Made Easy</i></h2>
            <p>India's Best Customer Relationship Management Application</p>
            </Grid>
            <Grid item sm={8} xs={12} md={5}>
            <Paper className={classes.paper}>
            <h1 className={classes.firstline}>Login</h1>
            <FormControl>
            <InputLabel htmlFor="my-input1">Enter Password</InputLabel>
            <Input type='password' id="my-input1" aria-describedby="my-helper-text1" onChange={e=>setData({...data,password:e.target.value})} value={data.password}/>
            </FormControl><br/>
            <FormControl>
            <InputLabel htmlFor="my-input1">Confirm Password</InputLabel>
            <Input type='text' id="my-input1" aria-describedby="my-helper-text1" onChange={e=>setData({...data,repassword:e.target.value})} value={data.repassword}/>
            <FormHelperText id="my-helper-text1">Re enter the above Password</FormHelperText>
            </FormControl><br/><br/>
            <FormControl>
            <Button variant="contained" color="secondary" disabled={loading} onClick={submit}>
            {loading ? "Please wait.." : "Submit" }
            </Button>
            </FormControl><br/><br/>
            <FormControl>
            <Link to='./Login'>Back</Link>
            </FormControl>
            </Paper>
            </Grid>
            </Grid>
        </div>
    )
}

export default Forgot
