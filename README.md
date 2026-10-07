# Aurelia Boutique Hotel: Setup Guide
Plain HTML + CSS + a little JavaScript. No build step, no server, no frameworks.

## Files
- `index.html` Home · `rooms.html` Rooms, amenities, rates · `gallery.html` Gallery · `contact.html` Contact and booking form
- `assets/js/main.js` **settings at the top**: hotel name, WhatsApp number, email, slideshow speed
- `assets/css/style.css` all styling. Change colours in the `:root` block at the top.
- `assets/images/` photos (currently labelled placeholders)

## Everyday edits
- **Name, WhatsApp, email**: edit `CONFIG` in `main.js`; every button and link updates. Also change the name in the page `<title>` lines and the footer text.
- **Text**: open a page in any text editor and edit the words between tags.
- **Photos**: put your photo in `assets/images/`, then change the file name in the `<img src>` and write a short `alt` description. Each placeholder is labelled with the photo it expects.
- **Photo prep**: export as WebP, max 1600px wide, under 200 KB (free at squoosh.app). Keep the `width`/`height` attributes in the same ratio as the photo.
- **Free photos**: Unsplash, Pexels and Pixabay allow free commercial use. Check each photo's licence, and use real photos of your own rooms where you can so guests get what they see.
- **Hero slideshow**: in `index.html` find class `slide`; add or remove lines.
- **Add a room**: copy one `<article class="split room">` block in `rooms.html` (a comment marks it).
- **Add a gallery photo**: copy one `<button class="gal-item">` in `gallery.html`.
- **Prices**: edit the Rates table in `rooms.html`; update "From ₹..." on the room cards too.
- **Map**: Google Maps > Share > Embed a map > paste the `src` into the iframe in `contact.html`.
- **Domain/SEO**: replace `www.example.com` in each page's `<head>`, and fill in the address in `index.html`'s JSON-LD block.

## How booking works
The check-in / check-out / guests bar and the contact form open WhatsApp (or your email app) with a ready-written message. Availability is confirmed by you, by reply. No data is stored.

## Publish
Upload the whole folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, or normal hosting).
