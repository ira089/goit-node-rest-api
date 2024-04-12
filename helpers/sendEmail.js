import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config();
const {UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: UKR_NET_FROM,
      pass: UKR_NET_PASSWORD,
    }
  }
  const transport = nodemailer.createTransport(nodemailerConfig);

//   const data = {
//     from: UKR_NET_FROM,
//     to: "gvir2015@gmail.com",
//     subject: "Test HW06",
//     html: "<strong>Hello! Test email</strong>"
//   }

  const sendEmail = data => {
    const email = {...data, from: UKR_NET_FROM}
    return transport.sendMail(email)
  }

  export default sendEmail
//   transport.sendMail(email)
//   .then(() => console.log("test email success"))
//   .catch(error => console.log(error.message))