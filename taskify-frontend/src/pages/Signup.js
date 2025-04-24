import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS

const Signup = () => {
  const [formData , setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.name,
        email: formData.email,
        password: formData.password
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
