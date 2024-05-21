import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    isSeller: false,
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      
      if (response.status === 200) {
        setIsRegistered(true);
      }
      
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {isRegistered ? (
        <div>
          <h2>Registered Successfully!</h2>
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <p>Password: {formData.password}</p>
          <p>Registered as Seller: {formData.isSeller ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <label>
            <input type="checkbox" name="isSeller" checked={formData.isSeller} onChange={handleChange} />
            Register as Seller
          </label>
          <button type="submit">Register</button>
          
        </form>
      )}
      
    </div>
  );
};

export default Register;
