import React, { useState } from 'react'

const Signup = () => {
    const [formData , setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData.name=value;
    }
    const handleSubmit=(e)=> {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }
        //storing in database
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
