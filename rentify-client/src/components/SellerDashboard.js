import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const SellerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sellerId:user._id,
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const sellerId=user._id;
        const response = await axios.get(`http://localhost:5000/api/properties/seller/${sellerId}`);
        setProperties(response.data.properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  const handleEditClick = (property) => {
    setEditProperty(property);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editProperty) {
      setEditProperty({ ...editProperty, [name]: value });
    } else {
      setNewProperty({ ...newProperty, [name]: value });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/properties/${editProperty._id}`, editProperty);
      setProperties(properties.map(prop => prop._id === editProperty._id ? editProperty : prop));
      setEditProperty(null); // Close the form after submitting
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://localhost:5000/api/properties', newProperty, config);
      setProperties([...properties, response.data.property]);
      setNewProperty({
        title: '',
        description: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        
      }); // Clear the form after submitting
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${propertyId}`);
      setProperties(properties.filter(prop => prop._id !== propertyId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {properties.map(property => (
        <div className="property" key={property._id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <button onClick={() => handleEditClick(property)}>Edit</button>
          <button onClick={() => handleDelete(property._id)}>Delete</button>
        </div>
      ))}
      {editProperty && (
        <div className="edit-form-container">
          <h2>Edit Property</h2>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="title"
              value={editProperty.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              value={editProperty.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              type="text"
              name="location"
              value={editProperty.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <input
              type="number"
              name="price"
              value={editProperty.price}
              onChange={handleChange}
              placeholder="Price"
            />
            <input
              type="number"
              name="bedrooms"
              value={editProperty.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
            />
            <input
              type="number"
              name="bathrooms"
              value={editProperty.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditProperty(null)}>Cancel</button>
          </form>
        </div>
      )}
      <div className="create-form-container">
        <h2>Create New Property</h2>
        <form onSubmit={handleCreateSubmit}>
          <input
            type="text"
            name="title"
            value={newProperty.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="description"
            value={newProperty.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="location"
            value={newProperty.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            type="number"
            name="price"
            value={newProperty.price}
            onChange={handleChange}
            placeholder="Price"
          />
          <input
            type="number"
            name="bedrooms"
            value={newProperty.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
          />
          <input
            type="number"
            name="bathrooms"
            value={newProperty.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboard;
