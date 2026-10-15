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

// A painting flagged for prints in any gallery counts as available.
const printUrls = new Set(
  COLLECTIONS.flatMap(({ data }) => data.filter((p) => p.prints).map((p) => p.url))
);

// Every painting on the site once (some appear in more than one gallery),
// tagged with the first collection it appears in.
const allPaintings = [];
const seen = new Set();
COLLECTIONS.forEach(({ name, data }) =>
  data.forEach(({ url, title }) => {
    if (seen.has(url)) return;
    seen.add(url);
    allPaintings.push({ url, title, collection: name, prints: printUrls.has(url) });
  })
);

export const printsAvailable = allPaintings.filter((p) => p.prints);
export const otherPaintings = allPaintings.filter((p) => !p.prints);

const CM_PER_INCH = 2.54;
const toInches = (cm) => String(Math.round((cm / CM_PER_INCH) * 10) / 10);

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
