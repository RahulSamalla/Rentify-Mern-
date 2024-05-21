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
  const [submittedData, setSubmittedData] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for missing fields
    const missing = Object.keys(formData).filter(key => !formData[key]);
    setMissingFields(missing);

    if (missing.length === 0) {
      try {
        // Make API call with form data
        const response = await axios.post('http://localhost:5000/api/users/register', formData);
        
        // Check if response is successful
        if (response.status === 200) {
          console.log('Registration successful:', response.data);
          setIsRegistered(true);
          setSubmittedData(response.data);
          // Clear form data after successful registration
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            isSeller: false,
          });
        }
      } catch (error) {
        // Handle error
        console.error('Registration failed:', error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {isRegistered ? (
        <div>
          <h2>Registered Successfully!</h2>
          <h3>Submitted Data:</h3>
          <p>First Name: {submittedData.firstName}</p>
          <p>Last Name: {submittedData.lastName}</p>
          <p>Email: {submittedData.email}</p>
          <p>Phone Number: {submittedData.phoneNumber}</p>
          <p>Password: {submittedData.password}</p>
          <p>Registered as Seller: {submittedData.isSeller ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <label>
            <input type="checkbox" name="isSeller" checked={formData.isSeller} onChange={(e) => setFormData({ ...formData, isSeller: e.target.checked })} />
            Register as Seller
          </label>
          <button type="submit">Register</button>

          {/* Display missing fields */}
          {missingFields.length > 0 && (
            <p>Please fill in the following fields: {missingFields.join(', ')}</p>
          )}

          {/* Display error message */}
          {error && <p>Error: {error}</p>}
        </form>
      )}
    </div>
  );
};

export default Register;
