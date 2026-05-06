# Santorini Lia Soleil — Website

## Quick Start (Local Preview)

1. Make sure you have [Node.js](https://nodejs.org/) installed (v18+)
2. Open a terminal in this folder
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Deploy to Vercel (Free Plan)

### Option A: GitHub + Vercel (Recommended)

1. Create a GitHub account if you don't have one: https://github.com
2. Install Git: https://git-scm.com/downloads
3. Create a new repository on GitHub (name it `santorini-lia-soleil`)
4. In your terminal, inside this project folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/santorini-lia-soleil.git
   git push -u origin main
   ```
5. Go to https://vercel.com and sign up with your GitHub account
6. Click "Add New Project"
7. Import your `santorini-lia-soleil` repository
8. Vercel auto-detects Vite — just click "Deploy"
9. Your site will be live at `santorini-lia-soleil.vercel.app`

### Option B: Direct Upload via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. In this folder, run: `vercel`
3. Follow the prompts (sign in, confirm settings)
4. Done — you'll get a live URL

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your domain (e.g., `santoriniliasoleil.com`)
3. Update your domain's DNS to point to Vercel (they'll show you exactly what to set)

## Adding / Swapping Photos

Your photos are in `public/images/`. To add or replace:

1. Drop your new photo into `public/images/`
2. In `src/App.jsx`, find the placeholder `<PH>` components
3. Replace them with: `<img src="/images/your-photo.jpg" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 3 }} />`

### Current photos included:
- `hero.jpg` — Pool with building and palm tree (hero background)
- `pool.jpg` — Pool close-up portrait
- `rhodes.jpg` — Rhodes suite full room
- `hydra-wide.jpg` — Hydra suite wide shot
- `hydra-living.jpg` — Hydra living/dining area
- `hydra-window.jpg` — Hydra window detail
- `hydra-corner.jpg` — Hydra corner with chair
- `rhodes-living.jpg` — Rhodes living area
- `logo.png` — Transparent sunburst logo

### Still needed:
- Asteria (1BR) photos
- Mykonos (2BR) photos
- Additional gallery/amenity photos

## Updating Links

In `src/App.jsx`, search for `href="#"` to find all placeholder links that need real URLs:
- Airbnb listing URLs (one per suite)
- Facebook Messenger link
- Facebook page
- Instagram
- TikTok

## Form Submissions

The inquiry form currently shows a confirmation message but doesn't send anywhere. To receive submissions:

1. Sign up at https://formspree.io (free tier: 50 submissions/month)
2. Create a new form, get your form ID
3. In App.jsx, change the form's submit button to post to Formspree:
   ```
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## Tech Stack
- React 18
- Vite 5
- Deployed on Vercel
- Fonts: IM Fell English + DM Sans (Google Fonts)
