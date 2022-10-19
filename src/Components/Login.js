import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./store/reducer/userSlice";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography, 
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const paperStyle = {
  padding: 40,
  height: "70vh",
  width: 350,
  margin: '50px auto'
};

const avatarStyle = {
  backgroundColor: "green",
};

const btnStyle = {
    margin: "8px 0"
}

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
        login({
          username: username,
          password: password,
          loggedIn: true
        })
      )
      document.cookie = `username=${username}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
      document.cookie = `password=${password}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
      document.cookie = `loggedIn=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
      navigate('/')
  }
 
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter Username"
            onChange={(e)=> setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            sx={{margin: "8px 0"}}
            label="Password"
            placeholder="Enter Password"
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            fullWidth
            required
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
            
          />
          <Button onClick={(e) => handleSubmit(e)} type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
            Sign In
          </Button>
        
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>Do you have an account ?
          <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
