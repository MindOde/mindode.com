# Static Landing Page (No Build)

This is a **static HTML package** that mirrors your React/Framer/Tailwind landing page, but without any build step — perfect for Netlify.

## Files
- `index.html` — Tailwind via CDN + semantic HTML
- `script.js` — small scroll-reveal animations + dynamic year
- `netlify.toml` — optional, keeps deploy static
- `_headers` — optional security headers

## Deploy on Netlify (GitHub workflow)
1. Create a new GitHub repo and push these files to the root (no build needed).
2. In Netlify, select **Add new site → Import an existing project** and choose your repo.
3. For **Build command**, leave **empty**.
4. For **Publish directory**, set to `/` (root). Netlify will serve `index.html` as your homepage.

## One‑click drag‑and‑drop (without GitHub)
- Zip the folder and drop it on https://app.netlify.com/drop

## Customize
- Edit text in `index.html` directly.
- Tailwind is loaded via CDN for convenience. For production-heavy sites, consider compiling Tailwind for smaller CSS.

---

Generated 2025-09-22 19:02 .
