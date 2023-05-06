import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";

import { apiURL } from "../../Constants";

async function GetName(token, setFirstName, setLastName) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.get(apiURL + "/EmployeeDataName", config).then(
    (response) => {
      const data = response.data;
      setFirstName(data.FirstName);
      setLastName(data.LastName);
    },
    (error) => {
      setFirstName("John");
      setLastName("Doe");
    }
  );
}

async function GetCurrencies(token, setCurrencies) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.get(apiURL + "/CurrencyData", config).then(
    (response) => {
      const data = response.data;
      const currencies = data.map(x=>x.CurrencyID);
      setCurrencies(currencies);
    },
    (error) => {
      //setCurrencies(["SGD", "USD", "CNY", "HKD"]);
      console.log(error);
    }
  );
}

async function GetProjects(token, setProjects) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.get(apiURL + "/EmployeeProjectData", config).then(
    (response) => {
      const data = response.data;
      const projects = data.map(x=>x.ProjectID)
      setProjects(data.projects);
    },
    (error) => {
      //setProjects(["1", "2", "3", "4"]);
      console.log(error);
    }
  );
}

export default function NewClaim({ token }) {
  const navigate = useNavigate();

  const [isFollowUp, setIsFollowUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [projects, setProjects] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = {
      CurrencyID: data.get("currency"),
      ProjectID: data.get("projectId"),
      ExpenseDate: data.get("date"),
      Amount: data.get("amount"),
      Purpose: data.get("purpose"),
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiURL + "/ProjectExpenseClaimsData", form, config).then(
      (response) => navigate("/Dashboard"),
      (error) => console.log(error)
    );
  }

  function handleFollowUp(e) {
    setIsFollowUp(e.target.checked);
  }

  useEffect(() => {
    GetName(token, setFirstName, setLastName);
    GetCurrencies(token, setCurrencies);
    GetProjects(token, setProjects);
    return () => {};
  }, [token, GetName, setFirstName, setLastName, setCurrencies, setProjects]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "normal",
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          Create New Claim
        </Typography>
        <Stack
          direction="column"
          spacing={1}
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 2 }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="space-between"
          >
            <TextField
              disabled
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              disabled
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <DatePicker
              id="date"
              label="Date of Expense *"
              name="date"
              format="DD/MM/YYYY"
              sx={{ width: { xs: 1, sm: 0.5 } }}
            />
            <TextField
              required
              id="projectId"
              label="Project ID"
              name="projectId"
              helperText="Select relevant Project ID"
              select
              defaultValue=""
              sx={{ width: { xs: 1, sm: 0.5 } }}
            >
              {projects.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <TextField
            required
            id="purpose"
            label="Purpose"
            name="purpose"
            multiline
            fullWidth
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              required
              id="currency"
              label="Currency"
              name="currency"
              select
              defaultValue=""
              sx={{ width: { xs: 1, sm: 0.3 } }}
            >
              {currencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="amount"
              label="Amount"
              name="amount"
              sx={{ width: { xs: 1, sm: 0.7 } }}
            />
          </Stack>
          <FormGroup
            row
            sx={{
              height: { xs: 1, sm: "60px" },
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={<Switch onChange={handleFollowUp} />}
              label="Follow-up claim"
            />
            {isFollowUp && (
              <TextField
                id="prevClaimId"
                label="Previous Claim ID"
                name="prevClaimId"
                sx={{ width: { xs: 1, sm: 0.6 }, position: "right" }}
              />
            )}
          </FormGroup>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ mt: 3, mb: 2 }}
          >
            <Button
              component={Link}
              type="button"
              variant="contained"
              color="warning"
              sx={{ width: { xs: 1, sm: 0.5 } }}
              to="/Dashboard"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: { xs: 1, sm: 0.5 } }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
