const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage for demo (replace with database in production)
const users = [];
const contactSubmissions = [];

// API Routes
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.json({ status: 'error', message: 'Email and password are required' });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.json({ status: 'error', message: 'User already exists' });
    }
    
    // Add new user
    users.push({ email, password });
    res.json({ status: 'success', message: 'Account created successfully' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.json({ status: 'error', message: 'Email and password are required' });
    }
    
    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.json({ status: 'error', message: 'Invalid email or password' });
    }
    
    res.json({ status: 'success', message: 'Login successful' });
});

// Contact form submission endpoint
app.post('/submit-form', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    
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
    
    // Create contact submission object
    const submission = {
        id: Date.now(),
        name,
        email,
        phone: phone || null,
        subject,
        message,
        timestamp: new Date().toISOString(),
        status: 'new'
    };
    
    // Store submission (in production, save to database)
    contactSubmissions.push(submission);
    
    // Log to console for development
    console.log('\n=== NEW CONTACT FORM SUBMISSION ===');
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || 'Not provided'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('=====================================\n');
    
    // In production, you would send an email here
    // For now, we'll just simulate email sending
    try {
        // Simulate email sending delay
        setTimeout(() => {
            console.log(`📧 Email notification sent for submission from ${name} (${email})`);
        }, 100);
        
        res.json({ 
            success: true, 
            message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
            submissionId: submission.id
        });
        
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'There was an error processing your request. Please try again later.' 
        });
    }
});

// Get all contact submissions (for admin purposes)
app.get('/api/contact-submissions', (req, res) => {
    res.json({
        success: true,
        submissions: contactSubmissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    });
});

// Get contact submission by ID
app.get('/api/contact-submissions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const submission = contactSubmissions.find(sub => sub.id === id);
    
    if (!submission) {
        return res.status(404).json({
            success: false,
            message: 'Submission not found'
        });
    }
    
    res.json({
        success: true,
        submission
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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Contact form submissions will be logged to console');
        console.log('Visit http://localhost:3000/api/contact-submissions to view all submissions');
    });
}

// Export for Vercel
module.exports = app;