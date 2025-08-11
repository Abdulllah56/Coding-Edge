# Coding Edge - Contact Form Backend

A simple Node.js backend for the Coding Edge website with email functionality for contact forms.

## Features

- ✅ **Contact Form Email**: Sends contact form submissions to your email
- ✅ **Email Confirmations**: Sends confirmation emails to users
- ✅ **User Authentication**: Basic signup and login functionality
- ✅ **Deployment Ready**: Configured for Vercel deployment
- ✅ **No Database Required**: Uses in-memory storage

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > App Passwords
3. Generate an app password for "Mail"
4. The app password is already configured in your .env file

### 3. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## How It Works

When someone submits the contact form:

1. **Admin Notification**: You receive an email at `muhammadabdullahbaig3750@gmail.com` with the contact details
2. **User Confirmation**: The user receives a confirmation email thanking them for contacting you

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form (sends emails)
- `POST /submit-form` - Legacy endpoint (redirects to /api/contact)

### Admin
- `GET /api/contact-submissions` - View all contact submissions
- `GET /health` - Health check endpoint
- `GET /api/config-check` - Check server configuration

### Authentication (Optional)
- `POST /api/signup` - User registration
- `POST /api/login` - User login

## Contact Form Fields

Required fields:
- `name` - User's name
- `email` - User's email
- `subject` - Message subject
- `message` - Message content

Optional fields:
- `phone` - User's phone number
- `rating` - Rating (1-5 stars)

## Deployment to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - `EMAIL_USER`: muhammadabdullahbaig3750@gmail.com
   - `EMAIL_PASS`: ytni oatr rlwu sxgq
   - `NODE_ENV`: production
   - `FRONTEND_URL`: https://your-vercel-domain.vercel.app

## Testing

### Test the contact form:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### Check server health:
```bash
curl http://localhost:3000/health
```

## File Structure

```
├── server.js                 # Main server file
├── src/
│   └── config/
│       └── email.js          # Email configuration
├── .env                      # Development environment
├── .env.local               # Production environment
├── vercel.json              # Vercel deployment config
└── package.json             # Dependencies
```

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `EMAIL_USER` | muhammadabdullahbaig3750@gmail.com | Gmail address for sending emails |
| `EMAIL_PASS` | ytni oatr rlwu sxgq | Gmail app password |
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development/production | Environment mode |

## Troubleshooting

### Email Not Working?
1. Check if Gmail 2FA is enabled
2. Verify the app password is correct
3. Check the server logs for error messages

### Deployment Issues?
1. Ensure environment variables are set in Vercel
2. Check the health endpoint: `https://your-domain.vercel.app/health`
3. Review deployment logs in Vercel dashboard

## Support

The backend is now configured to:
- Receive contact form submissions via email
- Send confirmation emails to users
- Work both locally and on deployment platforms
- Handle CORS for frontend integration

Your contact forms will be sent to: **muhammadabdullahbaig3750@gmail.com**