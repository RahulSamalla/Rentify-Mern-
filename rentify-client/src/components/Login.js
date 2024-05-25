import React, { useState } from 'react';
import axios from 'axios';
import PropertyList from './PropertyList';
import SellerDashboard from './SellerDashboard';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading state
  const [isSeller, setIsSeller] = useState(false); // State to track user role

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.post(
        'https://rentify-api-gules.vercel.app/api/users/login', 
        formData, 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(response.data);
      // Clear form data after successful login
      setFormData({ email: '', password: '' });
      // Check if the user is a seller
      setIsSeller(response.data.user.isSeller);
      // Save user info and token in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      setLoading(false); // Set loading state to false after successful login
      
      if (response.data.user.isSeller) {
        navigate('/seller-dashboard');
      } else {
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
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required
        /><br/>
        <button type="submit" disabled={loading}>Login</button>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
