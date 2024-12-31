// server.js or routes/addresses.js

const express = require('express');

const mysql = require('mysql2/promise'); // Use promise-based MySQL client
const router = express.Router();
const db = require('../db');





// Save Address
router.post('/save', (req, res) => {
  const { houseNo, area, latitude, longitude, category } = req.body;

  const query = 'INSERT INTO addresses (houseNo, area, latitude, longitude, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [houseNo, area, latitude, longitude, category], (err, result) => {
    if (err) {
      console.error('Error saving address:', err);
      return res.status(500).json({ message: 'Error saving address' });
    }
    res.status(200).json({ message: 'Address saved successfully' });
  });
});

// Get All Addresses
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM addresses';

  try {
    // Use the promise-based query method
    const [result] = await db.query(query);
    console.log('Saved addresses:', result);
    res.status(200).json({ addresses: result });
  } catch (err) {
    console.error('Error retrieving addresses:', err);
    res.status(500).json({ message: 'Error retrieving addresses' });
  }
});


// Update Address
router.put('/update/:id', (req, res) => {
  const addressId = req.params.id;
  const { houseNo, area, latitude, longitude, category } = req.body;

  const query = 'UPDATE addresses SET houseNo = ?, area = ?, latitude = ?, longitude = ?, category = ? WHERE id = ?';
  db.query(query, [houseNo, area, latitude, longitude, category, addressId], (err, result) => {
    if (err) {
      console.error('Error updating address:', err);
      return res.status(500).json({ message: 'Error updating address' });
    }
    res.status(200).json({ message: 'Address updated successfully' });
  });
});

// Delete Address
router.delete('/delete/:id', (req, res) => {
  const addressId = req.params.id;

  const query = 'DELETE FROM addresses WHERE id = ?';
  db.query(query, [addressId], (err, result) => {
    if (err) {
      console.error('Error deleting address:', err);
      return res.status(500).json({ message: 'Error deleting address' });
    }
    res.status(200).json({ message: 'Address deleted successfully' });
  });
});

module.exports = router;
