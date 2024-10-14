import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
// import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
// import ReferralButton from "./ReferralButton ";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_SERVER_URL;


const Demo = () => {
  const [userData, setUserData] = useState(null);
  const cardRef = useRef(null); // Reference for the card
  const pageUrl = window.location.href;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        window.location.href = "/login"; // Redirect to login if no token
        return;
      }

      try {
        // Fetch user data using the token
        const response = await axios.get(
          
          `${BASE_URL}/api/users/getRegisterUser`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Add the token in the Authorization header
          }
        );

        if (response.data.success) {
          setUserData(response.data.data); // Set user data
        } else {
          console.error(response.data.message); // Log any error message
        }
      } catch (error) {
        console.error("Error fetching user data", error); // Catch any fetch errors
      }
    };

    fetchUserData();
  }, []);

  // const handleDownload = async () => {
  //   if (cardRef.current) {
  //     toast("Downloading...");
  //     // Set a white background before generating the image
  //     cardRef.current.style.backgroundColor = "white";
  //     cardRef.current.style.fontFamily = "khand";

  //     try {
  //       // Convert the card (with profile image) to a PNG
  //       const dataUrl = await htmlToImage.toPng(cardRef.current, { 
  //         cacheBust: true, // Ensure image caching doesn't interfere
  //         useCORS: true,
  //       });
        
  //       saveAs(dataUrl, "user-card.png");
  //       toast.success("Your card has been downloaded.");
  //     } catch (error) {
  //       toast.error("Error generating image", error);
  //     } finally {
  //       // Reset styles after download
  //       cardRef.current.style.backgroundColor = "";
  //       cardRef.current.style.fontFamily = "khand";
  //     }
  //   }
  // };

  // new function to download card as earlier function was not compatible with all the browsers

  const handleDownload = async () => {
    if (cardRef.current) {
      toast("Downloading...");

      // Set a white background and custom font before generating the image
      cardRef.current.style.backgroundColor = "white";
      cardRef.current.style.fontFamily = "khand";

      try {
        // Use html2canvas to capture the card as a canvas
        const canvas = await html2canvas(cardRef.current, {
          useCORS: true, 
          scale: 2, 
        });

        // Convert the canvas to an image (PNG format)
        const dataUrl = canvas.toDataURL("image/png");

        // Download the image as a PNG
        saveAs(dataUrl, "membership-card.png");
        toast.success("Your card has been downloaded.");
      } catch (error) {
        toast.error("Error generating image: " + error.message);
      } finally {
        // Reset styles and show share buttons again after download
        cardRef.current.style.backgroundColor = "";
        cardRef.current.style.fontFamily = "";
        
      }
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      <div ref={cardRef}>
        <img src={assets.OBC_Header} alt="header" />
        <p className="flex items-center justify-center text-2xl md:text-6xl font-extrabold my-css mt-2">
          सदस्यता कार्ड 2024
        </p>
        <div className="flex justify-around mt-4">
          <div>
            <p>
              नाम :- <b>{userData.name}</b>
            </p>
            <p>
              राज्य का नाम :- <b>{userData.statename}</b>
            </p>
            <p>
              लोकसभा :- <b>{userData.loksabhaconstituencyname}</b>
            </p>
            <p>
              जिला :- <b>{userData.districtname}</b>
            </p>
            <p className="text-lg">
              ID No. :- <b>{userData.randomCode}</b>
            </p>{" "}
            {/* Displaying the random code */}
          </div>
          <div className="">
            <img
              src={userData.image}
              crossOrigin="anonymous"
              className="w-[100px] h-[100px] -mt-0 rounded-full border-4 border-yellow-200 mb-2 "
              alt="img"
            />
          </div>
        </div>
        <img src={assets.OBC_bottom} alt="img" />
      </div>

      <div className="flex justify-center items-center space-x-4 p-4 bg-gray-100">
        <button
          className="footer-box bg-red-500 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200"
          onClick={handleDownload}
        >
          <i className="fa-solid fa-download"></i>
        </button>

        {/* Social Media Share Buttons from react-share */}
        <FacebookShareButton
          url={pageUrl}
          quote="मैंने ओबीसी महासभा की सदस्यता ले ली है। मैं सभी से अनुरोध करता हूँ कि आप भी ओबीसी महासभा के महासदस्यता अभियान का हिस्सा बनें और ओबीसी महासभा से जुड़ें। कृपया इस लिंक को अधिक से अधिक साझा करें ताकि हम अधिक लोगों को ओबीसी महासभा से जोड़ सकें।
"
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <TwitterShareButton url={pageUrl} title="मैंने ओबीसी महासभा की सदस्यता ले ली है। मैं सभी से अनुरोध करता हूँ कि आप भी ओबीसी महासभा के महासदस्यता अभियान का हिस्सा बनें और ओबीसी महासभा से जुड़ें। कृपया इस लिंक को अधिक से अधिक साझा करें ताकि हम अधिक लोगों को ओबीसी महासभा से जोड़ सकें।
">
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={pageUrl}
          title="मैंने ओबीसी महासभा की सदस्यता ले ली है। मैं सभी से अनुरोध करता हूँ कि आप भी ओबीसी महासभा के महासदस्यता अभियान का हिस्सा बनें और ओबीसी महासभा से जुड़ें। कृपया इस लिंक को अधिक से अधिक साझा करें ताकि हम अधिक लोगों को ओबीसी महासभा से जोड़ सकें।
"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <LinkedinShareButton
          url={pageUrl}
          title="मैंने ओबीसी महासभा की सदस्यता ले ली है। मैं सभी से अनुरोध करता हूँ कि आप भी ओबीसी महासभा के महासदस्यता अभियान का हिस्सा बनें और ओबीसी महासभा से जुड़ें। कृपया इस लिंक को अधिक से अधिक साझा करें ताकि हम अधिक लोगों को ओबीसी महासभा से जोड़ सकें।"
        >
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
      </div>

      <div className="mt-6">
        {/* <ReferralButton /> */}
      </div>

      <div className="mt-6">
      <img src={assets.thanks_image} alt="img" />
      </div>
      <Toaster />
    </>
  );
};

export default Demo;
