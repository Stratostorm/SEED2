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
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { apiURL } from "../Constants";
import { useNavigate } from "react-router-dom";

export default function Dashboard({setToken}) {
  const [employeeName, setEmployeeName] = useState();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();


  const handleLogout = () => {
    axios.get(apiURL +`/Logout`);
    navigate('/');
    setToken(null);
  };

  function HandleEdit(row) {
    navigate('/EditClaim', { state: { row } });
  }
  

  const handleDelete = (claimID) => {
    axios.delete(apiURL +`/ProjectExpenseClaimsData`, claimID)
      .then((response) => {
        console.log(response);
        const updatedData = tableData.filter((row) => row.ClaimID !== claimID);
        setTableData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    axios
      .get(apiURL + "/EmployeeDataName")
      .then((response) => setEmployeeName(response.data.FirstName))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(apiURL + "/ProjectExpenseClaimsData")
      .then((response) => setTableData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container component="main" maxWidth="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
          <h1>Welcome {employeeName}!</h1>
          <Button 
          variant="contained" sx={{height:40}}
          color='warning'
          onClick={handleLogout} 
          >
            Logout
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
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
                  <TableCell>{row.ClaimID}</TableCell>
                  <TableCell>{row.ProjectID}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.CurrencyID}</TableCell>
                  <TableCell>{row.Status}</TableCell>
                  <TableCell>
                    {row.Status === "Pending" ? (
                      <Button
                        color="primary"
                        sx={{ ml: 2 }}
                        component={Link}
                        onClick={() => HandleEdit(row)}
                      >
                        Edit
                      </Button>
                    ) : null}
                    {row.Status === "Pending" ? (
                      <IconButton 
                      aria-label="delete" 
                      color="error"
                      onClick={() => handleDelete(row.ClaimID)}>
                        <Delete />
                      </IconButton>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          component={Link}
          to="/NewClaim"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add new claim
        </Button>
      </Container>
    </>
  );
}
