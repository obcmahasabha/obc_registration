import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connn.js";
import usersRouter from "./routes/usersRoutes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4001;
// connectDB()
connectDB().catch((err) => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process if the DB connection fails
});
app.use(express.json());
app.use(cors());

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use("/image", express.static("uploads"));
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
