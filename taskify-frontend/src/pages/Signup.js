import React, { useState } from 'react'
import axios from 'axios';

const Signup = () => {
    const [formData , setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    // console.log(formData);
    // console.log(setFormData);
    const handleChange = (e) => {
      const { name, value } = e.target;
      //console.log(e.target);
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const handleSubmit=async (e)=> {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', {
            username: formData.name, // backend expects `username`
            email: formData.email,
            password: formData.password
          });
    
          console.log("Signup successful:", response.data);
          alert("Signup successful!");
        } catch (error) {
          console.error("Error signing up:", error.response?.data || error.message);
          alert("Signup failed!");
        }
        //already have account logic
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            /><br /><br />

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

            <button type="submit">Sign Up</button>
            
      </form>
         
    </div>
  );
}

export default Signup;
