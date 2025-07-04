// server.js
import app from "./app.js";
import cloudinary from "cloudinary";
import { config } from "dotenv";

// Load env
config({ path: "./config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at port ${process.env.PORT || 4000}`);
});
