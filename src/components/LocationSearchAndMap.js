

/* 
import React, { useState, useEffect, useRef } from 'react';
import MapComponent from './MapComponent';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Required for accessibility

const LocationSearchAndMap = () => {
  const [latitude, setLatitude] = useState(12.9716); // Default to Bangalore
  const [longitude, setLongitude] = useState(77.5946);
  const [address, setAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  // Update address and coordinates when location changes
  const onLocationChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);

    // Reverse Geocode to Get Address
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
        setIsModalOpen(true); // Open the modal with the address
      } else {
        console.error('Geocoder failed due to:', status);
        alert('Unable to fetch accurate address.');
      }
    });
  };

  // Handle "Locate Me" button click (using browser's geolocation)
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Located at:', latitude, longitude);

          // Update map center and mDeliveryAddressFormarker position
          onLocationChange(latitude, longitude); // Update the location and show popup
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Unable to fetch your location. Please enable location services.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ['formatted_address', 'geometry'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          onLocationChange(lat, lng); // Update location on address select
          setAddress(place.formatted_address);
        } else {
          alert('Please select a valid address from the list.');
        }
      });
    }
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a location"
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
        />
      </div>

      
      <button onClick={handleLocateMe} style={{ marginTop: '10px', padding: '10px', width: '100%' }}>
        Locate Me
      </button>

      <MapComponent
        latitude={latitude}
        longitude={longitude}
        onLocationChange={onLocationChange}
      />

    
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            padding: '20px',
            borderRadius: '10px',
          },
        }}
      >
        <h2>Your Selected Location</h2>
        <p>{address}</p>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            margin: '10px',
            padding: '10px 20px',
            backgroundColor: '#28A745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </Modal>

     
      <div style={{ marginTop: '10px' }}>
        <strong>Coordinates:</strong> {latitude}, {longitude}
      </div>
    </div>
  );
};

export default LocationSearchAndMap;
 */


import React, { useState, useEffect, useRef } from 'react';
import MapComponent from './MapComponent';
import AddressForm from './AddressForm';

const LocationSearchAndMap = () => {
  const [latitude, setLatitude] = useState(12.9716); // Default to Bangalore
  const [longitude, setLongitude] = useState(77.5946);
  const [address, setAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]); // To store saved addresses
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const inputRef = useRef(null);

  // Set up the map and marker
  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ['formatted_address', 'geometry'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setLatitude(place.geometry.location.lat());
          setLongitude(place.geometry.location.lng());
          setAddress(place.formatted_address);
        } else {
          alert('Please select a valid address from the list.');
        }
      });
    }
  }, []);

  // Handle map creation, marker creation, and drag event
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude, 'Longitude:', longitude);

          // Update state with accurate coordinates
          setLatitude(latitude);
          setLongitude(longitude);

          // Reverse Geocode to Get Address
          const geocoder = new window.google.maps.Geocoder();
          const latLng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const formattedAddress = results[0].formatted_address;
              setAddress(formattedAddress);
              console.log('Accurate Address:', formattedAddress);
            } else {
              console.error('Geocoder failed due to:', status);
              alert('Unable to fetch accurate address.');
            }
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Permission denied. Please enable location services.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('Position unavailable. Please check your device settings.');
              break;
            case error.TIMEOUT:
              alert('Request timed out. Please try again.');
              break;
            default:
              alert('An unknown error occurred.');
              break;
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const saveAddress = (addressData) => {
    setSavedAddresses([...savedAddresses, addressData]);
    console.log('Saved Addresses:', savedAddresses);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a location"
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
        />
        <button onClick={handleLocateMe} style={{ marginTop: '10px', padding: '10px', width: '100%' }}>
          Locate Me
        </button>
      </div>
      <MapComponent
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <div style={{ marginTop: '10px' }}>
        <strong>Selected Address:</strong> {address || 'No address selected'}
        <br />
        <strong>Coordinates:</strong> {latitude}, {longitude}
      </div>

      <AddressForm
        latitude={latitude}
        longitude={longitude}
        saveAddress={saveAddress}
      />
    </div>
  );
};

export default LocationSearchAndMap;
