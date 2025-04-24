import './App.css';
import { useEffect,useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Planner from './pages/Planner';
import Layout from './components/Layout';
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(()=> {
    axios.get("http://localhost:5000/api/auth/check",{withCredentials: true })
    .then((res)=>{
      console.log("enter");
      setIsAuthenticated(true);
    })
    .catch((err)=>{
      setIsAuthenticated(false);
    })
  },[]);
  console.log(isAuthenticated);
  if(isAuthenticated=== null) return <p>Loading...</p>;
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes inside Layout */}
      <Route
        path="/"
        element={isAuthenticated ? <Layout /> : <Navigate to="/signin" />}
      >
        <Route index element={<Home />} /> {/* This makes "/" show Home */}
        <Route path="Home" element={<Home />} />
        <Route path="Home/Tasks" element={<Tasks />} />
        <Route path="Planner" element={<Planner/>} />
      </Route>

      {/* Catch unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
