const nodemailer = require('nodemailer');

// Create transporter with Gmail configuration
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password for Gmail
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email function
const sendEmail = async (to, subject, htmlContent, textContent = null) => {
  try {
    const transporter = createTransporter();
    
    // Verify transporter configuration
    await transporter.verify();
    console.log('📧 Email transporter verified successfully');

    const mailOptions = {
      from: {
        name: 'Coding Edge',
        address: process.env.EMAIL_USER
      },
      to: to,
      subject: subject,
      html: htmlContent,
      text: textContent || htmlContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}:`, info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
};