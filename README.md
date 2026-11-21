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

## Optional daily calendar reminders
The **Remind me every morning** button downloads `pinup-reminders-2026.ics`, containing 24 individual events, December 1–24, 2026, at **9:00 AM local time**. Each event links to the site and requests a popup reminder. People import the `.ics` in their calendar; actual alert behavior varies by calendar app and notification settings. Google Calendar users can import it through Settings → Import & export. No email collection or accounts are involved.

## Direct calendar reminders (no download on the website)
The **Remind me every morning** button now opens provider options:
- **Google Calendar**: opens a prefilled repeating event, December 1–24 at 9:00 a.m. in the visitor's local time zone, using `recur=RRULE:FREQ=DAILY;COUNT=24`. The visitor reviews and saves it, and should check alert settings.
- **Apple Calendar / Outlook desktop**: opens the existing public `webcal://` subscription feed in a compatible calendar app, which may request confirmation. Alert support depends on the app.
- **Outlook.com / Microsoft 365 on the web**: opens the calendar's Add calendar page, copies the public calendar feed URL to the clipboard, and shows instructions for **Subscribe from web**. Microsoft does not provide a reliable public one-click URL to add all 24 repeating events to a user calendar without an account authorization flow; this avoids the download but requires pasting the link.

The public `.ics` feed remains in the repository so Apple and Outlook can subscribe. No visitor personal data is collected. Website code cannot force browser or calendar notification permissions.
