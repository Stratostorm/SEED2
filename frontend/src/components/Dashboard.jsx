import React from "react";
import { useState } from "react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Button
} from '@material-ui/core';
import axios from "axios";


export default function Dashboard() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/claimdata')
        .then(response => setRows(response.data))
        .catch(error => console.log(error));
    })
    
    return(
        <Button action=>
            Add new claim
        </Button>
    )
}
