// Vercel serverless function for user signup
// In-memory storage for demo (in production, use a database)
let users = [];

module.exports = async function handler(req, res) {
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
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }
    
    // Check if user already exists (in production, this would query a database)
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ status: 'error', message: 'User already exists' });
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
    
    res.status(201).json({ status: 'success', message: 'Account created successfully' });
  } catch (error) {
    console.error('❌ Error during signup:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error',
      error: error.message 
    });
  }
}