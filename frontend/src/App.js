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
<<<<<<< Updated upstream
          <Route path="/" element={<Login />} />
          <Route
            path="/Dashboard/:eId"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />
=======
          <Route path= "/" element={<Login />} />

>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
