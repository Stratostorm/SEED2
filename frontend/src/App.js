import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewClaim from "./components/NewClaim";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  const [token, setToken] = useState();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Dashboard/:eId"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/NewClaim"
            //element={token ? <NewClaim /> : <Navigate to="/" />}
            element={<NewClaim />}
          />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
