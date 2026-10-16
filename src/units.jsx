import React, { createContext, useContext, useEffect, useState } from 'react';

// Visitor's preferred unit for painting sizes ('in' or 'cm'), shared across the site
// and remembered in this browser. Inches by default.
const STORAGE_KEY = 'size-unit';
const DEFAULT_UNIT = 'in';
const CM_PER_INCH = 2.54;

const UnitContext = createContext([DEFAULT_UNIT, () => {}]);

const readStoredUnit = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'cm' || stored === 'in' ? stored : DEFAULT_UNIT;
  } catch {
    return DEFAULT_UNIT;
  }
};

export function UnitProvider({ children }) {
  const [unit, setUnit] = useState(readStoredUnit);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, unit);
    } catch {
      // storage unavailable (private mode etc.) — the choice just isn't remembered
    }
  }, [unit]);
  return <UnitContext.Provider value={[unit, setUnit]}>{children}</UnitContext.Provider>;
}

export const useUnit = () => useContext(UnitContext);

export const otherUnit = (unit) => (unit === 'cm' ? 'in' : 'cm');

export const round1 = (n) => String(Math.round(n * 10) / 10);

export const convert = (value, from, to) =>
  from === to ? value : from === 'cm' ? value / CM_PER_INCH : value * CM_PER_INCH;

// "50x60 cm" or 18"x24" -> { a, b, unit } in the order written; inches when quoted or marked "in".
export const parseSize = (size) => {
  const m = /([\d.]+)\s*"?\s*x\s*([\d.]+)\s*"?\s*(cm|in)?/i.exec(size || '');
  if (!m) return null;
  const unit = m[3] ? m[3].toLowerCase() : size.includes('"') ? 'in' : 'cm';
  return { a: Number(m[1]), b: Number(m[2]), unit };
};

// Two dimensions measured in `from`, shown in `to`, e.g. "11.8x15.7 in".
export const formatDims = (a, b, from, to) =>
  `${round1(convert(a, from, to))}x${round1(convert(b, from, to))} ${to}`;

// A size string from the data shown in the given unit; unparseable text is left as is.
export const formatSizeIn = (size, unit) => {
  const parsed = parseSize(size);
  return parsed ? formatDims(parsed.a, parsed.b, parsed.unit, unit) : size;
};

// Segmented "in | cm" switch.
export function UnitToggle({ className = '' }) {
  const [unit, setUnit] = useUnit();
  return (
    <div className={`unit-toggle ${className}`} role="group" aria-label="Size units">
      {['in', 'cm'].map((u) => (
        <button
          key={u}
          type="button"
          className={unit === u ? 'is-active' : ''}
          aria-pressed={unit === u}
          onClick={() => setUnit(u)}
        >
          {u}
        </button>
      ))}
    </div>
  );
}
