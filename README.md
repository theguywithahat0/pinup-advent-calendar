# A Very Pin-Up Christmas — Advent 2026

A free, single-page, vintage-themed Advent calendar for GitHub Pages. No build, backend, account, cookie tracking or dependency installation.

## Publish on GitHub Pages
In this repository choose **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root)**, then Save.

The site will appear at: https://theguywithahat0.github.io/pinup-advent-calendar/

## Add your 24 illustrations
1. Create a folder named `images`.
2. Upload all 24 pictures, named `day-01.webp`, `day-02.webp`, ... `day-24.webp`.
3. Images are best exported as WebP at 1200–1600 pixels width for fast mobile loading.
4. If you use JPEG instead, change `EXTENSION = 'webp'` to `EXTENSION = 'jpg'` near the top of `script.js`.

Missing images show a decorative 'surprise is being prepared' placeholder.

## Unlock behavior
Doors 1–24 become available at midnight **Europe/Paris** on December 1–24, 2026. Past days remain available; the visitor's opened-door state is stored only in their own browser. Future dates are not made available by merely changing a device's time zone.

**Note:** GitHub Pages hosts static files, so uploaded future-day artwork is publicly inspectable by anyone who knows the file paths. The interface prevents casual early viewing but is not a secure embargo.

## Files
- `index.html` — page structure and modal artwork viewer
- `style.css` — responsive vintage styling, door appearance and opening states
- `script.js` — day metadata, door mapping and unlock logic
- `images/` — your 24 paintings (you add these)

The site has no external scripts. Google Fonts are optional visual enhancements; browser fallbacks work without them.

## Test the doors before December
Use `?preview=1` on the site URL to simulate December 1, or `?preview=24` to unlock all 24 doors for testing. Any value from 1 through 24 works, so `?preview=7` shows what a visitor can open on December 7.

Remove the `?preview=...` query to return to the genuine Advent timetable. The preview feature is public and should not be treated as access protection for unpublished images.
