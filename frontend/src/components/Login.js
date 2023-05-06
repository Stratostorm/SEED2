import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const apiURL = "http://localhost:5000";

async function loginUser(credentials, setIsError) {
  return axios
    .post(apiURL + "/login", credentials).catch(function (error) {
      setIsError(true);
    })
    .then((response) => response.data);
}

export default function Login({ setToken }) {
  const [isError, setIsError] = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const credentials = {
      employeeId: data.get("employeeId"),
      password: data.get("password"),
    };
    const token = await loginUser(credentials, setIsError);
    setToken(token);
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Best Consultancy Employee Claims
        </Typography>
        {isError && <Alert severity="error" sx={{mt: 1}}>
            <AlertTitle>Error</AlertTitle>
          Incorrect Employee ID or password. Please check and try again.
          </Alert>
        }
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="employeeId"
            label="Employee ID"
            name="employeeId"
            autoComplete="employeeId"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
