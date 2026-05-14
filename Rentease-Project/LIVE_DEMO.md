# RentEase Live Demo Links

Use these links in your resume, portfolio, and LinkedIn once the deployments are connected.

## Recommended Production Setup

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas

## Live Links

| Service | Platform | URL |
| --- | --- | --- |
| Frontend app | Vercel | Add the Vercel production URL here |
| Backend API | Render | Add the Render API URL here |
| Backend API alternate | Railway | Add the Railway API URL here |
| Health check | Render/Railway | `https://your-backend-domain/api/health` |

## Recruiter Demo Checklist

- Open the Vercel app URL.
- Register a test account.
- Browse products and add one item to cart.
- Complete checkout with Razorpay test mode.
- Open Dashboard and My Rentals to show saved rental history.

## Required Environment Variables

Frontend on Vercel:

```bash
REACT_APP_API_URL=https://your-backend-domain/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_or_live_key_id
```

Backend on Render or Railway:

```bash
NODE_ENV=production
CLIENT_URL=https://your-vercel-domain
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-long-random-secret
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```
