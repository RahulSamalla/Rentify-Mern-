import React, { useState } from 'react';
import axios from 'axios';
import PropertyList from './PropertyList';
import SellerDashboard from './SellerDashboard';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [loading, setLoading] = useState(false); // State to track loading state
  const [isSeller, setIsSeller] = useState(false); // State to track user role

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.post('https://rentify-api-gules.vercel.app/api/users/login', formData);
      console.log(response.data);
      // Clear form data after successful login
      setFormData({ email: '', password: '' });
      // Update login status
      setLoggedIn(true);
      // Check if the user is a seller
      setIsSeller(response.data.user.isSeller);
      // Save user info and token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      setLoading(false); // Set loading state to false after successful login
      if(loggedIn && isSeller){
        // <Link to="/properties" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Properties</Link>
        // <PropertyList/>
        // router.push()
        navigate('/seller-dashboard');
        
      }
      else if(loggedIn && !isSeller){
        // <Link to="/seller-dashboard" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Properties</Link>
        // <SellerDashboard/>
        navigate('/properties');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
      setLoading(false); // Set loading state to false if there's an error
    }
  };

  return (
    <div className="container">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br/>
        <button type="submit" disabled={loading}>Login</button>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
      {/* Render PropertyListPage component only if loggedIn is true and the user is not a seller */}
      {/* {loggedIn && !isSeller && <PropertyListPage />}
      {loggedIn && isSeller && <SellerDashboard />} */}
    </div>
  );
};

// Separate PropertyListPage component rendering on a new page
const PropertyListPage = () => {
  return (
    <div>
      <h1>Property List</h1>
      <PropertyList />
    </div>
  );
};

export default Login;
