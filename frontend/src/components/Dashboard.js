import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Paper,
  TableContainer,
} from "@mui/material";

export default function Dashboard() {
  const employeeFirstname = "Tom";
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/my-table-data")
      .then((response) => setTableData(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (tableData.length === 0) {
    setTableData([
      {
        claimID: "CLM123",
        projectID: "PRJ456",
        Amount: 1000,
        CurrencyID: "USD",
        Status: "Pending",
      },
      {
        claimID: "CLM789",
        projectID: "PRJ012",
        Amount: 2000,
        CurrencyID: "EUR",
        Status: "Approved",
      },
      {
        claimID: "CLM345",
        projectID: "PRJ678",
        Amount: 1500,
        CurrencyID: "GBP",
        Status: "Rejected",
      },
      {
        claimID: "CLM901",
        projectID: "PRJ234",
        Amount: 3000,
        CurrencyID: "CAD",
        Status: "Pending",
      },
      {
        claimID: "CLM567",
        projectID: "PRJ890",
        Amount: 2500,
        CurrencyID: "AUD",
        Status: "Approved",
      },
    ]);
  }

  return (
    <>
      <Container component="main" maxWidth="lg">
        <h1>Welcome {employeeFirstname}</h1>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="50">Claim No.</TableCell>
                <TableCell>Claim ID</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.claimID}</TableCell>
                  <TableCell>{row.projectID}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.CurrencyID}</TableCell>
                  <TableCell>{row.Status}</TableCell>
                  <TableCell>
                    {row.Status === "Pending" ? (
                      <Button color="primary" sx={{ ml: 2 }}>
                        Edit
                      </Button>
                    ) : null}
                    {row.Status === "Pending" ? (
                      <Button color="secondary">
                        Delete
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          component={Link}
          to="/AddNewClaim"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add new claim
        </Button>
      </Container>
    </>
  );
}
