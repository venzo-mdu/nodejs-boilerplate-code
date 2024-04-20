import express from "express";
import cors from "cors";
import connectDb from "./database/connection.js";
import dotenv from "dotenv";
import crudRoute from "./routes/crudRoute.js";
import firebaseRoute from "./routes/firebaseRoute.js";
import logger from "./utilities/email/logger.js";

dotenv.config();
const app = express();

connectDb();
const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controller middleware
app.use("/api", crudRoute);
app.use('/firebaseApi', firebaseRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
