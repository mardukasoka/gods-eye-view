# Indigo USGS adapter — bounded PR acceptance record

Scope: read-only public earthquake GeoJSON normalizer and tests. **No globe UI integration, background polling, or deployment** is included in PR #3.

## Live feed verification status
- Endpoint: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
- A prior draft recorded a specific event count and event details without a reproducible HTTP response or independent citation in the evidence ledger. Those details have been withdrawn as **unverified**.
- Required manual smoke evidence: retrieval timestamp, HTTP status, response type, observed feature count, latency, and reproducible command/output.
- A live endpoint smoke test alone does **not** establish browser CORS, client-side integration, or mobile rendering.

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
