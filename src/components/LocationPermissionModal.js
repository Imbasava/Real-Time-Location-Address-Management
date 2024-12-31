import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const LocationPermissionModal = ({ onEnableLocation, onSearchManually }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onSearchManually}
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
      <h2>Location Permission Required</h2>
      <p>We need access to your location to proceed.</p>
      <button
        onClick={onEnableLocation}
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
        Enable Location
      </button>
      <button
        onClick={onSearchManually}
        style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#FFC107',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Search Manually
      </button>
    </Modal>
  );
};

export default LocationPermissionModal;
