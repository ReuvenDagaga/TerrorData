import React from "react";
import { PopUpProp } from "../../interface/PopUpProp";

export default function PopUp({
  onConfirm,
  onCancel,
  textInConfirm,
  textInCancel,
}: PopUpProp) {
  
  return (
      <div style={{position: 'fixed', background: 'red', height: '300px', width: '300px'}} className="popup-container" >
        <div className="popup">
          <p>Are you sure to delete it?</p>
          <button onClick={onConfirm}>{textInConfirm}</button>
          <button onClick={onCancel}>{textInCancel}</button>
        </div>
      </div>
  );
}
