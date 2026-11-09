# LeadGenBooster

LeadGenBooster is a company website and lead-management platform. The repository contains a public-facing website, a separate admin workspace, and an Express API backed by MongoDB.

The public application handles enquiries and lead capture. The admin workspace provides management screens for quotations, meetings, job applications, careers, blogs, and newsletter subscribers.

Website: https://leadgen-booster.com

## Repository structure

| Directory | Purpose | Main technologies |
| --- | --- | --- |
| `frontend/` | Public website and lead capture flows | React 19, Vite, Tailwind CSS |
| `admin/` | Admin dashboard and management screens | React 19, Vite, Tailwind CSS |
| `backend/` | API, authentication, email, file upload, and persistence | Node.js, Express 5, MongoDB, Mongoose |

## Public website

The public site includes:

- Company information, services, industries, and case studies
- Blog listing and article pages
- Careers listing and career detail pages
- Job application submission with CV upload
- Quotation request form
- Meeting request and available time-slot lookup
- Newsletter subscription and confirmation flows
- Contact and enquiry sections

## Admin workspace

The admin application includes screens for:

- Dashboard overview
- Blog creation and content management
- Career and job posting management
- Job application review and application details
- Quotation review and quotation details
- Meeting management
- Newsletter subscriber management

## API capabilities

The Express API exposes route groups for:

- Authentication
- Blogs
- Careers and job postings
- Applications and CV uploads
- Quotations
- Meeting availability and booking
- Newsletter subscriptions
- File uploads

The API uses MongoDB through Mongoose. CV files are uploaded to Cloudinary. Email workflows are handled through the backend mail utility.

## Technology

**Frontend and admin**
- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Framer Motion
- Lucide React
- React Quill in the admin application

**Backend**
- Node.js
- Express 5
- MongoDB and Mongoose
- JWT authentication
- bcryptjs
- cookie-parser
- Helmet
- express-rate-limit
- Cloudinary
- Nodemailer

## Local development

Use three terminals to run the API, public website, and admin workspace.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set the MongoDB URI, JWT secret, CORS origin, and admin seed password in `backend/.env`. Then create the initial admin account and start the API:

```bash
npm run seed
npm run dev
```

The API defaults to port `5000`.

### 2. Public website

```bash
cd frontend
npm install
npm run dev
```

### 3. Admin workspace

```bash
cd admin
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` to the backend API origin in the admin environment file.

## Available scripts

| Application | Command | Purpose |
| --- | --- | --- |
| Backend | `npm run dev` | Start the API with nodemon |
| Backend | `npm start` | Start the API |
| Backend | `npm run seed` | Create the initial admin account |
| Frontend | `npm run dev` | Start the public website |
| Frontend | `npm run build` | Build the public website |
| Frontend | `npm run lint` | Run ESLint |
| Admin | `npm run dev` | Start the admin workspace |
| Admin | `npm run build` | Build the admin workspace |
| Admin | `npm run lint` | Run ESLint |

## Configuration

The backend environment template is in `backend/.env.example`. The admin API URL template is in `admin/.env.example`.

Keep MongoDB credentials, JWT secrets, mail credentials, Cloudinary credentials, and the initial admin password in environment variables. Never commit populated `.env` files.
