const express = require('express');
const Property = require('../models/Property');
const User = require('../models/User');
const router = express.Router();

// Create Property
router.post('/', async (req, res) => {
  try {
    const { title, description, location, price, bedrooms, bathrooms, sellerId } = req.body;
    const seller = await User.findById(sellerId);
    
    const property = await Property.create({ title, description, location, price, bedrooms, bathrooms, seller: sellerId });
    res.status(201).json({ property });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('seller', 'firstName lastName email phoneNumber');
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Properties by Seller
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const properties = await Property.find({ seller: req.params.sellerId });
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Property
router.delete('/:propertyId', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Property
router.put('/:propertyId', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.propertyId, req.body, { new: true });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ property });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
