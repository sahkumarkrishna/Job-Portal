// app.js
import express from "express";
import dbConnection from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors"
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Load env variables
config({ path: "./config/config.env" });

const app = express();

// Middleware


app.use(
  cors({
    origin:  process.env.FRONTEND_URL ,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Add this manual override just in case
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// DB connection (don't call listen here!)
dbConnection();

// Error middleware
app.use(errorMiddleware);

// Export app for both local and Vercel usage
export default app;
