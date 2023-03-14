import React from 'react';

const Modal = ({ setShowModal }) => {
  
  const handleCancelClick = () => {
    setShowModal(false);
  }
  
  return (
    <div className="div_modal_Background">
      <div className="div_modal_container">
        <div className="div_modal_X_button">
          <button onClick={handleCancelClick}> X </button>  
        </div>
        <div className="div_modal_title"><h1>Compare related item</h1></div>
        <div className="div_modal_body"></div>
        <div className="div_modal_footer">
          <button onClick={handleCancelClick}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;