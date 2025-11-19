import nodemailer from "nodemailer"
import { ENV } from "../lib/env.js";


// Create a test account or replace with real credentials.
 export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  },
});