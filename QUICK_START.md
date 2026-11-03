# ⚡ QUICK START - Admin Panel Login

## 📦 Your MongoDB Atlas is Ready!

Your `.env` file already has the MongoDB Atlas connection configured.

## 🎯 Run These 3 Commands

**Terminal 1 - Create Admin User:**

```bash
cd backend
npm run seed
```

**Terminal 2 - Start Backend API:**

```bash
cd backend
npm run dev
```

**Terminal 3 - Start Admin Panel:**

```bash
cd admin
npm run dev
```

## 🔓 Login Credentials

```
Email:    admin@leadgenbooster.ca
Password: set ADMIN_PASSWORD in the backend environment before seeding
```

Go to: `http://localhost:5174`

## ✅ What Just Happened

1. ✓ Default admin user created in MongoDB Atlas
2. ✓ Backend API running with JWT authentication
3. ✓ Admin panel running with secure login
4. ✓ Auto token refresh every 55 minutes
5. ✓ Rate limiting & security headers active

## 📝 API is Ready

All endpoints are secured with JWT tokens:

```
POST   /api/auth/login      - Get access token
POST   /api/auth/refresh    - Refresh token before expiry
POST   /api/auth/logout     - Clear session
GET    /api/auth/me         - Get admin profile
GET    /api/health          - API health check
```

## 🚨 If Something Doesn't Work

1. **Can't login?**
   - Check backend is running (`npm run dev` in backend folder)
   - Check MongoDB Atlas connection (`npm run seed` output)
   - Check no errors in browser console (F12)

2. **"Admin doesn't exist" error?**
   - Run `npm run seed` again in backend folder

3. **"CORS error"?**
   - Backend must be running on port 5000
   - Check admin on port 5174

4. **Blank page after login?**
   - Hard refresh: Ctrl+Shift+R
   - Restart: `npm run dev`

## 📱 Admin Pages Available

- Dashboard (overview)
- Blogs (article management)
- Careers (job postings)
- Meetings (scheduling)
- Quotations (invoices)
- Newsletter (subscribers)

---

**All set! Your admin panel is live and secured.** 🎉
