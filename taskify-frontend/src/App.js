import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

const App=() =>{
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Home/Tasks" element={<Tasks/>}/>
      
    </Routes>
    //<Home/>
  );
}

export default App;
