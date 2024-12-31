import React, { useEffect, useRef } from 'react';

const MapComponent = ({ latitude, longitude, setLatitude, setLongitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        draggable: true,
      });

      // Update coordinates on marker drag
      marker.addListener('dragend', (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setLatitude(newLat);
        setLongitude(newLng);
      });

      map.addListener('click', (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        marker.setPosition({ lat: newLat, lng: newLng });
        setLatitude(newLat);
        setLongitude(newLng);
      });
    }
  }, [latitude, longitude, setLatitude, setLongitude]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
