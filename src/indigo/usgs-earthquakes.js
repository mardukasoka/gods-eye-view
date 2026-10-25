// Read-only public USGS earthquake adapter. No user location, tracking or credentials.
export const USGS_HOURLY =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

export function normalizeQuakes(payload) {
  if (payload?.type !== 'FeatureCollection' || !Array.isArray(payload.features))
    throw new Error('Invalid GeoJSON');
  return payload.features.slice(0, 100).flatMap((feature) => {
    const [lon, lat, depth] = feature?.geometry?.coordinates ?? [];
    const p = feature?.properties ?? {};
    if (
      ![lat, lon].every(Number.isFinite) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    )
      return [];
    if (!Number.isFinite(p.time)) return [];
    return [
      {
        id: String(feature.id ?? ''),
        latitude: lat,
        longitude: lon,
        depthKm: Number.isFinite(depth) ? depth : null,
        magnitude: Number.isFinite(p.mag) ? p.mag : null,
        place: typeof p.place === 'string' ? p.place.slice(0, 180) : 'Unknown',
        timestamp: new Date(p.time).toISOString(),
        sourceUrl:
          typeof p.url === 'string' &&
          p.url.startsWith('https://earthquake.usgs.gov/')
            ? p.url
            : null,
      },
    ];
  });
}

export async function loadRecentQuakes(
  fetchFn = fetch,
  { timeoutMs = 8000 } = {},
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchFn(USGS_HOURLY, {
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok)
      throw new Error('USGS feed unavailable: ' + response.status);
    return normalizeQuakes(await response.json());
  } finally {
    clearTimeout(timeout);
  }
}
