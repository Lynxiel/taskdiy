import { Typography } from "@mui/material";
import React  from "react";
import { Link } from "react-router-dom";


function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Taskdiy
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

  export default function AppFooter(){
    return <Copyright sx={{ mt: 8, mb: 4 }} />
  }