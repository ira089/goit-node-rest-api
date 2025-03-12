// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import nodemailer from "nodemailer"

// import authRouter from "./routes/authRouter.js";
// import contactsRouter from "./routes/contactsRouter.js";

// dotenv.config();
// const {DB_HOST, PORT = 3000} = process.env;

// const app = express();

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// app.use("/api/users", authRouter)
// app.use("/api/contacts", contactsRouter);

// app.use((_, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

// mongoose.connect(DB_HOST)
// .then(()=> {
//   app.listen(PORT, () => {
//     console.log("Database connection successful");
//   });

// })
// .catch(error => {
//   console.error(error.message)
//   process.exit(1)
// })

// export default app

// подключение к базе без призмы и экспресса

// import dotenv from "dotenv";
// import pg from "pg";

// dotenv.config();

// const { Pool } = pg;
// const pool = new Pool({
//   max: 300,
//   connectionTimeoutMillis: 5000,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT || 5432,
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   ssl: {
//     rejectUnauthorized: false, // Для Azure Cosmos DB
//   },
// });

// (async () => {
//   try {

//     const res = await pool.query("SELECT NOW()");
//     console.log("Connected! Time:", res.rows[0].now);
//   } catch (err) {
//     console.error("Connection error:", err);
//   }
// })();

import express from "express";
import prisma from "./db";

const app = express();
app.use(express.json()); // Парсинг JSON в запросах

// Запуск сервера
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
