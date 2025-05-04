const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// In-memory storage for users and contact form submissions
const users = [];
const contactSubmissions = [];

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.static('./')); // Serve static files from the current directory

// Contact form submission
app.post('/submit-form', (req, res) => {
    const { name, email, description, message, phone } = req.body;
    console.log(`Received message from ${name} from email ${email}`);
    console.log(`Description: ${description}`);
    console.log(`Concern: ${message}`);
    console.log(`Phone: ${phone || 'Not provided'}`);
    
    // Store the submission
    const newSubmission = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        description,
        message,
        timestamp: new Date().toISOString()
    };
    
    contactSubmissions.push(newSubmission);
    console.log('Contact form submissions:', contactSubmissions);
    
    res.json({ status: 'success', message: 'Form submitted successfully!' });
});

// User Registration
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ status: 'error', message: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    console.log(`New user registered: ${email}`);
    console.log('Users:', users);
    
    res.json({ status: 'success', message: 'Account created successfully!' });
});

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Find user by email and check password
    const user = users.find(user => user.email === email);
    
    if (!user || user.password !== password) {
        return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }
    
    console.log(`User logged in: ${email}`);
    
    res.json({ status: 'success', message: 'Login successful', user: { id: user.id, email: user.email } });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});