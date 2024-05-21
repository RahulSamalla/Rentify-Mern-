import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import SellerDashboard from './components/SellerDashboard';
import PropertyList from './components/PropertyList';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/properties" element={<PropertyList />} />
      </Routes>
    </Router>
  );
};

export default App;
