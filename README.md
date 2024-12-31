Location Address Flow

A web application for managing user locations and addresses built with React, Node.js, Express, and MySQL. The app allows users to detect their location automatically or manually search for an address, save it under different categories (Home, Office, Friends & Family), and manage saved addresses in a MySQL database.
Features

    Location Detection: Automatically fetch the user's current location or allow manual address search.
    Address Form: Users can input details like House No., Area, and Category (Home, Office, Friends & Family).
    Address Management: Users can view, edit, and delete saved addresses.
    Responsive: Optimized for desktop and mobile devices.

Technologies Used

    Frontend: React.js, Google Maps API
    Backend: Node.js, Express.js
    Database: MySQL
    Others: Axios (for HTTP requests)

Installation
1. Clone the repository

git clone https://github.com/Imbasava/Location-Address-Flow.git
cd Location-Address-Flow

2. Install dependencies
Backend

Navigate to the backend directory and install the dependencies:

cd backend
npm install

Frontend

Navigate to the frontend directory and install the dependencies:

cd frontend
npm install

3. Setup MySQL database

Create the location_address_flow database and run the following query to create the addresses table:

CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    houseNo VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

4. Configure MySQL in backend

In the backend folder, configure your MySQL database credentials in db.js:

// backend/db.js
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'location_address_flow',
});

Usage
1. Start the backend server

cd backend
npm start

This will run the server on http://localhost:5000.
2. Start the frontend application

cd frontend
npm start

The app will be available on http://localhost:3000.
API Endpoints
GET /api/addresses

Fetch all saved addresses.

Response:

{
  "addresses": [
    {
      "id": 1,
      "houseNo": "123",
      "area": "Main Street",
      "category": "home",
      "latitude": 12.345678,
      "longitude": 76.543210
    }
  ]
}

POST /api/addresses/save

Save a new address. Request body:

{
  "houseNo": "123",
  "area": "Main Street",
  "category": "home",
  "latitude": 12.345678,
  "longitude": 76.543210
}

Response:

{
  "id": 1
}

PUT /api/addresses/update/:id

Update an existing address by ID.

Response:

{
  "message": "Address updated successfully."
}

DELETE /api/addresses/delete/:id

Delete an address by ID.

Response:

{
  "message": "Address deleted successfully."
}

Contributing

Feel free to fork the repository and submit pull requests. Follow the GitHub flow for contributions.
License

This project is licensed under the MIT License.
