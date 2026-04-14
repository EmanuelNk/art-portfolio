# Adding Artwork to the Portfolio

Images are hosted on **Cloudinary** (cloud name: `djm9plswu`). You no longer place image files in the repo — upload to Cloudinary and paste the URL into the JSON data file.

---

## Graphite Drawings

### 1. Upload to Cloudinary

Upload your image to the **`art/graphite`** folder in the Cloudinary Media Library.

The resulting URL will look like:

```
https://res.cloudinary.com/djm9plswu/image/upload/v.../your-filename_randomid.jpg
```

### 2. Register it in the data file

Open `src/data/artworks.json` and add an entry:

```json
{ "url": "https://res.cloudinary.com/djm9plswu/image/upload/v.../your-filename_randomid.jpg", "title": "My Drawing", "description": "", "size": "18\"x24\"" }
```

| Field         | Required | Notes                                        |
|---------------|----------|----------------------------------------------|
| `url`         | Yes      | Full Cloudinary `secure_url` from the upload |
| `title`       | Yes      | Display name in the gallery & lightbox       |
| `description` | No       | Shown in the lightbox (can be `""`)          |
| `size`        | No       | Dimensions badge, e.g. `"18\"x24\""`         |

The gallery will pick it up automatically. No code changes needed.

### 3. (Optional) Add to homepage carousel

In `src/components/Homepage/Homepage.jsx`, add the full URL to the `GRAPHITE` object:

```js
const GRAPHITE = {
  // ...existing entries...
  art9: 'https://res.cloudinary.com/djm9plswu/image/upload/v.../your-filename_randomid.jpg',
};
```

Then add it to `graphitePieces`:

```js
{ src: GRAPHITE.art9, thumbSrc: thumb(GRAPHITE.art9), alt: 'My Drawing' },
```

---

## Oil Paintings — Minis

### 1. Upload to Cloudinary (Minis)

Upload your image to the **`art/oil`** folder in the Cloudinary Media Library.

### 2. Register it in the data file (Minis)

Open `src/data/oil-minis.json` and add an entry:

```json
{ "url": "https://res.cloudinary.com/djm9plswu/image/upload/v.../your-filename_randomid.jpg", "title": "Sunflowers", "description": "Oil on canvas", "size": "6\"x6\"" }
```

### 3. (Optional) Add to homepage carousel

In `src/components/Homepage/Homepage.jsx`, add to the `OIL` object:

```js
const OIL = {
  // ...existing entries...
  sunflowers: 'https://res.cloudinary.com/djm9plswu/image/upload/v.../your-filename_randomid.jpg',
};
```

Then add it to `oilPieces`:

```js
{ src: OIL.sunflowers, thumbSrc: thumb(OIL.sunflowers), alt: 'Sunflowers' },
```

---

## Oil Paintings — Large

### 1. Upload to Cloudinary (Large)

Upload your image to the **`art/oil-large`** folder in the Cloudinary Media Library.

### 2. Register it in the data file (Large)

Open `src/data/oil-large.json` and add an entry:

```json
{ "url": "https://res.cloudinary.com/djm9plswu/image/upload/v.../your-filename_randomid.jpg", "title": "My Painting", "description": "Oil on canvas", "size": "24\"x36\"" }
```

The Oils landing page (`/oils`) will automatically update the thumbnail and count.

### 3. (Optional) Add to homepage carousel

In `src/components/Homepage/Homepage.jsx`, add to the `OIL` object and `oilPieces` array (same pattern as minis above).

---

## Changing a Painting's Name or Info

Edit the relevant JSON file directly:

| Gallery       | Data file                   |
|---------------|-----------------------------|
| Graphite      | `src/data/artworks.json`    |
| Oil Minis     | `src/data/oil-minis.json`   |
| Oil Large     | `src/data/oil-large.json`   |

Fields:

- **title** — shown in the gallery caption and lightbox header
- **description** — shown in the lightbox below the title
- **size** — shown as a badge in the top-right corner of the gallery card

Homepage carousel labels are set via the `alt` field in the `graphitePieces` / `oilPieces` arrays in `src/components/Homepage/Homepage.jsx`.

---

## Image sizes & transformations

Cloudinary serves optimised versions automatically — you don't need to resize before uploading. The code applies these transformations at the URL level:

| Context                  | Transformation applied            |
|--------------------------|-----------------------------------|
| Homepage carousel        | `w_520,f_auto,q_auto,c_limit`     |
| Homepage split cards     | `w_700,f_auto,q_auto,c_limit`     |
| Masonry gallery grid     | `w_900,f_auto,q_auto,c_limit`     |
| Modal / lightbox         | **Full original — no transform**  |

`f_auto` serves WebP/AVIF to browsers that support it. You always upload originals.

---

## Quick Reference

| Gallery            | Cloudinary folder   | Data file                   | Homepage array    |
|--------------------|---------------------|-----------------------------|-------------------|
| Graphite           | `art/graphite`      | `src/data/artworks.json`    | `graphitePieces`  |
| Oil Minis          | `art/oil`           | `src/data/oil-minis.json`   | `oilPieces`       |
| Oil Large          | `art/oil-large`     | `src/data/oil-large.json`   | `oilPieces`       |
