import React, { useEffect, useState } from "react";

const ReferralButton = () => {
  // Let's assume you have a referral ID from the user (stored in state, localStorage, or fetched from backend)
  const [referralLink, setReferralLink] = useState(""); // Example referral link
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReferralLink("https://yourwebsite.com/referral?ref=12345");
  }, []);

  // Function to copy referral link to the clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset the copied message after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy the referral link", err);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2">Share your friends & family</p>

      {/* Button to copy the referral link */}
      <button
        onClick={handleCopyLink}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Copy Referral Link
      </button>

      {/* Show success message if link copied */}
      {copied && (
        <span className="mt-2 text-green-500">
          Referral link copied to clipboard!
        </span>
      )}
    </div>
  );
};

export default ReferralButton;
