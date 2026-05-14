# RentEase Deployment Guide

## Local setup

1. Backend:

```bash
cd rentease-backend
copy .env.example .env
npm install
npm start
```

2. Frontend:

```bash
cd rentease-frontend
copy .env.example .env
npm install
npm start
```

If another local service already uses port `5000`, start the backend on `5001` and point the frontend to it:

```bash
cd rentease-backend
$env:PORT="5001"
npm start

cd ../rentease-frontend
$env:REACT_APP_API_URL="http://localhost:5001/api"
npm start
```

## Production environment

Set these backend variables on Render, Railway, or another Node host:

```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-long-random-secret
RAZORPAY_KEY_ID=rzp_live_or_test_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Set these frontend variables on Vercel or Netlify:

```bash
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_RAZORPAY_KEY_ID=rzp_live_or_test_key
```

## Recommended hosting split

- Frontend: Vercel or Netlify, build command `npm run build`, publish directory `build`.
- Backend: Render or Railway, start command `npm start`.
- Database: MongoDB Atlas.
- After deployment, update `CLIENT_URL` on the backend to the exact frontend domain and update `REACT_APP_API_URL` on the frontend to the backend `/api` URL.
- Keep `RAZORPAY_KEY_SECRET` only on the backend. The frontend should only receive `REACT_APP_RAZORPAY_KEY_ID`; payment success is verified by `/api/payments/verify` before an order is saved.

## Vercel frontend

Import this GitHub repo into Vercel and set:

```bash
Root Directory: Rentease-Project/rentease-frontend
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
```

The frontend includes `vercel.json` for production SPA rewrites.

## Render backend

Render can use the root `render.yaml` Blueprint in this repo.

Set these secret values in the Render dashboard:

```bash
CLIENT_URL=https://your-vercel-domain
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-long-random-secret
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Railway backend

Create a Railway service from the GitHub repo and set the service root directory to:

```bash
Rentease-Project/rentease-backend
```

Railway will read `railway.toml` from that backend folder. Add the same backend environment variables listed above.

## Add links

After the first successful deployments, paste the production URLs into `LIVE_DEMO.md` and your GitHub README.
