import express from "express";
import { adminLogin, getAllUsers, getRegisterUser, registerUser } from "../controllers/usersController.js";
import auth from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const usersRouter = express.Router();


usersRouter.post("/register", upload, registerUser);
usersRouter.get('/getRegisterUser',auth, getRegisterUser);
usersRouter.get('/getAllUsers', getAllUsers);
usersRouter.post('/admin', adminLogin);

export default usersRouter;
