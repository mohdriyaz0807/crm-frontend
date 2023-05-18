import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  FormControl,
  Input,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { API_PATH } from "../../utils/api";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(4),
//     flexGrow: 1,
//   },
//   firstline: {
//     textAlign: "center",
//     fontSize: "150%",
//     fontFamily: "serif",
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     fontSize: "100%",
//     fontFamily: "serif",
//     fontStyle: "bold",
//     textAlign: "center",
//   },
//   note: {
//     textAlign: "center",
//     paddingBlock: "2%",
//     border: "4px solid white",
//     borderTopStyle: "curl",
//   },
// }));

const Login = () => {
  useEffect(() => {
    fetch(`${API_PATH}/login`, {
      method: "GET",
      headers: {
        auth: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === true) {
          window.location.href = "/Dashboard";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const SweetAlert = (status, data) => {
    Swal.fire({
      icon: status,
      title: "Alert",
      text: data,
    });
  };
  const submit = async () => {
    setLoading(true);
    try {
      var user = await fetch(`${API_PATH}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      console.log(user);
      if (user.icon === "success") {
        setLoading(false);
        localStorage.setItem("token", user.token);
        localStorage.setItem("userdata", JSON.stringify(user.result));
        window.location.href = "/Dashboard";
      } else {
        setLoading(false);
        SweetAlert(user.icon, user.message);
        console.log(user.message);
      }
    } catch (err) {
      SweetAlert("warning", err);
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <Grid container spacing={2} alignItems="center" justifyContent="center" padding="0 20px">
        <Grid item sm={12} xs={12} md={4} lg={4} >
          <div className="title">
          <h1>Easy CRM</h1>
          <label>Top choice for Customer Relationship Management</label>
          </div>
          <Paper sx={{borderRadius:0}} elevation={5} className="login-paper">
            <h2>Login</h2>
            <br />
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input
                type="email"
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <InputLabel htmlFor="my-input1">Password</InputLabel>
              <Input
                type="password"
                id="my-input1"
                aria-describedby="my-helper-text1"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              <Button
                variant="contained"
                color="secondary"
                disabled={loading}
                onClick={submit}
              >
                {loading ? "Logging in.." : "Login"}
              </Button>
              {/* </FormControl><br/><br/>
            <FormControl>
            <Link to='./Register'>New User?</Link>
            </FormControl><br/><br/>
            <FormControl>
            <Link to='./Forgot'>Forgot Password?</Link> */}
            </FormControl>
          </Paper>
          <div className="note">
            <h4>For Test Login, use the below credentials</h4>
            <p>Email : admin@crm.com</p>
            <p>Password : 123456</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const String = () => {
  const href = window.location.href.split("/");
  const requiredstring = href[href.length - 1];
  const SweetAlert = (status, data) => {
    Swal.fire({
      icon: status,
      title: "Alert",
      text: data,
    });
  };
  const show = async () => {
    const res = await axios.get(`${API_PATH}/confirm/${requiredstring}`);
    console.log(res.data);
    SweetAlert("success", res.message);
  };
  show();
};

export { Login, String };
