import React, { useContext } from "react";
import PopupContext from "../../context/PopupContext";
import "./Popup.css";
const Popup = ({ content }) => {
  const { togglePopup } = useContext(PopupContext);
  return (
    <div className="popup">
      <div className="popupBox">
        <button className="closePopup" onClick={togglePopup}>
          X
        </button>
        <div className="popupContent">{content}</div>
      </div>
    </div>
  );
};

export default Popup;
