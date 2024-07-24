import express from "express";
import dotenv from "dotenv";
import mongooseConnect from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
mongooseConnect();
// const app = express();

const __dirname = path.resolve();

//!connecting to cloudinary for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//!middleware
app.use(express.json({ limit: "50mb" })); //to parse json data in the req.body
app.use(express.urlencoded({ limit: "50mb", extended: true })); //to parse form data in the req.body
app.use(cookieParser()); //

//!Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

//*http://localhost:3000 => backend,frontend

let PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  //react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
