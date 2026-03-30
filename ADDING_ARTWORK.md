# Adding Artwork to the Portfolio

## Charcoal Drawings

### 1. Add the image file

Place your `.jpg` / `.JPG` / `.png` file in:

```
src/assets/images/art/
```

### 2. Register it in the data file

Open `src/data/artworks.json` and add an entry:

```json
{ "file": "art9.jpg", "title": "My Drawing", "description": "", "size": "18\"x24\"" }
```

| Field         | Required | Notes                              |
|---------------|----------|------------------------------------|
| `file`        | Yes      | Filename (must match the file you added) |
| `title`       | Yes      | Display name in the gallery & lightbox   |
| `description` | No       | Shown in the lightbox (can be `""`)      |
| `size`        | No       | Dimensions badge, e.g. `"18\"x24\""`     |

### 3. (Optional) Add to homepage carousel

In `src/components/Homepage/Homepage.jsx`:

1. Add an import at the top with the other charcoal imports:

```js
import cArt9 from '../../assets/images/art/art9.jpg';
```

2. Add it to the `charcoalPieces` array:

```js
{ src: cArt9, alt: 'My Drawing' },
```

---

## Oil Paintings — Minis

### 1. Add the image file

Place your file in:

```
src/assets/images/art/oil/
```

### 2. Register it in the data file

Open `src/data/oil-minis.json` and add an entry:

```json
{ "file": "mini7.jpg", "title": "Sunflowers", "description": "Oil on canvas", "size": "6\"x6\"" }
```

| Field         | Required | Notes                              |
|---------------|----------|------------------------------------|
| `file`        | Yes      | Filename (must match the file you added) |
| `title`       | Yes      | Display name in the gallery & lightbox   |
| `description` | No       | Shown in the lightbox (can be `""`)      |
| `size`        | No       | Dimensions badge, e.g. `"6\"x6\""`      |

### 3. (Optional) Add to homepage carousel

In `src/components/Homepage/Homepage.jsx`:

1. Add an import:

```js
import oMini7 from '../../assets/images/art/oil/mini7.jpg';
```

2. Add it to the `oilPieces` array:

```js
{ src: oMini7, alt: 'Sunflowers' },
```

---

## Oil Paintings — Large

### 1. Add the image file

Place your file in:

```
src/assets/images/art/oil-large/
```

### 2. Register it in the data file

Open `src/data/oil-large.json` and add an entry:

```json
{ "file": "my-painting.jpg", "title": "My Painting", "description": "Oil on canvas", "size": "24\"x36\"" }
```

| Field         | Required | Notes                              |
|---------------|----------|------------------------------------|
| `file`        | Yes      | Filename (must match the file you added) |
| `title`       | Yes      | Display name in the gallery & lightbox   |
| `description` | No       | Shown in the lightbox (can be `""`)      |
| `size`        | No       | Dimensions badge, e.g. `"24\"x36\""`    |

The Oils landing page (`/oils`) will automatically update the thumbnail and count.

### 3. (Optional) Add to homepage carousel

In `src/components/Homepage/Homepage.jsx`:

1. Add an import:

```js
import oLargeMyPainting from '../../assets/images/art/oil-large/my-painting.jpg';
```

2. Add it to the `oilPieces` array:

```js
{ src: oLargeMyPainting, alt: 'My Painting' },
```

---

## Changing a Painting's Name or Info

How titles and info are managed depends on the gallery:

### Charcoal drawings

All metadata lives in `src/data/artworks.json`. Edit the entry directly:

```json
{ "file": "art1.JPG", "title": "The Mourner", "description": "Charcoal on paper", "size": "18\"x24\"" }
```

- **title** — shown in the gallery caption and lightbox header
- **description** — shown in the lightbox below the title
- **size** — shown as a badge in the top-right corner of the gallery card

### Oil paintings — Minis

All metadata lives in `src/data/oil-minis.json`. Edit the entry directly:

```json
{ "file": "mini1.jpeg", "title": "Sunflowers", "description": "Oil on canvas", "size": "6\"x6\"" }
```

### Oil paintings — Large

All metadata lives in `src/data/oil-large.json`. Edit the entry directly:

```json
{ "file": "couple-in-rome.jpg", "title": "Couple in Rome", "description": "Oil on canvas", "size": "24\"x36\"" }
```

For both oil JSON files, the fields work the same as charcoal:

- **title** — shown in the gallery caption and lightbox header
- **description** — shown in the lightbox below the title
- **size** — shown as a badge in the top-right corner of the gallery card

### Homepage carousel

Carousel labels are set manually in `src/components/Homepage/Homepage.jsx` via the `alt` field in each array:

```js
const oilPieces = [
  { src: oMini1, alt: 'Oil mini 1' },       // ← change 'alt' to update the name
  { src: oLargeCoupleInRome, alt: 'Couple in Rome' },
];
```

The `alt` value is used for accessibility (screen readers) and doesn't currently appear visually in the carousel, but it's good practice to keep it accurate.

---

## Quick Reference

| Gallery            | Image folder                       | Data source                | Auto-detected? |
|--------------------|------------------------------------|----------------------------|----------------|
| Charcoal           | `src/assets/images/art/`           | `src/data/artworks.json`   | No             |
| Oil Minis          | `src/assets/images/art/oil/`       | `src/data/oil-minis.json`  | No             |
| Oil Large          | `src/assets/images/art/oil-large/` | `src/data/oil-large.json`  | No             |
| Homepage carousels | *(uses imports from above)*        | Manual arrays in `Homepage.jsx` | No        |
