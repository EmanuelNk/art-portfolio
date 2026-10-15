import viennaData from './vienna.json';
import portraitsData from './portraits.json';
import fallData from './fall.json';
import coffeeData from './coffee.json';
import oilMediumData from './oil-medium.json';
import oilMinisData from './oil-minis.json';
import graphiteData from './artworks.json';

// Where print orders and commission requests are emailed (via FormSubmit — see ADDING_ARTWORK.md).
export const ORDERS_EMAIL = 'Ariellamorrison03+art@gmail.com';

const COLLECTIONS = [
  { name: 'Scenes from Vienna', data: viennaData },
  { name: 'Portraits', data: portraitsData },
  { name: 'Fall series', data: fallData },
  { name: 'Coffee collection', data: coffeeData },
  { name: 'Medium size oils', data: oilMediumData },
  { name: 'Mini still lifes', data: oilMinisData },
  { name: 'Graphite', data: graphiteData },
];

// "prints": true in any gallery = print available; "prints": false = never offered;
// no flag = visitors can request a print.
const printUrls = new Set(
  COLLECTIONS.flatMap(({ data }) => data.filter((p) => p.prints).map((p) => p.url))
);
const noPrintUrls = new Set(
  COLLECTIONS.flatMap(({ data }) => data.filter((p) => p.prints === false).map((p) => p.url))
);

const CM_PER_INCH = 2.54;
const round1 = (n) => String(Math.round(n * 10) / 10);
const toInches = (cm) => round1(cm / CM_PER_INCH);

// "50x60 cm" or 18"x24" -> { short, long, unit }; unit is inches when quoted or marked "in".
// Sizes in the data aren't consistently width-first, so they're shown smaller side first.
const parseSize = (size) => {
  const m = /([\d.]+)\s*"?\s*x\s*([\d.]+)\s*"?\s*(cm|in)?/i.exec(size || '');
  if (!m) return null;
  const unit = m[3] ? m[3].toLowerCase() : size.includes('"') ? 'in' : 'cm';
  const [a, b] = [Number(m[1]), Number(m[2])];
  return { short: Math.min(a, b), long: Math.max(a, b), unit };
};

// e.g. "50x60 cm (19.7x23.6 in)" or "18x24 in (45.7x61 cm)"
export const formatSize = ({ short, long, unit }) => {
  const other = unit === 'cm'
    ? `${toInches(short)}x${toInches(long)} in`
    : `${round1(short * CM_PER_INCH)}x${round1(long * CM_PER_INCH)} cm`;
  return `${round1(short)}x${round1(long)} ${unit} (${other})`;
};

// A print with the given long side, in the original's proportions, e.g. "33.3x40 cm".
export const scaleToLongSide = (original, long, unit) =>
  `${round1((long * original.short) / original.long)}x${round1(long)} ${unit}`;

// First size recorded for each painting in any gallery.
const sizeByUrl = new Map();
COLLECTIONS.forEach(({ data }) =>
  data.forEach(({ url, size }) => {
    const parsed = parseSize(size);
    if (parsed && !sizeByUrl.has(url)) sizeByUrl.set(url, parsed);
  })
);

// Every painting on the site once (some appear in more than one gallery),
// tagged with the first collection it appears in.
const allPaintings = [];
const seen = new Set();
COLLECTIONS.forEach(({ name, data }) =>
  data.forEach(({ url, title }) => {
    if (seen.has(url) || noPrintUrls.has(url)) return;
    seen.add(url);
    allPaintings.push({
      url,
      title,
      collection: name,
      prints: printUrls.has(url),
      original: sizeByUrl.get(url) || null,
    });
  })
);

export const printsAvailable = allPaintings.filter((p) => p.prints);
export const otherPaintings = allPaintings.filter((p) => !p.prints);

// Commission canvas sizes, width x height in cm.
export const COMMISSION_SIZES = [
  [10, 15], [13, 18], [15, 20], [18, 24], [20, 25], [20, 30], [24, 30],
  [30, 40], [40, 50], [40, 60], [50, 60], [50, 70], [60, 80], [60, 90],
  [70, 100], [80, 120], [100, 150],
].map(([w, h]) => ({
  cm: `${w}x${h} cm`,
  inches: `${toInches(w)}x${toInches(h)} in`,
}));

export const SUBJECTS = ['Portrait', 'Still life', 'Scenery'];
