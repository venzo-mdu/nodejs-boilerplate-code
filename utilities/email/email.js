import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const emailVerification = async (email) => {
  try {
    // Create a transporter using SMTP settings for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Test Email",
      text: `This is a test email sent from Node.js using nodemailer.`, // Email body (plain text)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Check if email was sent successfully
    if (info && info.response.includes("250")) {
      return true; // Email sent successfully
    } else {
      return false; // Email sending failed
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
