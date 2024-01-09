// Modal component

import React from 'react';
import './Modal.css'; // Import your modal styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='modalheading d-flex  align-items-center'>
        <span className="modal_heading mb-2">Select your truck type</span>
        <span className="close-btn" onClick={onClose}><i class="fa-solid fa-xmark" style={{fontSize:"30px"}}></i></span>


        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
