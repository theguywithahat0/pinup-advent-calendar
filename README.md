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

## Minimal calendar reminders
The page shows **Set a daily reminder** with direct Google, Apple and Outlook buttons using their recognizable calendar brand icons, without an internal chooser. Google opens a recurring event for December 1–24 at 9 a.m. local time (visitor saves it); Apple opens a `webcal:` subscription in a compatible Calendar app. Outlook opens Add Calendar and attempts to copy the iCal feed URL; visitors paste it under **Subscribe from web**. Outlook's website cannot reliably create the recurring series in one click without authorizing account access. The public `.ics` file is still needed for Apple and Outlook subscription. Browser/calendar alert permissions are up to visitors. No visitor data is collected.

## AI transparency and functional storage
The website identifies the images as AI-generated artistic tributes, both in the calendar footer and in each artwork reveal.

The website uses only one first-party localStorage entry (`pinup-advent-opened-2026`) to remember opened door numbers in each visitor's own browser. It is not sent to the website owner; the site has no visitor analytics, advertising trackers, accounts, or signup forms. Visitors can remove this information by clearing the site's storage in browser settings. No reset button or cookie banner is included.

The homepage no longer displays a separate storage notice; the functional storage explanation lives on the French legal-notices page.

The website is hosted by GitHub Pages and loads Google Fonts and calendar icon images from external services, which can process request information such as IP addresses. Separately assess any French site publisher/host legal notice obligations before public launch. Adding new analytics or tracking services would require reviewing privacy and cookie requirements.

## Mentions légales
The calendar has a linked French `mentions-legales.html` page describing the art project, AI illustration provenance, GitHub Pages hosting, and functional browser storage. The homepage no longer displays the opened-door storage notice. For non-professional publishing, anonymity under French LCEN article 1-1 II is conditional on the host holding the publisher's identifying details. The owner should confirm that condition. GitHub's public business address and main switchboard phone are listed; it is not a support number.
