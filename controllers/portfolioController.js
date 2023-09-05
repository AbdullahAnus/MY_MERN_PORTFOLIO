import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.API_BREVO);
// Transport
const transporter = nodemailer.createTransport(
  new Transport({
    apiKey: process.env.API_BREVO,
  })
);

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    // validation
    if (!name || !email || !msg) {
      res.status(500).send({
        success: false,
        message: "All Feilds Are Required",
      });
    }
    // email matter
    transporter.sendMail({
      to: "abdullahanusbutt601@gmail.com",
      from: "abdullahanusbutt601@gmail.com",
      subject: "Regarding MERN Portfolio App",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Message: ${msg}</li>
      </ul>
      `,
    });
    res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Send Email API error",
      error,
    });
  }
};

export { sendEmailController };
