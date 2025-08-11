// Load environment variables from .env file
require('dotenv').config();

// Verify email configuration
const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

if (emailConfigured) {
  console.log('✅ Email configuration loaded successfully.');
  console.log(`📧 Email configured with: ${process.env.EMAIL_USER}`);
} else {
  console.warn('⚠️ Email configuration is missing. Email features will be disabled.');
  if (!process.env.EMAIL_USER) console.warn('Missing EMAIL_USER environment variable');
  if (!process.env.EMAIL_PASS) console.warn('Missing EMAIL_PASS environment variable');
}

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for deployment
app.set('trust proxy', 1);

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, /\.vercel\.app$/, /\.replit\.dev$/, /\.repl\.co$/]
    : ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

console.log('🔒 CORS configured to allow requests from:', corsOptions.origin);

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Health check endpoint for deployment
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Add a route to handle CORS preflight requests for all API endpoints
app.options('/api/*', cors(corsOptions));

// Add a route to check if the server is properly configured
app.get('/api/config-check', (req, res) => {
  res.json({
    server: {
      port: PORT,
      environment: process.env.NODE_ENV || 'development'
    },
    cors: {
      enabled: true,
      allowedOrigins: Array.isArray(corsOptions.origin) ? corsOptions.origin : ['all origins']
    },
    email: {
      configured: !!emailConfigured,
      sender: emailConfigured ? process.env.EMAIL_USER : null
    }
  });
});

// In-memory storage for demo (no database)
const users = [];
const contactSubmissions = [];

// API Routes for user authentication
app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    return res.json({ status: 'error', message: 'Email and password are required' });
  }
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.json({ status: 'error', message: 'User already exists' });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password, // In production, hash this password
    name: name || email.split('@')[0],
    createdAt: new Date(),
    status: 'active'
  };
  
  users.push(newUser);
  console.log('✅ New user registered:', { email, name: newUser.name });
  
  res.json({ status: 'success', message: 'Account created successfully' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.json({ status: 'error', message: 'Email and password are required' });
  }
  
  // Find user
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.json({ status: 'error', message: 'Invalid email or password' });
  }
  
  console.log('✅ User logged in:', email);
  res.json({ 
    status: 'success', 
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// Enhanced contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message, rating } = req.body;

  try {
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
    if (emailConfigured) {
      try {
        const emailModule = require('./src/config/email');
        
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
        await emailModule.sendEmail(
          process.env.EMAIL_USER, // Send to your own email
          `New Contact Form: ${newContact.subject} - ${newContact.name}`,
          adminEmailHtml
        );
        
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
        await emailModule.sendEmail(
          newContact.email,
          'Thank you for contacting Coding Edge!',
          customerEmailHtml
        );
        
        console.log(`✅ Customer confirmation email sent successfully to ${newContact.email}`);
        console.log('📧 Contact form emails sent successfully');
        
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        // Don't fail the entire request if email fails
      }
    } else {
      console.log('📧 Email not configured - contact form saved without sending emails');
    }
    
    res.json({
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
});

// Legacy contact form endpoint (for backward compatibility)
app.post('/submit-form', async (req, res) => {
  // Redirect to new API endpoint
  return app._router.handle({ ...req, url: '/api/contact', method: 'POST' }, res);
});

// Get all contact submissions (for admin purposes)
app.get('/api/contact-submissions', (req, res) => {
  res.json({
    success: true,
    submissions: contactSubmissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    total: contactSubmissions.length
  });
});

// Get all users (for admin purposes)
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    users: users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      status: user.status
    })),
    total: users.length
  });
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'Contact.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'About.html'));
});

app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'courses.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'FAQs.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'Support.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'Blog.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve static files for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📧 Email configured: ${emailConfigured ? 'Yes' : 'No'}`);
    console.log('💾 Using in-memory storage (no database)');
    
    if (process.env.NODE_ENV === 'production') {
      console.log('🎯 Production mode - Server ready for deployment');
    } else {
      console.log('🔧 Development mode - Local development server');
      console.log(`📱 Visit: http://localhost:${PORT}`);
    }
  });
}

// Export for Vercel
module.exports = app;