# Coding Edge Website

A modern educational website with static frontend and serverless backend functionality.

## Architecture

This project uses a **hybrid approach**:
- **Frontend**: Static HTML, CSS, and JavaScript files
- **Backend**: Vercel serverless functions for API endpoints
- **Deployment**: Vercel (static hosting + serverless functions)

## Features

- ✅ Contact form with email notifications
- ✅ User authentication (signup/login)
- ✅ Admin panel for viewing submissions
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ SEO optimized

## Project Structure

```
├── api/                    # Serverless functions
│   ├── contact.js         # Contact form handler
│   ├── login.js           # User login
│   ├── signup.js          # User registration
│   ├── contact-submissions.js  # Get contact submissions
│   └── users.js           # Get users list
├── Images/                # Static images
├── src/                   # Additional source files
├── *.html                 # Static HTML pages
├── *.css                  # Stylesheets
├── *.js                   # Client-side JavaScript
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## Deployment Settings for Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Method 2: Vercel Dashboard

1. **Connect Repository**: Link your GitHub/GitLab repository to Vercel

2. **Build Settings**:
   - **Framework Preset**: Other
   - **Build Command**: `echo "No build required"`
   - **Output Directory**: `.` (root directory)
   - **Install Command**: `npm install`
   - **Root Directory**: `.` (leave empty)

3. **Environment Variables** (Optional - for email functionality):
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NODE_ENV=production
   ```

### Method 3: Manual Configuration

If using Vercel dashboard, use these settings:

- **Install Command**: `npm install`
- **Build Command**: `echo "Static site with serverless functions"`
- **Output Directory**: `.`
- **Root Directory**: `.`

## Environment Variables

For email functionality, add these environment variables in Vercel:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
```

### Setting up Gmail App Password:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings
3. Security → 2-Step Verification → App passwords
4. Generate an app password for "Mail"
5. Use this password as `EMAIL_PASS`

## API Endpoints

Once deployed, your API endpoints will be available at:

- `POST /api/contact` - Submit contact form
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `GET /api/contact-submissions` - Get contact submissions (admin)
- `GET /api/users` - Get users list (admin)

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run locally with Vercel**:
   ```bash
   npx vercel dev
   ```

3. **Or serve static files**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using Live Server (VS Code extension)
   ```

## Why This Architecture?

### Before (Node.js Server):
- ❌ Required server hosting
- ❌ Server maintenance overhead
- ❌ Scaling issues
- ❌ Higher costs

### After (Static + Serverless):
- ✅ Fast loading (CDN)
- ✅ Auto-scaling
- ✅ Cost-effective
- ✅ No server maintenance
- ✅ Better SEO
- ✅ Global distribution

## File Structure Explanation

- **Static Files**: HTML, CSS, JS, images are served directly from CDN
- **API Functions**: Located in `/api/` folder, run as serverless functions
- **Routing**: Handled by `vercel.json` configuration
- **Database**: Currently uses in-memory storage (upgrade to database for production)

## Production Considerations

For production use, consider:

1. **Database**: Replace in-memory storage with MongoDB, PostgreSQL, or Vercel KV
2. **Authentication**: Implement JWT tokens and proper session management
3. **Rate Limiting**: Add rate limiting to API endpoints
4. **Input Validation**: Enhanced server-side validation
5. **Error Handling**: Comprehensive error logging and monitoring

## Troubleshooting

### Common Issues:

1. **API not working**: Check if serverless functions are deployed correctly
2. **Email not sending**: Verify environment variables are set
3. **CORS errors**: Check API function CORS headers
4. **Form not submitting**: Check network tab for API endpoint errors

### Debug Steps:

1. Check Vercel function logs in dashboard
2. Test API endpoints directly
3. Verify environment variables
4. Check browser console for errors

## Support

For issues or questions:
- Email: support@codingedge.com
- Check Vercel documentation: https://vercel.com/docs

## License

MIT License - see LICENSE file for details.