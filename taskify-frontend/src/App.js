import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';
import Planner from './pages/Planner';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes inside layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
         <Route index element={<Tasks />} /> {/* Default "/" shows Tasks */}
          <Route path="Tasks" element={<Tasks />} />
          <Route path="Planner" element={<Planner />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
