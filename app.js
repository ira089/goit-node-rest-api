import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";

dotenv.config();
const {DB_HOST, PORT = 3000} = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

// const DB_HOST = 'mongodb+srv://gvir2015:PEurQbs6Y9DEyDC4@cluster0.8tqm2h7.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(PORT, () => {
    console.log("Database connection successful");
  });
  
})
.catch(error => {
  console.error('Server is running. Use our API on port')
  // console.error(`Server is running. Use our API on port: ${PORT}`)
  process.exit(1)
})