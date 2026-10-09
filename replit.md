# BirdOS

## Run on Replit

Use the **Start application** workflow (or the Run button).
It runs `node server.js` and serves the existing app at `0.0.0.0:5000`.
No dependency installation, build step, or secrets are required.

## Project

The imported app uses plain HTML, CSS, and JavaScript:
`index.html`, `styles.css`, and `app.js`. Its structure and UI are unchanged.
`server.js` serves only these public files, disables caching in preview, and
does not expose other workspace files.

The app contains seeded demonstration data, not a connected hotel backend.
Browser preferences use local storage. Google Fonts, CDN-hosted Three.js,
and the existing external image service need network access.
