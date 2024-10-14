import React from "react";
import { assets } from "../assets/assets";

const QR = ({ handleFileChange }) => {
  return (
    <div>
      <img src={assets.upi1} className="mx-auto w-30" alt="img" />
      <div className="flex flex-col items-center justify-center">
        <p>Upload Screenshot </p>
        <p className="upload-text font-semibold">यहाँ स्क्रीनशॉट अपलोड करे !</p>
        <label htmlFor="image">
          <img src={assets.upload} className="w-20" alt="img" />
          <input
            type="file"
            id="screenshot"
            hidden
            accept="image/*" // Optional: to accept only image files
            onChange={handleFileChange} // Call the function passed from Page
          />
        </label>
      </div>
    </div>
  );
};

export default QR;

