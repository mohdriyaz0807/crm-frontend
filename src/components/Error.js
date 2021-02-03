import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
  }));


const Error = () => {
    const classes = useStyles();


  return (
      <div className={classes.root}>
    <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
      <Paper className={classes.paper}>
                <Typography gutterBottom variant="subtitle1">
                  Oops!
                </Typography>
                <Typography variant="body2" gutterBottom>
                You lost from our site,Please get back to us.
                </Typography>
      </Paper>
</Grid>
    </div>
    )
}

export default Error
