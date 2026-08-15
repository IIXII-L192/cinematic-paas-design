// Simplified mainland US outline (lng, lat), counter-clockwise.
export const US_MAINLAND: [number, number][] = [
  [-124.7, 48.4], [-122.8, 49.0], [-95.15, 49.0], [-94.6, 48.7], [-89.5, 48.0],
  [-88.0, 48.3], [-84.6, 46.5], [-83.5, 46.0], [-82.5, 45.3], [-83.5, 43.5],
  [-82.4, 41.7], [-78.9, 43.3], [-76.5, 43.6], [-74.5, 45.0], [-71.0, 45.1],
  [-69.2, 47.4], [-67.0, 45.7], [-69.9, 43.9], [-71.0, 41.4], [-74.0, 40.5],
  [-75.5, 38.5], [-75.9, 37.2], [-76.0, 36.6], [-77.5, 34.5], [-79.0, 33.5],
  [-80.5, 32.2], [-81.4, 30.7], [-80.0, 25.2], [-81.0, 24.5], [-82.7, 27.6],
  [-83.5, 29.7], [-85.5, 29.7], [-87.5, 30.2], [-89.2, 30.3], [-91.3, 29.3],
  [-94.0, 29.4], [-97.4, 27.8], [-97.2, 26.0], [-99.1, 26.4], [-101.4, 29.7],
  [-103.3, 28.9], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.3], [-111.0, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34.0], [-120.6, 34.5], [-122.0, 36.9],
  [-122.5, 37.8], [-123.7, 38.9], [-124.0, 40.0], [-124.4, 42.0], [-124.5, 43.3],
  [-124.0, 46.3], [-124.7, 48.4],
];

// Rough Alaska mainland (lng, lat).
export const ALASKA: [number, number][] = [
  [-141, 60], [-141, 70.0], [-156, 71.4], [-166, 68.5], [-168, 65.5], [-164, 60.5],
  [-162, 58.0], [-156, 58.5], [-153, 57.5], [-148, 60.0], [-141, 60],
];

// Hawaii — coarse hull of the main island chain (lng, lat). Loose enough that the
// halftone grid samples land across the four big islands rather than empty ocean.
export const HAWAII_HULL: [number, number][] = [
  [-160.4, 22.2], [-159.2, 22.3], [-158.0, 21.8], [-156.5, 21.3],
  [-155.5, 20.4], [-154.7, 19.4], [-155.1, 18.9], [-156.2, 19.4],
  [-157.0, 20.7], [-158.5, 21.3], [-160.0, 21.8], [-160.4, 22.2],
];

// Hawaii — main islands as anchor points (lng, lat).
export const HAWAII_ISLANDS: { name: string; lat: number; lng: number; r: number }[] = [
  { name: "Kauai", lat: 22.0, lng: -159.5, r: 4 },
  { name: "Oahu", lat: 21.5, lng: -158.0, r: 4 },
  { name: "Molokai", lat: 21.1, lng: -157.0, r: 3 },
  { name: "Maui", lat: 20.8, lng: -156.3, r: 4 },
  { name: "Hawaii", lat: 19.6, lng: -155.5, r: 6 },
];

export function pointInPoly(lng: number, lat: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
