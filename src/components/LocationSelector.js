import React, { useState } from 'react';
import LocationPermissionModal from './LocationPermissionModal';
import LocationSearchAndMap from './LocationSearchAndMap';

const LocationSelector = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleEnableLocation = () => {
    setIsLocationEnabled(true);
    setIsModalOpen(false);
  };

  const handleSearchManually = () => {
    setIsLocationEnabled(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onSearchManually={handleSearchManually}
        />
      )}

      {isLocationEnabled ? (
        <LocationSearchAndMap />
      ) : (
        <LocationSearchAndMap />
      )}
    </div>
  );
};

export default LocationSelector;
