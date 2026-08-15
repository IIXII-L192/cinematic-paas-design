export interface City {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export const CITIES: City[] = [
  { id: "nyc", name: "New York", state: "NY", lat: 40.71, lng: -74.01 },
  { id: "bos", name: "Boston", state: "MA", lat: 42.36, lng: -71.06 },
  { id: "phl", name: "Philadelphia", state: "PA", lat: 39.95, lng: -75.17 },
  { id: "dc", name: "Washington", state: "DC", lat: 38.91, lng: -77.04 },
  { id: "bal", name: "Baltimore", state: "MD", lat: 39.29, lng: -76.61 },
  { id: "pgh", name: "Pittsburgh", state: "PA", lat: 40.44, lng: -79.99 },
  { id: "buf", name: "Buffalo", state: "NY", lat: 42.89, lng: -78.88 },
  { id: "cle", name: "Cleveland", state: "OH", lat: 41.5, lng: -81.69 },
  { id: "cmh", name: "Columbus", state: "OH", lat: 39.96, lng: -82.99 },
  { id: "dtw", name: "Detroit", state: "MI", lat: 42.33, lng: -83.05 },
  { id: "ind", name: "Indianapolis", state: "IN", lat: 39.77, lng: -86.16 },
  { id: "chi", name: "Chicago", state: "IL", lat: 41.88, lng: -87.63 },
  { id: "mke", name: "Milwaukee", state: "WI", lat: 43.04, lng: -87.91 },
  { id: "msp", name: "Minneapolis", state: "MN", lat: 44.98, lng: -93.27 },
  { id: "stl", name: "St. Louis", state: "MO", lat: 38.63, lng: -90.2 },
  { id: "kc", name: "Kansas City", state: "MO", lat: 39.1, lng: -94.58 },
  { id: "oma", name: "Omaha", state: "NE", lat: 41.26, lng: -95.93 },
  { id: "den", name: "Denver", state: "CO", lat: 39.74, lng: -104.99 },
  { id: "slc", name: "Salt Lake City", state: "UT", lat: 40.76, lng: -111.89 },
  { id: "abq", name: "Albuquerque", state: "NM", lat: 35.08, lng: -106.65 },
  { id: "phx", name: "Phoenix", state: "AZ", lat: 33.45, lng: -112.07 },
  { id: "lv", name: "Las Vegas", state: "NV", lat: 36.17, lng: -115.14 },
  { id: "lax", name: "Los Angeles", state: "CA", lat: 34.05, lng: -118.24 },
  { id: "sd", name: "San Diego", state: "CA", lat: 32.72, lng: -117.16 },
  { id: "sf", name: "San Francisco", state: "CA", lat: 37.77, lng: -122.42 },
  { id: "sjc", name: "San Jose", state: "CA", lat: 37.34, lng: -121.89 },
  { id: "sac", name: "Sacramento", state: "CA", lat: 38.58, lng: -121.49 },
  { id: "pdx", name: "Portland", state: "OR", lat: 45.51, lng: -122.68 },
  { id: "sea", name: "Seattle", state: "WA", lat: 47.61, lng: -122.33 },
  { id: "boi", name: "Boise", state: "ID", lat: 43.62, lng: -116.21 },
  { id: "bil", name: "Billings", state: "MT", lat: 45.78, lng: -108.5 },
  { id: "fsd", name: "Sioux Falls", state: "SD", lat: 43.55, lng: -96.7 },
  { id: "fgo", name: "Fargo", state: "ND", lat: 46.88, lng: -96.79 },
  { id: "okc", name: "Oklahoma City", state: "OK", lat: 35.47, lng: -97.52 },
  { id: "tul", name: "Tulsa", state: "OK", lat: 36.15, lng: -95.99 },
  { id: "dfw", name: "Dallas", state: "TX", lat: 32.78, lng: -96.8 },
  { id: "hou", name: "Houston", state: "TX", lat: 29.76, lng: -95.37 },
  { id: "aus", name: "Austin", state: "TX", lat: 30.27, lng: -97.74 },
  { id: "sat", name: "San Antonio", state: "TX", lat: 29.42, lng: -98.49 },
  { id: "elp", name: "El Paso", state: "TX", lat: 31.76, lng: -106.49 },
  { id: "lit", name: "Little Rock", state: "AR", lat: 34.74, lng: -92.29 },
  { id: "msy", name: "New Orleans", state: "LA", lat: 29.95, lng: -90.07 },
  { id: "msm", name: "Memphis", state: "TN", lat: 35.15, lng: -90.05 },
  { id: "bna", name: "Nashville", state: "TN", lat: 36.16, lng: -86.78 },
  { id: "lou", name: "Louisville", state: "KY", lat: 38.25, lng: -85.76 },
  { id: "atl", name: "Atlanta", state: "GA", lat: 33.75, lng: -84.39 },
  { id: "bhm", name: "Birmingham", state: "AL", lat: 33.52, lng: -86.81 },
  { id: "jan", name: "Jackson", state: "MS", lat: 32.3, lng: -90.18 },
  { id: "clt", name: "Charlotte", state: "NC", lat: 35.23, lng: -80.84 },
  { id: "rdu", name: "Raleigh", state: "NC", lat: 35.78, lng: -78.64 },
  { id: "rva", name: "Richmond", state: "VA", lat: 37.54, lng: -77.43 },
  { id: "cae", name: "Columbia", state: "SC", lat: 34.0, lng: -81.03 },
  { id: "cha", name: "Charleston", state: "SC", lat: 32.78, lng: -79.93 },
  { id: "jax", name: "Jacksonville", state: "FL", lat: 30.33, lng: -81.66 },
  { id: "orl", name: "Orlando", state: "FL", lat: 28.54, lng: -81.38 },
  { id: "tpa", name: "Tampa", state: "FL", lat: 27.95, lng: -82.46 },
  { id: "mia", name: "Miami", state: "FL", lat: 25.76, lng: -80.19 },
  { id: "anc", name: "Anchorage", state: "AK", lat: 61.22, lng: -149.9 },
  { id: "hnl", name: "Honolulu", state: "HI", lat: 21.31, lng: -157.86 },
  { id: "rno", name: "Reno", state: "NV", lat: 39.53, lng: -119.81 },
  { id: "tus", name: "Tucson", state: "AZ", lat: 32.22, lng: -110.93 },
  { id: "sgf", name: "Springfield", state: "MO", lat: 37.21, lng: -93.29 },
  { id: "des", name: "Des Moines", state: "IA", lat: 41.59, lng: -93.62 },
  { id: "ict", name: "Wichita", state: "KS", lat: 37.69, lng: -97.34 },
  { id: "mke2", name: "Madison", state: "WI", lat: 43.07, lng: -89.4 },
];

export type AllergenType = "tree" | "grass" | "weed";

export interface PollenReading {
  tree: number;
  grass: number;
  weed: number;
  total: number;
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dayOfYear(d: Date): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const diff = d.getTime() - start;
  return Math.floor(diff / 86400000);
}

function bell(day: number, peak: number, width: number): number {
  const x = ((day - peak + 365) % 365);
  const dx = Math.min(x, 365 - x);
  return Math.exp(-(dx * dx) / (2 * width * width));
}

export function seasonalCurve(type: AllergenType, day: number, lat: number): number {
  return curve(type, day, lat);
}

function curve(type: AllergenType, day: number, lat: number): number {
  const latShift = (40 - lat) * 0.6;
  if (type === "tree") return bell(day, 100 + latShift, 28) * (1 - (lat - 25) * 0.005);
  if (type === "grass") return bell(day, 160 + latShift * 0.4, 35);
  return bell(day, 240 - latShift * 0.4, 40);
}

export function getPollen(cityId: string, date: Date = new Date()): PollenReading {
  const city = CITIES.find((c) => c.id === cityId);
  if (!city) return { tree: 0, grass: 0, weed: 0, total: 0 };
  const d = dayOfYear(date);
  const dailyRand = mulberry32(hashSeed(`${cityId}-${date.toISOString().slice(0, 10)}`));
  const baseRand = mulberry32(hashSeed(cityId));
  const baseline = baseRand() * 1.5;

  const t = Math.max(0, Math.min(12, curve("tree", d, city.lat) * 12 + baseline + (dailyRand() - 0.5) * 2));
  const g = Math.max(0, Math.min(12, curve("grass", d, city.lat) * 12 + baseline + (dailyRand() - 0.5) * 2));
  const w = Math.max(0, Math.min(12, curve("weed", d, city.lat) * 12 + baseline + (dailyRand() - 0.5) * 2));
  const total = Math.max(0, Math.min(12, (t + g + w) / 3 * 1.4));
  return { tree: round1(t), grass: round1(g), weed: round1(w), total: round1(total) };
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export interface SeriesPoint {
  label: string;
  date: Date;
  tree: number;
  grass: number;
  weed: number;
  total: number;
}

export type Range = "day" | "month" | "year";

export function getSeries(cityId: string, range: Range, anchor: Date = new Date()): SeriesPoint[] {
  const out: SeriesPoint[] = [];
  if (range === "day") {
    for (let h = 0; h < 24; h++) {
      const d = new Date(anchor);
      d.setHours(h, 0, 0, 0);
      const r = getPollen(cityId, d);
      const diurnal = Math.sin(((h - 6) / 24) * Math.PI * 2) * 0.5 + 1;
      out.push({
        label: `${h.toString().padStart(2, "0")}:00`,
        date: d,
        tree: round1(r.tree * diurnal),
        grass: round1(r.grass * diurnal),
        weed: round1(r.weed * diurnal),
        total: round1(r.total * diurnal),
      });
    }
  } else if (range === "month") {
    for (let i = 29; i >= 0; i--) {
      const d = new Date(anchor);
      d.setDate(d.getDate() - i);
      const r = getPollen(cityId, d);
      out.push({ label: `${d.getMonth() + 1}/${d.getDate()}`, date: d, ...r });
    }
  } else {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(anchor);
      d.setMonth(d.getMonth() - i, 15);
      const r = getPollen(cityId, d);
      out.push({
        label: d.toLocaleString("en-US", { month: "short" }),
        date: d,
        ...r,
      });
    }
  }
  return out;
}

// Live API swap-in point. Currently delegates to the synthetic generator.
// Replace the body with a real fetch (e.g. Google Pollen API, BreezoMeter)
// keeping the same return shape.
export async function fetchPollen(cityId: string, date: Date = new Date()): Promise<PollenReading> {
  return Promise.resolve(getPollen(cityId, date));
}
