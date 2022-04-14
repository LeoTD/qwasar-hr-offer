import React from "react";
 
const Popup = content => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={content.handleClose}>x</span>
        {content.content}
      </div>
    </div>
  );
};
 
export default Popup;

