# Devorah Art Portfolio

A React-based portfolio site showcasing artwork with a masonry gallery and fullscreen modal viewer.

Live site: [devorah-art.com](https://devorah-art.com)

---

## Tech Stack

- React 18 (Create React App)
- CSS (custom, responsive)
- gh-pages for deployment to GitHub Pages

## Requirements

- Node.js 18+ and npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm start
   ```

   The app runs at `http://localhost:3000`.

## Available Scripts

Defined in `package.json`:

- `npm start` — run locally with hot reload
- `npm run build` — production build to `build/`
- `npm test` — run tests
- `npm run deploy` — publish `build/` to the `gh-pages` branch (see Deployment)

## Deployment (GitHub Pages + Custom Domain)

This repo is configured to deploy to GitHub Pages with a custom domain.

- `homepage` in `package.json` is set to `https://devorah-art.com`
- `public/CNAME` contains `devorah-art.com`
- Scripts:
  - `predeploy`: sets `PUBLIC_URL=https://devorah-art.com` and runs `build`
  - `deploy`: pushes `build/` to the `gh-pages` branch

To deploy:

```bash
npm run predeploy
npm run deploy
```

After the first deployment, ensure the repository is configured in GitHub Pages to serve from the `gh-pages` branch. The CNAME file will keep the custom domain attached.

---

## Content Management

### Add a new artwork

1. Place the image file in:
   - `src/assets/images/art/`
   - Supported extensions: `.jpg`, `.jpeg`, `.png`, `.JPG` (note: case-sensitive)
   - Do not use subfolders inside `art/`
2. Add an entry in `src/data/artworks.json`:

   ```json
   { "file": "my-new-piece.jpg", "title": "My New Piece", "description": "Optional description here.", "size": "m" }
   ```

   - `file` must match the exact filename (including extension and case)
   - `size` controls how large the tile appears in the gallery grid: `s` (small), `m` (medium), `l` (large). If omitted, it defaults to `l`.
   - The order in the JSON file controls the display order
3. Save and refresh. If it doesn’t appear, double-check the filename and JSON validity, and restart the dev server if needed.

Recommended image sizing: ~1600–2200px width, < 2–3MB for faster loads.

### Edit About Me text and photo

- Text: edit `src/assets/text/aboutMe.txt`
- Profile photo shown in About Me: replace `src/assets/images/profile.jpeg`
- Hero background portrait on the landing section is imported in `src/components/ArtPortfolio.jsx` as `profile5.jpg`. Replace the file at `src/assets/images/profile5.jpg` (or update the import) to change it.

### Update contact info (phone, email, Instagram)

Contact links appear in two places:

- Header: `src/components/Header/Header.jsx`
- Contact section at page bottom: `src/components/ArtPortfolio.jsx`

Update the `tel:`, `mailto:`, and Instagram URL in both files to keep them consistent.

### SEO & Meta

- Page title/description/icons: edit `public/index.html`
- App manifest and icons: `public/manifest.json`, `public/logo*.png`
- Robots: `public/robots.txt`

---

## Features

- Masonry-style gallery layout (CSS Grid with size-based tiles)
- Fullscreen modal with:
  - Click to advance when unzoomed
  - Arrow keys (←/→) to navigate
  - Escape to close
  - Mouse wheel to zoom
  - Drag to pan when zoomed
- Subtle reveal-on-scroll animations

---

## Project Structure (key paths)

```text
src/
  components/
    ArtPortfolio.jsx        # Hero, gallery, modal wiring, contact section
    ArtPortfolio.css
    Modal/                  # Fullscreen image viewer
    Header/                 # Top navigation + quick contact
    AboutMe/                # About Me section (text from .txt file)
  data/
    artworks.json           # Artwork metadata (filename, title, description, size)
  assets/
    images/
      art/                  # Artwork images
      profile*.jpg          # Portrait/hero images
    text/
      aboutMe.txt           # About Me copy
```

---

## Troubleshooting

- New image not showing:
  - Verify the filename and extension (including case) matches the entry in `artworks.json`
  - Image must be directly inside `src/assets/images/art/`
  - Ensure `artworks.json` is valid JSON (no trailing commas)
  - Restart the dev server
- Broken links or contact info mismatch:
  - Update both `Header.jsx` and `ArtPortfolio.jsx`

---

## License

Private project. All rights reserved.
