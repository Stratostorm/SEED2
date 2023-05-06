import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewClaim from "./components/Claims/NewClaim";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  const [token, setToken] = useState();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/Dashboard" /> : <Login setToken={setToken}/>} />
          <Route
            path="/Dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/NewClaim"
            //element={token ? <NewClaim token={token}/> : <Navigate to="/" />}
            element={<NewClaim token={token}/>}
          />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
