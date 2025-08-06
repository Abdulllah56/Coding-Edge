# Coding Edge Website

A professional coding education platform with contact form email functionality.

## Features

- Professional website design with multiple pages
- Contact form with email notifications
- Responsive design for all devices
- Modern UI with animations and effects
- Email integration using Gmail SMTP

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Gmail account with App Password enabled

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - The `.env` file is already configured with your email credentials
   - For security, consider using environment variables in production

3. **Start the Server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the Website**
   - Open your browser and go to `http://localhost:3000`
   - The contact form will be fully functional

### Email Configuration

The email system is configured to:
- Send contact form submissions to: `muhammadabdullahbaig3750@gmail.com`
- Send auto-reply confirmations to users
- Use Gmail SMTP with your app password: `ytni oatr rlwu sxgq`

### Deployment

#### For Heroku:

1. **Install Heroku CLI**
2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set EMAIL_USER=muhammadabdullahbaig3750@gmail.com
   heroku config:set EMAIL_PASS="ytni oatr rlwu sxgq"
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### For Vercel:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - `NODE_ENV=production`
   - `EMAIL_USER=muhammadabdullahbaig3750@gmail.com`
   - `EMAIL_PASS=ytni oatr rlwu sxgq`

#### For Netlify:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the build folder to Netlify
   - Or connect your GitHub repository

3. **Set Environment Variables in Netlify Dashboard**

### File Structure

```
├── server.js              # Main server file with email functionality
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (keep secure)
├── .gitignore            # Git ignore file
├── index.html            # Homepage
├── Contact.html          # Contact page with form
├── FAQs.html             # FAQ page
├── Support.html          # Support/donation page
├── About.html            # About page
├── Blog.html             # Blog page
├── courses.html          # Courses page
├── index.css             # Main stylesheet
└── Images/               # Image assets
```

### Email Features

1. **Contact Form Submission**
   - Validates all required fields
   - Sends formatted email to your Gmail
   - Includes all form data with professional styling

2. **Auto-Reply System**
   - Sends confirmation email to the user
   - Professional branded email template
   - Includes submission summary

3. **Email Templates**
   - HTML formatted emails with your branding
   - Responsive email design
   - Professional styling with gradients and colors

### Security Notes

- App passwords are more secure than regular passwords
- Environment variables protect sensitive data
- Form validation prevents spam and invalid submissions
- CORS enabled for cross-origin requests

### Troubleshooting

1. **Email not sending:**
   - Check Gmail app password is correct
   - Ensure 2FA is enabled on Gmail account
   - Verify internet connection

2. **Form not submitting:**
   - Check browser console for errors
   - Verify server is running on correct port
   - Check network requests in browser dev tools

3. **Deployment issues:**
   - Ensure environment variables are set correctly
   - Check deployment platform logs
   - Verify all dependencies are installed

### Support

For any issues or questions, contact: muhammadabdullahbaig3750@gmail.com

## License

MIT License - feel free to use and modify as needed.