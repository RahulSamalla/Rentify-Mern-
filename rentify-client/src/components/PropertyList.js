import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 0,
    bathrooms: 0
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data.properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter(property =>
    property.location.includes(filters.location) &&
    property.price >= filters.minPrice &&
    property.price <= filters.maxPrice &&
    property.bedrooms >= filters.bedrooms &&
    property.bathrooms >= filters.bathrooms
  );

  return (
    <div className="container">
      <h1>Available Properties</h1>
      <div className="filters">
        <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
        <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} />
        <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleFilterChange} />
        <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleFilterChange} />
      </div>
      <table className="property-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Seller Name</th>
            <th>Seller Email</th>
            <th>Seller Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map(property => (
            <tr key={property._id}>
              <td>{property.title}</td>
              <td>{property.description}</td>
              <td>{property.location}</td>
              <td>${property.price}</td>
              <td>{property.bedrooms}</td>
              <td>{property.bathrooms}</td>
              <td>{property.seller.firstName} {property.seller.lastName}</td>
              <td>{property.seller.email}</td>
              <td>{property.seller.phoneNumber}</td>
              <td><button>I'm Interested</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;
