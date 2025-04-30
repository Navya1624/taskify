import { useEffect ,useState} from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [userData,setUserData]=useState({name:'',email:''});
    const navigate=useNavigate();

    useEffect(()=>{
        fetchUserData();
    },[]);

    const fetchUserData=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
            if (response.data) {
                setUserData({ name: response.data.name, email: response.data.email });
              } else {
                // Handle cases where user data might not be available
                console.error("User data not found in response");
                navigate('/login');
              }
        }catch(error){
            console.error("Error fetching user data:", error);
            navigate('/login');
        }
    }
    const handleLogout=async()=>{
        try{
            await axios.post('localhost:5000/api/auth/logout', {}, { withCredentials: true });
        }catch(error){
            console.error("Error during logout:", error);
        }
    }
  return (
    <div>
       <h1>Dashboard</h1>
      
      <strong>Name:</strong> {userData.name}
    
    
      <strong>Email:</strong> {userData.email}
    
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;
