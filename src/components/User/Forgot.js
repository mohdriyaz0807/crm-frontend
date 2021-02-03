import React from 'react'
import {makeStyles} from '@material-ui/core';

const useStyle = makeStyles((theme)=>({
root:{
    padding: theme.spacing(4),
    flexGrow: 1,
    textAlign:'center'
}
}))
const Forgot = () => {
    const classes=useStyle()
    return (
        <div className={classes.root}>
            <p>This feature is under development,Come back Later.</p>
        </div>
    )
}

export default Forgot
