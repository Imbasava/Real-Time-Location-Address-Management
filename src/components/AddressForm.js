/* import React, { useState } from 'react';

// Icons for categories
const categoryIcons = {
  home: '🏠',
  office: '🏢',
  friendsFamily: '👨‍👩‍👧‍👦',
};

const AddressForm = ({ latitude, longitude, address, saveAddress }) => {
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('home'); // Default category: home

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = {
      houseNo,
      area,
      address,
      latitude,
      longitude,
      category,
    };

    saveAddress(fullAddress); // Call the parent function to save the address
    alert('Address Saved!');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Enter Address Details</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="House/Flat/Block No."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Apartment/Road/Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Select Category: </label>
          <div>
            <button
              type="button"
              onClick={() => setCategory('home')}
              style={{
                padding: '10px',
                margin: '5px',
                backgroundColor: category === 'home' ? '#4CAF50' : '#ddd',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              {categoryIcons.home} Home
            </button>
            <button
              type="button"
              onClick={() => setCategory('office')}
              style={{
                padding: '10px',
                margin: '5px',
                backgroundColor: category === 'office' ? '#4CAF50' : '#ddd',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              {categoryIcons.office} Office
            </button>
            <button
              type="button"
              onClick={() => setCategory('friendsFamily')}
              style={{
                padding: '10px',
                margin: '5px',
                backgroundColor: category === 'friendsFamily' ? '#4CAF50' : '#ddd',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              {categoryIcons.friendsFamily} Friends & Family
            </button>
          </div>
        </div>
        <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
 */
/* 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Icons for categories
const categoryIcons = {
  home: '🏠',
  office: '🏢',
  friendsFamily: '👨‍👩‍👧‍👦',
};

const AddressForm = () => {
  const [savedAddresses, setSavedAddresses] = useState([]); // Manage saved addresses
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('home'); // Default category
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');

  // Fetch saved addresses on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/addresses/')
      .then((response) => {
        setSavedAddresses(response.data.addresses);
      })
      .catch((err) => {
        console.error('Error fetching saved addresses:', err);
      });
  }, []);

  // Handle form submission to save address
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    const fullAddress = {
      houseNo,
      area,
      address,
      latitude,
      longitude,
      category,
    };

    // Save address to backend
    axios.post('http://localhost:5000/api/addresses/save', fullAddress)
      .then((response) => {
        setSavedAddresses([...savedAddresses, { ...fullAddress, id: response.data.id }]);
        alert('Address Saved!');
        resetForm(); // Clear form after saving
      })
      .catch((err) => {
        console.error('Error saving address:', err);
      });
  };

  // Reset form fields after submission
  const resetForm = () => {
    setHouseNo('');
    setArea('');
    setCategory('home');
    setLatitude(null);
    setLongitude(null);
    setAddress('');
  };

  // Delete an address
  const handleDeleteAddress = (id) => {
    axios.delete(`http://localhost:5000/api/addresses/delete/${id}`)
      .then(() => {
        setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
        alert('Address Deleted!');
      })
      .catch((err) => {
        console.error('Error deleting address:', err);
      });
  };

  return (
    <div>
      <h3>Enter Address Details</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="House/Flat/Block No."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Apartment/Road/Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Select Category: </label>
          <div>
            {Object.keys(categoryIcons).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '10px',
                  margin: '5px',
                  backgroundColor: category === cat ? '#4CAF50' : '#ddd',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px',
            width: '100%',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Save Address
        </button>
      </form>

      <h3>Saved Addresses</h3>
      {savedAddresses.length > 0 ? (
        <ul>
          {savedAddresses.map((addr) => (
            <li key={addr.id}>
              <p>
                <strong>{addr.category}:</strong> {addr.houseNo}, {addr.area}
              </p>
              <button onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved addresses.</p>
      )}
    </div>
  );
};

export default AddressForm;
 */
