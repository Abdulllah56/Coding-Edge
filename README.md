# Coding Edge Website

A modern, responsive website for coding education with full-stack functionality.

## Features

- **Responsive Design**: Works on all devices
- **User Authentication**: Login/Signup functionality
- **Contact Form**: Fully functional contact form with backend processing
- **Testimonial Carousel**: Interactive testimonial slider
- **Admin Panel**: View contact form submissions
- **Dual Environment Support**: Works locally and on Vercel

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   Or double-click `start-server.bat` on Windows

3. Open your browser and visit:
   - Main website: http://localhost:3000
   - Admin panel: http://localhost:3000/admin.html

### How it works locally:

1. **With Node.js server (localhost:3000)**:
   - Full functionality including contact form
   - Login/Signup works
   - Contact submissions are logged to console
   - Admin panel shows all submissions

2. **With Live Server (127.0.0.1:5503)**:
   - Static website works perfectly
   - Contact form will show success message but won't actually send emails
   - Login/Signup will show fallback messages

## Production Deployment (Vercel)

### Deploy to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Environment Variables (Optional):
For production email functionality, add these to Vercel:
- `EMAIL_SERVICE`: Your email service (e.g., 'gmail')
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email password/app password

## File Structure

```
├── server.js              # Express server
├── package.json           # Dependencies
├── vercel.json            # Vercel configuration
├── index.html             # Homepage
├── Contact.html           # Contact page
├── admin.html             # Admin panel
├── start-server.bat       # Windows server starter
└── README.md              # This file
```

## API Endpoints

- `POST /login` - User login
- `POST /signup` - User registration
- `POST /submit-form` - Contact form submission
- `GET /api/contact-submissions` - Get all contact submissions (admin)
- `GET /api/health` - Health check

## Contact Form

The contact form automatically detects the environment:
- **Local development**: Sends to http://localhost:3000/submit-form
- **Production**: Uses relative URLs for the deployed domain
- **Live Server**: Shows success message with fallback

## Admin Panel

Visit `/admin.html` to view contact form submissions:
- Real-time updates every 30 seconds
- Shows all submission details
- Works in both local and production environments

## Troubleshooting

### Contact form not working:
1. Make sure the Node.js server is running on port 3000
2. Check the browser console for errors
3. Verify the server logs for submission details

### Server won't start:
1. Run `npm install` to install dependencies
2. Check if port 3000 is already in use
3. Try running `node server.js` directly

### Vercel deployment issues:
1. Make sure all files are committed to git
2. Check Vercel function logs for errors
3. Verify vercel.json configuration

## Support

For issues or questions, contact: muhammadabdullahbaig3750@gmail.com