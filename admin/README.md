# LeadGenBooster Admin

This folder contains the admin dashboard and management workspace for LeadGenBooster.

The application uses React 19, Vite, React Router, Tailwind CSS, Framer Motion, Lucide React, and React Quill.

## Main areas

- Dashboard
- Blog management
- Career and job posting management
- Job application review
- Quotation management
- Meeting management
- Newsletter subscriber management

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` to the backend API origin in the local environment file.

## Build and lint

```bash
npm run build
npm run lint
```

The public website and Express API are in sibling directories. See the [repository README](../README.md) for the complete setup.
