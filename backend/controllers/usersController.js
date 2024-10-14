import jwt from "jsonwebtoken";
import usersModel from "../models/usersModel.js";
import dotenv from 'dotenv';
dotenv.config();
const ADMIN_EMAIL =process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD =process.env.ADMIN_PASSWORD;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const {
      name,
      number,
      father,
      education,
      job,
      category,
      statename,
      districtname,
      loksabhaconstituencyname,
      vidhansabhaconstituencyname,
      tehsilname,
      zilapanchayatconstituencyname,
      janpadpanchayatconstituencyname,
      municipalcorporationname,
      municipalityname,
      nagarpanchayatname,
      grampanchayatname,
      wardno,
      pincode,
      sagetan,
      marrid,
      image,
      screenshot,
    } = req.body;

    // if (!req.file || !req.file.filename) {
    //   return res.json({ success: false, message: "Photo is required" });
    // }
    // const image_filename = req.file.filename;

    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);

    const newUser = new usersModel({
      name,
      number,
      father,
      education,
      job,
      category,
      statename,
      districtname,
      loksabhaconstituencyname,
      vidhansabhaconstituencyname,
      tehsilname,
      zilapanchayatconstituencyname,
      janpadpanchayatconstituencyname,
      municipalcorporationname,
      municipalityname,
      nagarpanchayatname,
      grampanchayatname,
      wardno,
      pincode,
      sagetan,
      marrid,
      image,
      screenshot,
      randomCode: randomNumber,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
      err: error,
    });
  }
};

const getRegisterUser = async (req, res) => {
  try {
    // Check if req.user is available (set by the auth middleware)
    if (!req.user || !req.user.id) {
      return res.json({
        success: false,
        message: "Unauthorized, no user found",
      });
    }

    // Find the user by ID
    const user = await usersModel.findById(req.user.id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Return the user data
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user data" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await usersModel.find();

    // Check if users exist
    if (!users || users.length === 0) {
      return res.json({ success: false, message: "No users found" });
    }

    // Return all users data
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching users data" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, message: "Admin Login Successfully", token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, getRegisterUser, getAllUsers, adminLogin };
