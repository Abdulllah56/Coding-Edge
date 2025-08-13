// Vercel serverless function to get contact submissions
// In-memory storage for demo (in production, use a database)
let contactSubmissions = [];

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

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    res.status(200).json({
      success: true,
      submissions: contactSubmissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      total: contactSubmissions.length
    });
  } catch (error) {
    console.error('❌ Error fetching contact submissions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
}