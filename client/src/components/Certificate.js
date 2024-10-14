import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const Certificate = () => {
  const [userData, setUserData] = useState(null);
  const cardRef = useRef(null); // Reference for the card

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

  if (!userData) return <div>Loading...</div>;

  //

  const handleDownload = () => {
    if (cardRef.current) {
      // Set a white background before generating the image
      cardRef.current.style.backgroundColor = "white";
      cardRef.current.style.fontFamily = "khand";

      htmlToImage
        .toPng(cardRef.current)
        .then((dataUrl) => {
          saveAs(dataUrl, "user-card.png");
          alert("Your card has been downloaded.");
        })
        .catch((error) => {
          console.error("Error generating image", error);
        })
        .finally(() => {
          // Reset background color after the download
          cardRef.current.style.backgroundColor = ""; // Reset to original
          cardRef.current.style.fontFamily = "khand"
        });
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col items-center p-4" ref={cardRef}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* First box with single image */}
          <div className="flex justify-center md:w-1/3 mb-4 md:mb-0 ">
            <img
              src={assets.p1}
              alt="Logo 1"
              className="w-16 h-16 md:w-24 md:h-24"
            />
          </div>

          {/* Middle box with title */}
          <div className="text-center md:w-1/3">
            <h1 className="text-2xl font-bold">
              <span className="text-red-600">ओबीसी</span>{" "}
              <span className="text-blue-600">महासभा</span>
            </h1>
            <p className="text-sm md:text-base">
              11, डफरिन सराय पड़ाव महारानी लक्ष्मी बाई कॉलोनी गांधीनगर ग्वालियर,
              47780
            </p>
          </div>

          {/* Last box with multiple images */}
          <div className="flex justify-center gap-2 md:w-1/3">
            <img
              src={assets.p1}
              alt="Logo 1"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <img
              src={assets.p4}
              alt="Logo 2"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <img
              src={assets.p3}
              alt="Logo 3"
              className="w-12 h-12 md:w-16 md:h-16"
            />
          </div>
        </div>

        {/* Main section */}
        <div className="flex flex-col  md:flex-row w-full mt-6 items-center justify-center">
          {/* First box with form fields */}
          <div className="md:w-1/3 text-sm md:text-base p-4 ml-9">
            <p>
              सदस्य का नाम :-{" "}
              <span className="border-b border-gray-900">
                <b>{userData.name}</b>
              </span>
            </p>
            <p>
              पिता/पति नाम :-{" "}
              <b className="border-b border-gray-900">{userData.father}</b>
            </p>
            <p>
              मोबाइल नंबर :-{" "}
              <b className="border-b border-gray-900">{userData.number}</b>
            </p>
            <p>
              शिक्षा (योग्यता) :-{" "}
              <b className="border-b border-gray-900">{userData.education}</b>
            </p>
            <p>
              नौकरी :-{" "}
              <b className="border-b border-gray-900">{userData.job}</b>
            </p>
            <p>
              वर्ग :-{" "}
              <b className="border-b border-gray-900">{userData.category}</b>
            </p>
            <p>
              प्रदेश का नाम :-{" "}
              <b className="border-b border-gray-900">{userData.statename}</b>
            </p>
            <p>
              जिले का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.districtname}
              </b>
            </p>
            <p>
              लोकसभा क्षेत्र का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.loksabhaconstituencyname}
              </b>
            </p>
            <p>
              विधानसभा क्षेत्र का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.vidhansabhaconstituencyname}
              </b>
            </p>
            <p>
              तहसील का नाम :-{" "}
              <b className="border-b border-gray-900">{userData.tehsilname}</b>
            </p>
            <p>
              जिला पंचायत क्षेत्र का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.zilapanchayatconstituencyname}
              </b>
            </p>
            <p>
              जनपद पंचायत क्षेत्र का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.janpadpanchayatconstituencyname}
              </b>
            </p>
            <p>
              नगर निगम का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.municipalcorporationname}
              </b>
            </p>
            <p>
              नगर पालिका का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.municipalityname}
              </b>
            </p>
            <p>
              नगर पंचायत का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.nagarpanchayatname}
              </b>
            </p>
            <p>
              ग्राम पंचायत का नाम :-{" "}
              <b className="border-b border-gray-900">
                {userData.grampanchayatname}
              </b>
            </p>
            <p>
              वार्ड नं :-{" "}
              <b className="border-b border-gray-900">{userData.wardno}</b>
            </p>
            <p>
              पिनकोड :-{" "}
              <b className="border-b border-gray-900">{userData.pincode}</b>
            </p>

            <h5 className="font-semibold mt-4">
              आप संघठन के किस विभाग में सेवा करना चाहते है :
            </h5>
            <p>
              <b className="text-blue-600 border-b border-gray-900">
                ---------{userData.sagetan}-----------
              </b>
            </p>
          </div>

          {/* Second box with image and text */}
          <div className="md:w-1/4 flex flex-col items-center p-6 text-center border-2 border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold">
              महा सदस्यता अभियान <br /> 2024 - 2025
            </h1>
            <img
              src={userData.image}
              alt="Campaignimage"
              crossOrigin="anonymous"
              className="w-28 h-28 md:w-40 md:h-40 mt-6 rounded-50 border-2 border-gray-300"
            />
            <h2 className="mt-4 text-lg font-semibold">
              जय जवान जय किसान <br /> जय ओबीसी जय संविधान
            </h2>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center mt-6">
          <div className="text-center flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-globe"></i>
              <span>www.obcmahasabha.org.in</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-message"></i>
              <span>Connect.Obcmahasabha@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-brands fa-instagram"></i>
              <span>ObcMahasabha4indi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4 p-4 bg-gray-100">
        <button
          className="footer-box bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200"
          onClick={handleDownload}
        >
          <i className="fa-solid fa-download"></i>
        </button>
        <button className="footer-box bg-green-500 text-white rounded-lg p-2 hover:bg-green-700 transition duration-200">
          <i className="fa-solid fa-share"></i>
        </button>
      </div>
    </>
  );
};

export default Certificate;
