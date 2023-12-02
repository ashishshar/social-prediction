// CustomModal.js
import React from 'react';
import '../style/ModalStyles.css';

const CustomModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{title}</h5>
            <button onClick={onClose} className="modal-close-button">&times;</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
export default CustomModal;
