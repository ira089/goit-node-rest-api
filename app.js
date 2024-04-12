import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer"

import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";


dotenv.config();
const {DB_HOST, PORT = 3000} = process.env;

// отправка почты
// const {DB_HOST, PORT = 3000, UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;
// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_FROM,
//     pass: UKR_NET_PASSWORD,
//   }
// }
// const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   from: UKR_NET_FROM,
//   to: "gvir2015@gmail.com",
//   subject: "Test HW06",
//   html: "<strong>Hello! Test email</strong>"
// }
// transport.sendMail(email)
// .then(() => console.log("test email success"))
// .catch(error => console.log(error.message))
// конец отправка почты

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(PORT, () => {
    console.log("Database connection successful");
  });
  
})
.catch(error => {
  console.error(error.message)
  process.exit(1)
})

export default app