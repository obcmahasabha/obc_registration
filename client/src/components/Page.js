import React, { useState } from "react";
import "./Page.css";
import { assets } from "../assets/assets";
import axios from "axios";
// import QR from "./QR";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    father: "",
    education: "",
    job: "",
    category: "",
    statename: "",
    districtname: "",
    loksabhaconstituencyname: "",
    vidhansabhaconstituencyname: "",
    tehsilname: "",
    zilapanchayatconstituencyname: "",
    janpadpanchayatconstituencyname: "",
    municipalcorporationname: "",
    municipalityname: "",
    nagarpanchayatname: "",
    grampanchayatname: "",
    wardno: "",
    pincode: "",
    sagetan: "",
    marrid: "",
    screenshot: null,
    image: null, // Store file object for later upload
  });

  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false); // State to control QR code visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file based on the input name
      }));
    }
  };

  const handlePayment = () => {
    // Simulate payment process here
    setShowQr(true); // Show QR code after payment confirmation
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loading);
    // VALIDATION FOR ALL THE FEILDS
    const requiredFields = [
      { name: "name", label: "सदस्य का नाम" },
      { name: "number", label: "मोबाइल नंबर" },
      { name: "father", label: "पिता/पति नाम" },
      { name: "marrid", label: "विवाहित/अविवाहित" },
      { name: "category", label: "वर्ग" },
      { name: "statename", label: "प्रदेश का नाम" },
      { name: "districtname", label: "जिले का नाम" },
      // { name: "loksabhaconstituencyname", label: "लोकसभा क्षेत्र का नाम" },
      // { name: "vidhansabhaconstituencyname", label: "विधानसभा क्षेत्र का नाम" },
      // { name: "tehsilname", label: "तहसील का नाम" },
      // {
      //   name: "zilapanchayatconstituencyname",
      //   label: "जिला पंचायत क्षेत्र का नाम",
      // },
      // {
      //   name: "janpadpanchayatconstituencyname",
      //   label: "जनपद पंचायत क्षेत्र का नाम",
      // },
      // { name: "municipalcorporationname", label: "नगर निगम का नाम" },
      // { name: "municipalityname", label: "नगर पालिका का नाम" },
      // { name: "nagarpanchayatname", label: "नगर पंचायत का नाम" },
      // { name: "grampanchayatname", label: "ग्राम पंचायत का नाम" },
      // { name: "wardno", label: "वार्ड नं" },
      { name: "pincode", label: "पिनकोड" },
      { name: "sagetan", label: "संघठन के विभाग" },
      { name: "image", label: "फोटो अपलोड करें" },
       { name: "screenshot", label: "स्क्रीनशॉट अपलोड करे!" },
    ];

    // Check if any required fields are empty
    const emptyFields = requiredFields.filter((field) => !formData[field.name]);

    if (emptyFields.length > 0) {
      // Display the names of the missing fields in the toast error message
      const missingFieldsMessage = emptyFields
        .map((field) => field.label)
        .join(", ");
      toast.error(`अनिवार्य फील्ड भरें: ${missingFieldsMessage}`);
      return;
    }
 // Validate phone number before proceeding
    if (!isValidPhoneNumber(formData.number)) {
      toast.error("मान्य मोबाइल नंबर दर्ज करें (10 अंक)");
      return;
    }
    toast.success("Wait...");
    setLoading(true); // Start loading immediately

    try {
      //  Create a new FormData instance for the main image upload
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", formData.image); // Main image upload
      formDataToUpload.append("upload_preset", "ml_default"); // Cloudinary upload preset
      formDataToUpload.append("folder", "user_image");

      // Upload the main image to Cloudinary
      const imageResponse = await axios.post( 
       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,// Cloudinary API URL
        formDataToUpload
      );
      const imageUrl = imageResponse.data.secure_url; // Store the uploaded main image URL

      
      const formDataForScreenshot = new FormData();
      formDataForScreenshot.append("file", formData.screenshot); // Screenshot upload
      formDataForScreenshot.append("upload_preset", "ml_default"); // Cloudinary upload preset
      formDataForScreenshot.append("folder", "payment_screenshot");

      // Upload the screenshot to Cloudinary
      const screenshotResponse = await axios.post(
       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // Cloudinary API URL
        formDataForScreenshot
      );
      const screenshotUrl = screenshotResponse.data.secure_url; // Store the uploaded screenshot URL

      //  Prepare the form data with image URLs for the backend
      const formDataToSend = {
        ...formData,
        image: imageUrl, // Cloudinary URL for the main image
        screenshot: screenshotUrl, // Cloudinary URL for the screenshot
      };

      //  Submit the form data to the backend
      const submitResponse = await toast.promise(
        axios.post(
          `${BASE_URL}/api/users/register`, // Backend API URL
          formDataToSend
        ),
        {
          loading: "Saving data...",
          success: <b>Registration Successful!</b>,
          error: <b>Failed to register. Please try again.</b>,
        }
      );

      //  Handle successful registration and redirection
      if (submitResponse.data.success) {
        // Store the token in localStorage
        localStorage.setItem("token", submitResponse.data.token);

        // Redirect to the demo page
        window.location.href = "/demo";
      } else {
        console.error(submitResponse.data.message);
      }
    } catch (error) {
      // Log the error for debugging
      console.error(
        "Error during registration",
        error.response?.data?.message || error.message
      );
      // Optionally, you can add another toast.error here to inform the user of the specific error
      toast.error("Error occurred during registration. Please try again.");
    } finally {
      setLoading(false); // End loading after the whole process
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="flex justify-center items-center">
        <img
          src={assets.obc}
          className="w-30 h-56 object-cover max-w-2xl justify-center items-center img-width"
          alt="Background"
        />
      </div>
      <h1 className="flex justify-center items-center mt-8 text-3xl per-font per-col">
        <b className="per-font">ओबीसी महासभा सदस्यता फॉर्म - 2024</b>
      </h1>

      <form
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg  space-y-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="name" className="block text-gray-700">
          सदस्य का नाम * :
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="सदस्य का नाम"
          onChange={handleChange}
          value={formData.name}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="father" className="block text-gray-700">
          पिता/पति नाम * :
        </label>
        <input
          type="text"
          id="father"
          name="father"
          placeholder="पिता/पति नाम"
          onChange={handleChange}
          value={formData.father}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="marrid" className="block text-gray-700">
          विवाहित/अविवाहित * :
        </label>
        {/* <input
            type="text"
            id="marrid"
            name="marrid"
            required
            placeholder="विवाहित/अविवाहित"
            onChange={handleChange}
            value={formData.marrid}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          /> */}
        <select
          id="marrid"
          name="marrid"
          onChange={handleChange}
          value={formData.marrid}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        <option value="" disabled>
            -- चयन करें --
           </option>  

          <option value="हाँ">हाँ</option>
          <option value="नहीं">नहीं</option>
         
        </select>

        <label htmlFor="number" className="block text-gray-700">
          मोबाइल नंबर * :
        </label>
        <input
          type="text"
          id="number"
          name="number"
          placeholder="मोबाइल नंबर"
          onChange={handleChange}
          value={formData.number}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="education" className="block text-gray-700">
          शिक्षा (योग्यता) :
        </label>
        <input
          type="text"
          id="education"
          name="education"
          placeholder="शिक्षा (योग्यता)"
          onChange={handleChange}
          value={formData.education}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="job" className="block text-gray-700">
          नौकरी :
        </label>
        <input
          type="text"
          id="job"
          name="job"
          placeholder="नौकरी"
          onChange={handleChange}
          value={formData.job}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="category" className="block text-gray-700">
          वर्ग * :
        </label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={formData.category}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            -- चयन करें --
           </option>  
          <option value="OBC">ओबीसी (OBC)</option>
          <option value="SC">एससी (SC)</option>
          <option value="ST">एसटी (ST)</option>
        </select>

        <label htmlFor="statename" className="block text-gray-700">
          प्रदेश का नाम * :
        </label>
        <select
          id="statename"
          name="statename"
          onChange={handleChange}
          value={formData.statename}
          className="block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >

         

          <option value="" disabled>-- राज्य चुनें --</option>
          <option value="आंध्र प्रदेश">आंध्र प्रदेश</option>
          <option value="अरुणाचल प्रदेश">अरुणाचल प्रदेश</option>
          <option value="असम">असम</option> {/* Assam */}
          <option value="बिहार">बिहार</option> {/* Bihar */}
          <option value="छत्तीसगढ़">छत्तीसगढ़</option> {/* Chhattisgarh */}
          <option value="गोवा">गोवा</option> {/* Goa */}
          <option value="गुजरात">गुजरात</option> {/* Gujarat */}
          <option value="हरियाणा">हरियाणा</option> {/* Haryana */}
          <option value="हिमाचल प्रदेश">हिमाचल प्रदेश</option>{" "}
          {/* Himachal Pradesh */}
          <option value="झारखंड">झारखंड</option> {/* Jharkhand */}
          <option value="कर्नाटक">कर्नाटक</option> {/* Karnataka */}
          <option value="केरल">केरल</option> {/* Kerala */}
          <option value="मध्य प्रदेश">मध्य प्रदेश</option>{" "}
          {/* Madhya Pradesh */}
          <option value="महाराष्ट्र">महाराष्ट्र</option> {/* Maharashtra */}
          <option value="मणिपुर">मणिपुर</option> {/* Manipur */}
          <option value="मेघालय">मेघालय</option> {/* Meghalaya */}
          <option value="मिजोरम">मिजोरम</option> {/* Mizoram */}
          <option value="नागालैंड">नागालैंड</option> {/* Nagaland */}
          <option value="ओडिशा">ओडिशा</option> {/* Odisha */}
          <option value="पंजाब">पंजाब</option> {/* Punjab */}
          <option value="राजस्थान">राजस्थान</option> {/* Rajasthan */}
          <option value="सिक्किम">सिक्किम</option> {/* Sikkim */}
          <option value="तमिलनाडु">तमिलनाडु</option> {/* Tamil Nadu */}
          <option value="तेलंगाना">तेलंगाना</option> {/* Telangana */}
          <option value="त्रिपुरा">त्रिपुरा</option> {/* Tripura */}
          <option value="उत्तर प्रदेश">उत्तर प्रदेश</option>{" "}
          {/* Uttar Pradesh */}
          <option value="उत्तराखंड">उत्तराखंड</option> {/* Uttarakhand */}
          <option value="पश्चिम बंगाल">पश्चिम बंगाल</option> {/* West Bengal */}

        </select>

        <label htmlFor="districtname" className="block text-gray-700">
          जिले का नाम * :
        </label>
        <input
          type="text"
          id="districtname"
          name="districtname"
          placeholder="जिले का नाम"
          onChange={handleChange}
          value={formData.districtname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label
          htmlFor="loksabhaconstituencyname"
          className="block text-gray-700"
        >
          लोकसभा क्षेत्र का नाम * :
        </label>
        <input
          type="text"
          id="loksabhaconstituencyname"
          name="loksabhaconstituencyname"
          placeholder="लोकसभा क्षेत्र का नाम "
          onChange={handleChange}
          value={formData.loksabhaconstituencyname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label
          htmlFor="vidhansabhaconstituencyname"
          className="block text-gray-700"
        >
          विधानसभा क्षेत्र का नाम * :
        </label>
        <input
          type="text"
          id="vidhansabhaconstituencyname"
          name="vidhansabhaconstituencyname"
          placeholder="विधानसभा क्षेत्र का नाम"
          onChange={handleChange}
          value={formData.vidhansabhaconstituencyname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="tehsilname" className="block text-gray-700">
          तहसील का नाम * :
        </label>
        <input
          type="text"
          id="tehsilname"
          name="tehsilname"
          placeholder="तहसील का नाम"
          onChange={handleChange}
          value={formData.tehsilname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label
          htmlFor="zilapanchayatconstituencyname"
          className="block text-gray-700"
        >
          जिला पंचायत क्षेत्र का नाम * :
        </label>
        <input
          type="text"
          id="zilapanchayatconstituencyname"
          name="zilapanchayatconstituencyname"
          placeholder="जिला पंचायत क्षेत्र का नाम "
          onChange={handleChange}
          value={formData.zilapanchayatconstituencyname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label
          htmlFor="janpadpanchayatconstituencyname"
          className="block text-gray-700"
        >
          जनपद पंचायत क्षेत्र का नाम * :
        </label>
        <input
          type="text"
          id="janpadpanchayatconstituencyname"
          name="janpadpanchayatconstituencyname"
          placeholder="जनपद पंचायत क्षेत्र का नाम "
          onChange={handleChange}
          value={formData.janpadpanchayatconstituencyname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label
          htmlFor="municipalcorporationname"
          className="block text-gray-700"
        >
          नगर निगम का नाम * :
        </label>
        <input
          type="text"
          id="municipalcorporationname"
          name="municipalcorporationname"
          placeholder="नगर निगम का नाम"
          onChange={handleChange}
          value={formData.municipalcorporationname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="municipalityname" className="block text-gray-700">
          नगर पालिका का नाम* :
        </label>
        <input
          type="text"
          id="municipalityname"
          name="municipalityname"
          placeholder="नगर पालिका का नाम"
          onChange={handleChange}
          value={formData.municipalityname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="nagarpanchayatname" className="block text-gray-700">
          नगर पंचायत का नाम * :
        </label>
        <input
          type="text"
          id="nagarpanchayatname"
          name="nagarpanchayatname"
          placeholder="नगर पंचायत का नाम"
          onChange={handleChange}
          value={formData.nagarpanchayatname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="grampanchayatname" className="block text-gray-700">
          ग्राम पंचायत का नाम * :
        </label>
        <input
          type="text"
          id="grampanchayatname"
          name="grampanchayatname"
          placeholder="ग्राम पंचायत का नाम "
          onChange={handleChange}
          value={formData.grampanchayatname}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="wardno" className="block text-gray-700">
          वार्ड नं * :
        </label>
        <input
          type="text"
          id="wardno"
          name="wardno"
          placeholder="वार्ड नं"
          onChange={handleChange}
          value={formData.wardno}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="pincode" className="block text-gray-700">
          पिनकोड * :
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          placeholder="पिनकोड"
          onChange={handleChange}
          value={formData.pincode}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* More form fields go here */}

        <div className="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
            for="file_input"
          >
            फोटो अपलोड करें :
          </label>
          <input
      type="file"
      id="image"
      name="image"
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg  file:text-sm  file:bg-transparent hover:file:bg-gray-50"
    />
        </div>
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            className="mx-auto w-30"
            alt="Profile"
          />
        )}
        <label htmlFor="sagetan" className="block text-gray-700 text-small">
          <b>आप संघठन के किस विभाग में सेवा करना चाहते हैं</b>
        </label>
        <select
          id="sagetan"
          name="sagetan"
          onChange={handleChange}
          value={formData.sagetan}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            "चयन करें"
           </option>
          <option value="अधिकारी कर्मचारी विभाग">अधिकारी कर्मचारी विभाग</option>
          <option value="समाजिक विभाग">समाजिक विभाग</option>
          <option value="राजनैतिक विभाग">राजनैतिक विभाग</option>
          <option value="आर्थिक विभाग धार्मिक विभाग">
            आर्थिक विभाग धार्मिक विभाग
          </option>
          <option value="शिक्षा विभाग">शिक्षा विभाग</option>
          <option value="मीडिया विभाग">मीडिया विभाग</option>
          <option value="कैडर विभाग">कैडर विभाग</option>
          <option value="साहित्य विभाग">साहित्य विभाग</option>
          <option value="सांस्कृतिक विभाग">सांस्कृतिक विभाग</option>
          <option value="महिला विभाग">महिला विभाग</option>
          <option value="छात्र विभाग">छात्र विभाग</option>
          <option value="बेरोजगार विभाग">बेरोजगार विभाग</option>
          <option value="स्वास्थ्य विभाग">स्वास्थ्य विभाग</option>
          <option value="सुरक्षा विभाग">सुरक्षा विभाग</option>
          <option value="न्याय विभाग">न्याय विभाग</option>
          <option value="पेंशनर विभाग">पेंशनर विभाग</option>
          <option value="किसान विभाग">किसान विभाग</option>
          <option value="गरीब विभाग">गरीब विभाग</option>
          <option value="मजदूर विभाग">मजदूर विभाग</option>
        </select>

        <p className="text-gray-700 mt-4">
          सदस्यता शुल्क : ₹100/– ( अनिवार्य )
        </p>
        <br />
           {/* QR function is used here to properly upload image without any conflict */}
        <button
          type="button" // Change to button for payment confirmation
          onClick={handlePayment}
          className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          भुगतान की पुष्टि करें
        </button>

        {/* Show QR code after payment confirmation */}
        {showQr && (
          <>
            {/* Screenshot Upload */}
            <div className="flex flex-col items-center justify-center">
            <img src={assets.OBC_QR} className="mx-auto w-30" alt="img" />
              <p>Upload Screenshot</p>
              <p className="upload-text font-semibold">
                यहाँ स्क्रीनशॉट अपलोड करे!
              </p>
              <label htmlFor="screenshot">
              <img src={assets.upload} className="w-20" alt="img" />
                <input
                  type="file"
                  id="screenshot"
                  name="screenshot" // Name this input for proper handling
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                  // className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700  border-gray-600  :placeholder-gray-400"
                />
              </label>
              
              {formData.screenshot && (
                <img
                  src={URL.createObjectURL(formData.screenshot)}
                  className="mx-auto w-30"
                  alt="Screenshot"
                />
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 rounded-lg shadow-xl shadow-gray-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          ओबीसी महासभा की सदस्यता ग्रहण करें !
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Page;
