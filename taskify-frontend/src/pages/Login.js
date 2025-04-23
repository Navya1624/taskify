import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange=async(e)=> {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit= async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email: formData.email,
        password: formData.password
      },
      {
        withCredentials: true, // <- This is key!
      });

      console.log("Signin successful:", response.data);
      alert("Signin successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      alert(error.response?.data|| "Signin failed!");
      //if there is no account user will redirects to sign up
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            /><br /><br />

        <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          /><br /><br />

            <button type="submit">Sign In</button>
            
      </form>
    </div>
  )
}

export default Login
