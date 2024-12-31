/* import React, { useEffect, useRef } from 'react';

const MapComponent = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Selected Location',
      });
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
 */
import React, { useEffect, useState, useRef } from 'react';

const MapComponent = ({ latitude, longitude, onLocationChange }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Initialize map and marker
  useEffect(() => {
    if (window.google && mapRef.current) {
      const initialLatLng = { lat: latitude, lng: longitude };

      // Initialize map if not already initialized
      if (!map) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: initialLatLng,
          zoom: 14,
        });

        const markerInstance = new window.google.maps.Marker({
          position: initialLatLng,
          map: mapInstance,
          draggable: true, // Make marker draggable
          title: 'Selected Location',
        });

        // Listen for marker dragend event to update location
        markerInstance.addListener('dragend', (event) => {
          const newLat = event.latLng.lat();
          const newLng = event.latLng.lng();
          onLocationChange(newLat, newLng); // Update the coordinates in parent component
        });

        setMap(mapInstance);
        setMarker(markerInstance);
      } else {
        // Update the map center and marker position if map already exists
        map.panTo({ lat: latitude, lng: longitude });
        marker.setPosition({ lat: latitude, lng: longitude });
      }
    }
  }, [latitude, longitude, map, marker, onLocationChange]);

  // Handle "Locate Me" button click (using browser's geolocation)
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Located at:', latitude, longitude);

          // Update map center and marker position
          map.panTo({ lat: latitude, lng: longitude });
          marker.setPosition({ lat: latitude, lng: longitude });

          // Update parent component with the new coordinates
          onLocationChange(latitude, longitude);
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

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
      <button onClick={handleLocateMe} style={{ marginTop: '10px', padding: '10px', width: '100%' }}>
        Locate Me
      </button>
    </div>
  );
};

export default MapComponent;
