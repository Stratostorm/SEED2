import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ClaimForm({}) {
  return;
  <div>
    <Stack
      direction="column"
      spacing={1}
      container
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
          label="Date *"
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
          sx={{ width: { xs: 1, sm: 0.5 } }}
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
        sx={{ height: { xs: 1, sm: "60px" }, justifyContent: "space-between" }}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Stack>
  </div>;
}
