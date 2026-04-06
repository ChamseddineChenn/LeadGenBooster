# LeadGenBooster Admin Panel - Setup Guide

## 📋 Prerequisites

- Node.js v18+
- MongoDB Atlas account with credentials
- Both frontend and backend running

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create default admin user
npm run seed

# Start development server
npm run dev
```

**Default Admin Credentials:**

- Email: `admin@leadgenbooster.ca`
- Password: `***REMOVED***`

**Backend runs on:** `http://localhost:5000`

### Admin Frontend Setup

```bash
cd admin

# Install dependencies
npm install

# Start development server
npm run dev
```

**Admin panel runs on:** `http://localhost:5174`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Clear session
- `GET /api/auth/me` - Get current admin profile

## 🔐 Security Features

✅ Helmet.js - HTTP security headers  
✅ Rate limiting - Prevent brute force attacks  
✅ CORS validation - Origin control  
✅ JWT tokens - Secure stateless auth  
✅ Access token expiry - 1 hour default  
✅ Refresh tokens - 7 day long-lived  
✅ httpOnly cookies - XSS protection  
✅ Auto token refresh - 5 min before expiry  
✅ bcryptjs password hashing - Safe storage

## 🔄 Login Flow

1. User enters credentials on Login page
2. Frontend sends `POST /api/auth/login`
3. Backend validates credentials, returns access token
4. Refresh token stored in httpOnly cookie
5. Frontend stores access token in memory
6. Auto-refresh 5 min before expiry
7. Access granted to admin pages
8. Logout clears tokens and cookies

## 📁 Project Structure

```
admin/
├── src/
│   ├── pages/
│   │   ├── Login.jsx              // Login form with credentials helper
│   │   ├── Dashboard.jsx          // Admin dashboard
│   │   ├── AdminBlogs.jsx         // Blog management
│   │   ├── AdminCareers.jsx       // Job postings
│   │   ├── AdminMeetings.jsx      // Meeting tracker
│   │   ├── AdminQuotations.jsx    // Quote management
│   │   └── AdminNewsletter.jsx    // Subscriber management
│   ├── components/
│   │   ├── AdminLayout.jsx        // Layout wrapper
│   │   └── AdminSidebar.jsx       // Navigation sidebar
│   ├── context/
│   │   ├── authContext.js         // Auth context creation
│   │   ├── AuthContext.jsx        // AuthProvider component
│   │   └── useAuth.js             // useAuth hook
│   ├── assets/
│   │   └── assets.js              // Logo imports
│   ├── App.jsx                    // Router with protected routes
│   ├── main.jsx                   // App entry point
│   └── index.css                  // Tailwind styles
├── .env                           // Environment config
└── vite.config.js                 // Vite configuration

backend/
├── routes/
│   └── auth.js                    // Auth endpoints
├── middleware/
│   └── auth.js                    // JWT verification
├── models/
│   ├── User.js                    // Base User schema
│   └── Admin.js                   // Admin discriminator
├── config/
│   └── db.js                      // MongoDB connection
├── scripts/
│   └── seed.js                    // Create default admin
├── server.js                      // Express app
├── .env                           // Environment config
└── package.json                   // Dependencies
```

## 🐛 Troubleshooting

### "Cannot find module '/admin/src/context/authContext.js'"

- Clear browser cache
- Restart `npm run dev`

### "CORS error"

- Ensure `CORS_ORIGIN` in backend `.env` matches admin URL
- Check backend is running on port 5000

### "MongoDB connection failed"

- Verify Atlas connection string in `.env`
- Check IP whitelist on Atlas cluster
- Ensure network access from your machine

### "Seed script not creating admin"

- Check MongoDB is connected
- Run `npm run seed` directly
- Check admin doesn't already exist

## 🎯 Next Steps

1. ✅ Configure MongoDB Atlas URI (done!)
2. ✅ Run seed script to create default admin
3. ✅ Start backend: `npm run dev`
4. ✅ Start admin: `npm run dev`
5. ✅ Login with default credentials
6. 📝 Build admin features for managing:
   - Blogs & Articles
   - Career Postings
   - Meeting Bookings
   - Quotations
   - Newsletter Subscribers

---

**LeadGenBooster Admin Panel** | Secure • Scalable • Professional
