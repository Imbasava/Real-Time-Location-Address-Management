const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const locationRoutes = require('./routes/location');

const addressRoutes = require('./routes/addresses');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes



// Use the address routes
app.use('/api/addresses', addressRoutes);

// API Routes
app.use('/api/location', locationRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
