import React, { useEffect } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 9) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  return (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#0000006f",
      width: "100vw",
      height: "101vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999999
    }}
  >
    <CircularProgress style={{color: '#fff'}}/>
  </Box>
)
};
