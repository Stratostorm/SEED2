import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const currencies = ["SGD", "USD", "CNY", "HKD"];

const projects = ["0001", "0002", "0003", "0004"];

const firstName = "John";

const lastName = "Doe";

export default function NewClaim() {
  const [isFollowUp, setIsFollowUp] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  }

  function handleFollowUp(e) {
    setIsFollowUp(e.target.checked);
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
        <Typography component="h1" variant="h5">
          Create New Claim
        </Typography>
        <Stack
          direction="column"
          spacing={1}
          container
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
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
              value = {firstName}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              disabled
              id="lastName"
              label="Last Name"
              name="lastName"
              value = {lastName}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <DatePicker
              id="date"
              label="Date *"
              name="date"
              format="DD/MM/YYYY"
              sx={{ width: 0.5 }}
            />
            <TextField
              required
              id="projectId"
              label="Project ID"
              name="projectId"
              helperText="Select relevant Project ID"
              select
              sx={{ width: 0.5 }}
            >
              {projects.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              required
              id="currency"
              label="Currency"
              name="currency"
              select
              sx={{ width: 0.3 }}
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
              sx={{ width: 0.7 }}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={handleFollowUp} />}
                label="Follow-up claim"
              />
            </FormGroup>
            {isFollowUp && (
              <TextField
                required
                id="prevClaimId"
                label="Previous Claim ID"
                name="prevClaimId"
                fullWidth
              />
            )}
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