/* 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Icons for categories
const categoryIcons = {
  home: '🏠',
  office: '🏢',
  friendsFamily: '👨‍👩‍👧‍👦',
};

const AddressForm = () => {
  const [savedAddresses, setSavedAddresses] = useState([]); // Manage saved addresses
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('home'); // Default category
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');

  // Fetch saved addresses on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/addresses/')
      .then((response) => {
        setSavedAddresses(response.data.addresses);
      })
      .catch((err) => {
        console.error('Error fetching saved addresses:', err);
      });
  }, []);

  // Handle form submission to save address
  const handleSubmit = (e) => {
    e.preventDefault();

    const fullAddress = {
      houseNo,
      area,
      address,
      latitude,
      longitude,
      category,
    };

    // Save address to backend
    axios.post('http://localhost:5000/api/addresses/save', fullAddress)
      .then((response) => {
        setSavedAddresses([...savedAddresses, { ...fullAddress, id: response.data.id }]);
        alert('Address Saved!');
        resetForm(); // Clear form after saving
      })
      .catch((err) => {
        console.error('Error saving address:', err);
      });
  };

  // Reset form fields after submission
  const resetForm = () => {
    setHouseNo('');
    setArea('');
    setCategory('home');
    setLatitude(null);
    setLongitude(null);
    setAddress('');
  };

  // Delete an address
  const handleDeleteAddress = (id) => {
    axios.delete(`http://localhost:5000/api/addresses/delete/${id}`)
      .then(() => {
        setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
        alert('Address Deleted!');
      })
      .catch((err) => {
        console.error('Error deleting address:', err);
      });
  };

  return (
    <div>
      <h3>Enter Address Details</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="House/Flat/Block No."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Apartment/Road/Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Select Category: </label>
          <div>
            {Object.keys(categoryIcons).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '10px',
                  margin: '5px',
                  backgroundColor: category === cat ? '#4CAF50' : '#ddd',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px',
            width: '100%',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Save Address
        </button>
      </form>

      <h3>Saved Addresses</h3>
      {savedAddresses.length > 0 ? (
        <ul>
          {savedAddresses.map((addr) => (
            <li key={addr.id}>
              <p>
                <strong>{addr.category}:</strong> {addr.houseNo}, {addr.area}
              </p>
              <button onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved addresses.</p>
      )}
    </div>
  );
};

export default AddressForm;
 */



import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Icons for categories
const categoryIcons = {
  home: '🏠',
  office: '🏢',
  friendsFamily: '👨‍👩‍👧‍👦',
};

const AddressForm = ({ latitude, longitude, saveAddress }) => {
  const [savedAddresses, setSavedAddresses] = useState([]); // Manage saved addresses
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('home'); // Default category
  const [address, setAddress] = useState('');

  // Fetch saved addresses on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/addresses')
  .then((response) => {
    console.log('Saved addresses:', response.data); // Check the structure of response
    setSavedAddresses(response.data.addresses); // Store addresses in state
  })
  .catch((err) => {
    console.error('Error fetching saved addresses:', err);
    console.log('Error details:', err.response); // Log the full error response
  });
  }, []);

  


  // Handle form submission to save address
  const handleSubmit = (e) => {
    e.preventDefault();

    const fullAddress = {
      houseNo,
      area,
      latitude,  // Using passed latitude value
      longitude, // Using passed longitude value
      category,
    };

    // Save address to backend
    axios.post('http://localhost:5000/api/addresses/save', fullAddress)
      .then((response) => {
        setSavedAddresses([...savedAddresses, { ...fullAddress, id: response.data.id }]);
        alert('Address Saved!');
        resetForm(); // Clear form after saving
      })
      .catch((err) => {
        console.error('Error saving address:', err);
      });
  };

  // Reset form fields after submission
  const resetForm = () => {
    setHouseNo('');
    setArea('');
    setCategory('home');
    setAddress('');
  };

  // Delete an address
  const handleDeleteAddress = (id) => {
    axios.delete(`http://localhost:5000/api/addresses/delete/${id}`)
      .then(() => {
        setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
        alert('Address Deleted!');
      })
      .catch((err) => {
        console.error('Error deleting address:', err);
      });
  };

  return (
    <div>
      <h3>Enter Address Details</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="House/Flat/Block No."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Apartment/Road/Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Select Category: </label>
          <div>
            {Object.keys(categoryIcons).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '10px',
                  margin: '5px',
                  backgroundColor: category === cat ? '#4CAF50' : '#ddd',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px',
            width: '100%',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Save Address
        </button>
      </form>

      <h3>Saved Addresses</h3>
      {savedAddresses.length > 0 ? (
        <ul>
          {savedAddresses.map((addr) => (
            <li key={addr.id}>
              <p>
                <strong>{addr.category}:</strong> {addr.houseNo}, {addr.area}
              </p>
              <button onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved addresses.</p>
      )}
    </div>
  );
};

export default AddressForm;
