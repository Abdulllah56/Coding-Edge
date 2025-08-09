const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: 'muhammadabdullahbaig3750@gmail.com',
    pass: 'ytni oatr rlwu sxgq' // Your app password
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Contact form endpoint
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Coding Edge Website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1d4ed8; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 100px;">Name:</strong>
            <span style="color: #6b7280;">${name}</span>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 100px;">Email:</strong>
            <span style="color: #6b7280;">${email}</span>
          </div>
          
          ${phone ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 100px;">Phone:</strong>
            <span style="color: #6b7280;">${phone}</span>
          </div>
          ` : ''}
          
          ${subject ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: inline-block; width: 100px;">Subject:</strong>
            <span style="color: #6b7280;">${subject}</span>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151; display: block; margin-bottom: 10px;">Message:</strong>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              <p style="color: #374151; margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              This email was sent from the Coding Edge contact form<br>
              Received on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'Coding Edge Contact Form',
        address: 'muhammadabdullahbaig3750@gmail.com'
      },
      to: 'muhammadabdullahbaig3750@gmail.com',
      subject: `New Contact Form Submission${subject ? ` - ${subject}` : ''} from ${name}`,
      html: emailContent,
      replyTo: email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Send auto-reply to the user
    const autoReplyContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Coding Edge</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1d4ed8; margin-top: 0;">Hi ${name},</h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Thank you for reaching out to us! We have received your message and our team will get back to you within 24 hours.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 5px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #1d4ed8; margin-top: 0;">Your Message Summary:</h3>
            <p style="color: #374151; margin: 0;"><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p style="color: #374151; margin: 10px 0 0 0;"><strong>Message:</strong> ${message}</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            In the meantime, feel free to explore our courses and resources on our website. If you have any urgent questions, you can also reach us at:
          </p>
          
          <ul style="color: #374151; line-height: 1.6;">
            <li>Email: muhammadabdullahbaig3750@gmail.com</li>
            <li>Phone: +1 (123) 456-7890</li>
          </ul>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Best regards,<br>
              The Coding Edge Team<br>
              <a href="mailto:muhammadabdullahbaig3750@gmail.com" style="color: #3b82f6;">muhammadabdullahbaig3750@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const autoReplyOptions = {
      from: {
        name: 'Coding Edge Support',
        address: 'muhammadabdullahbaig3750@gmail.com'
      },
      to: email,
      subject: 'Thank you for contacting Coding Edge - We\'ll be in touch soon!',
      html: autoReplyContent
    };

    // Send auto-reply
    await transporter.sendMail(autoReplyOptions);
    console.log('Auto-reply sent successfully');

    // Success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.',
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files (your HTML pages)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Serve other HTML pages
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/project', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.html'));
});

// Also serve with .html extension
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/project.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;