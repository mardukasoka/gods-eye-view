# Indigo USGS adapter — bounded PR acceptance record

Scope: read-only public earthquake GeoJSON normalizer and tests. **No globe UI integration, background polling, or deployment** is included in PR #3.

## Live feed observation (26 October 2026)
- Endpoint: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
- Independent HTTP retrieval through a web reader succeeded and returned a GeoJSON `FeatureCollection` with `metadata.status: 200` and `metadata.count: 14` at observation time.
- Example feature: event `aka2026vdrymb`, longitude `-150.813`, latitude `63.198`, magnitude `2.1`, depth `132.2` km. Values are ephemeral; **not** a fixed test fixture.
- This confirms endpoint reachability and a plausible payload, **not** browser CORS, adapter execution against the live response, mobile rendering, or latency.

## Current adapter behaviour
- Fetch is **only invoked when `loadRecentQuakes` is called**; no page-load integration exists.
- AbortController timeout defaults to 8 seconds.
- Missing/nonfinite magnitude and depth become `null`; invalid latitude/longitude are dropped.
- URLs are limited to USGS HTTPS origins for event attribution; caller must display USGS attribution.
- No credentials or user geolocation.

## Outstanding, not claimed complete
- [ ] Add 60-second in-memory cache and stale fallback with explicit age/source metadata before a UI consumer is attached.
- [ ] Test network failures and aborted requests.
- [ ] Verify CORS in an actual browser.
- [ ] Decide UI polling cadence and visible attribution in the separate integration PR.
- [ ] Human review of adapter-only scope and current CI.

The live feed observation is a **smoke check only**. It is not evidence of a working globe layer.
