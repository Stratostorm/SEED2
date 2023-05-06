import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/Dashboard" /> : <Login setToken={setToken}/>} />
          <Route
            path="/Dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
