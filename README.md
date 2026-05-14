# RentEase Project

Industry-style furniture and appliance rental platform with React frontend, Express/MongoDB backend, protected auth, cart, checkout, order dashboard, and Razorpay payment verification.

## Live Demo

Deployment-ready configs are included for:

- Vercel frontend: `Rentease-Project/rentease-frontend`
- Render backend: `render.yaml`
- Railway backend: `Rentease-Project/rentease-backend/railway.toml`

Live production URLs should be added to [Rentease-Project/LIVE_DEMO.md](Rentease-Project/LIVE_DEMO.md) after connecting Vercel and Render/Railway accounts.

## Local Start

Backend:

```powershell
cd Rentease-Project\rentease-backend
npm install
$env:PORT="5001"
$env:CLIENT_URL="http://localhost:3000"
npm start
```

Frontend:

```powershell
cd Rentease-Project\rentease-frontend
npm install
$env:REACT_APP_API_URL="http://localhost:5001/api"
npm start
```

## Deployment

See [Rentease-Project/DEPLOYMENT.md](Rentease-Project/DEPLOYMENT.md) for Vercel, Render, and Railway setup.
