

/* 
import React, { useState, useEffect, useRef } from 'react';
import MapComponent from './MapComponent';

const LocationSelector = () => {
  const [latitude, setLatitude] = useState(12.9716); // Default to Bangalore
  const [longitude, setLongitude] = useState(77.5946);
  const [address, setAddress] = useState('');
  const inputRef = useRef(null);

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
          setLatitude(lat);
          setLongitude(lng);
          setAddress(place.formatted_address);
        } else {
          alert('Please select a valid address from the suggestions.');
        }
      });
    }
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Update state with accurate coordinates
          setLatitude(latitude);
          setLongitude(longitude);
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          //console.log('Address:', address);

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
    </div>
  );
};

export default LocationSelector;
 */