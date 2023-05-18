import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { API_PATH } from "../utils/api";

const Dashboard = () => {
  const [state, setState] = useState({ service: [], leads: [], contacts: [] });

  useEffect(() => {
    const getData = async () => {
    await fetch(`${API_PATH}/dashboard`, {
      method: "GET",
      headers: {
        auth: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setState(data);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
    getData()
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <Paper sx={{borderRadius: '10px'}} className="nav-card service-request" elevation={9}>
            <Typography variant="h5" fontWeight="bold">Service Request</Typography>
            <Typography variant="h3">{state?.service?.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <Paper sx={{borderRadius: '10px'}} className="nav-card leads" elevation={9}>
            <Typography variant="h5" fontWeight="bold">Leads</Typography>
            <Typography variant="h3">{state?.leads?.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
        <Paper sx={{borderRadius: '10px'}} className="nav-card contacts" elevation={9}>
            <Typography variant="h5" fontWeight="bold">Contacts</Typography>
            <Typography variant="h3">{state?.contacts?.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
