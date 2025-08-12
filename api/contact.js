// Vercel serverless function for contact form
const nodemailer = require('nodemailer');

// In-memory storage for demo (in production, use a database)
let contactSubmissions = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message, rating } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, subject, and message are required' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    let newContact = {
      id: contactSubmissions.length + 1,
      name,
      email,
      phone: phone || null,
      subject,
      message,
      rating: rating || null,
      status: 'new',
      createdAt: new Date()
    };

    contactSubmissions.push(newContact);
    console.log('✅ Contact form submission saved:', newContact);
  
    // Send email if email configuration is available
    const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;
    
    if (emailConfigured) {
      try {
        // Create transporter
        const transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        
        console.log('📧 Attempting to send contact form emails');
        
        // Send notification to admin (your email)
        const adminEmailHtml = `
          <h2>New Contact Form Submission - Coding Edge</h2>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${newContact.name}</p>
            <p><strong>Email:</strong> ${newContact.email}</p>
            <p><strong>Phone:</strong> ${newContact.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${newContact.subject}</p>
            <p><strong>Rating:</strong> ${newContact.rating ? '⭐'.repeat(newContact.rating) + ` (${newContact.rating}/5)` : 'Not provided'}</p>
            
            <h3>Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              <p>${newContact.message}</p>
            </div>
            
            <p><small>Submitted on: ${newContact.createdAt.toLocaleString()}</small></p>
          </div>
        `;

        // Send notification to your email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to your own email
          subject: `New Contact Form: ${newContact.subject} - ${newContact.name}`,
          html: adminEmailHtml
        });
        
        console.log('✅ Admin notification email sent successfully');

        // Send confirmation to customer
        const customerEmailHtml = `
          <h2>Thank you for contacting Coding Edge!</h2>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Dear ${newContact.name},</p>
            
            <p>We have received your message and will get back to you within 24 hours.</p>
            
            <h3>Your Message Summary:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff;">
              <p><strong>Subject:</strong> ${newContact.subject}</p>
              <p><strong>Message:</strong> ${newContact.message}</p>
              ${newContact.rating ? `<p><strong>Rating:</strong> ${'⭐'.repeat(newContact.rating)} (${newContact.rating}/5)</p>` : ''}
            </div>
            
            <p>We appreciate your interest in Coding Edge and will respond as soon as possible.</p>
            
            <p>Best regards,<br>The Coding Edge Team</p>
          </div>
        `;

        // Send confirmation to customer
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: newContact.email,
          subject: 'Thank you for contacting Coding Edge!',
          html: customerEmailHtml
        });
        
        console.log(`✅ Customer confirmation email sent successfully to ${newContact.email}`);
        console.log('📧 Contact form emails sent successfully');
        
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the entire request if email fails
      }
    } else {
      console.log('📧 Email not configured - contact form saved without sending emails');
    }
    
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
      contact: newContact
    });
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'There was an error processing your request. Please try again later.',
      error: error.message 
    });
  }
}