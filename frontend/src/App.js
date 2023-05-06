import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<Login />} />
          <Route
          path="/Dashboard/:eId"
          element={isAuth ? <Dashboard /> : <Navigate to="/" />}
        />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
