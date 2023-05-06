import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Container } from "@mui/material";

export default function Dashboard() {
  const employeeFirstname = 'Tom';

  // call table from api
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/tabledata')
  //     .then(response => setRows(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  return(
    <>
    <h1>Welcome {employeeFirstname}</h1>
    <Container component="main" maxWidth="lg">
    <Table classname="claimsTable">
      <TableHead>
        <TableRow>
          <TableCell>Claim ID</TableCell>
          <TableCell>Project ID</TableCell>
          <TableCell>Currency</TableCell>
          <TableCell>Status</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(7)].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {[...Array(5)].map((_, colIndex) => (
              <TableCell key={colIndex}>{`Row ${rowIndex + 1}, Column ${colIndex + 1}`}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Button component={Link} to="/AddNewClaim" variant="contained" sx={{mt:2}}>
        Add new claim
    </Button>
    </Container>
    </>

  ) 
}