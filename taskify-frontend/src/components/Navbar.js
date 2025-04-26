import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      background: '#10374A', 
      padding: '1rem 2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      color: '#fff', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>Taskify</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/tasks" style={linkStyle}>Tasks</Link>
        <Link to="/planner" style={linkStyle}>Planner</Link>
        <Link to="/remainder" style={linkStyle}>Remainder</Link>
        <Link to="/others" style={linkStyle}>Others</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: '#fff', 
  textDecoration: 'none', 
  fontSize: '1rem', 
  fontWeight: '500', 
  transition: 'color 0.3s ease',
};

export default Navbar;
