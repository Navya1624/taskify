import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // <- Create a CSS file or use Tailwind for styling

const Login = () => {
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData, {
        withCredentials: true,
      });

      console.log("Signin successful:", response.data);
      alert("Signin successful!");
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      alert(error.response?.data || "Signin failed!");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input-field"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="input-field"
        />

        <button type="submit" className="login-button">Sign In</button>

        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Login;

