import mongoose from "mongoose";
import pg from "pg"; // Import pg using default import
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const { Pool } = pg; // Destructure Pool from pg

const connectDb = async () => {
  try {
    let connection;
    const dbType = process.env.DB_TYPE || "mongodb";

    if (dbType === "mongodb") {
      const dbUri = process.env.MONGO_DB_URI;
      const connect = await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB database");
    } else if (dbType === "postgres") {
      const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
      });

      pool.connect((err, client, release) => {
        if (err) {
          console.error("Error connecting to PostgreSQL database:", err);
          return;
        }
        console.log("Connected to PostgreSQL database");
        release(); // Release the client back to the pool
      });
    } else if (dbType === "mySql") {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      console.log("Connected to MySQL database");
      return connection;
    } else {
      console.error("Invalid database type specified");
      process.exit(1);
    }
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

export default connectDb;
