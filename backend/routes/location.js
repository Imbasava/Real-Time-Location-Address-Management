const express = require('express');
const router = express.Router();
const pool = require('../db');

// Save location API
router.post('/save-location', async (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).send({ error: 'Latitude and Longitude are required.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO locations (latitude, longitude) VALUES (?, ?)',
      [latitude, longitude]
    );
    res.status(200).send({ message: 'Location saved successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).send({ error: 'Failed to save location.' });
  }
});

module.exports = router;
