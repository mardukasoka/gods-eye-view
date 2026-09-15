# God's Eye View external-source audit

Reviewed: 2026-09-16

## Outcome

The supplied 50-resource list is useful, but it should be treated as a source ecosystem rather than 50 equal globe layers. `external-source-catalog.json` is the first integration point: it gives the project stable IDs, categories, authority labels, overlap notes, and proposed integration modes without adding startup requests or mobile rendering cost.

## Integration rules

1. Keep **observation**, **forecast**, **model**, **reconstruction**, and **community report** visibly distinct.
2. Prefer a primary public authority for the default layer; expose specialist visualizations as alternate views.
3. Start each source as a link. Promote it only after confirming terms, attribution, CORS, quotas, geographic coverage, refresh rate, and failure behavior.
4. Fetch nothing until a user enables a layer. Cache through the existing server where permitted; never expose private provider keys in the browser.
5. Cluster overlaps instead of rendering duplicates simultaneously.

## Recommended layer families

| Family | Default backbone | Alternate/context sources | First action |
| --- | --- | --- | --- |
| Satellite imagery | NASA Worldview/GIBS | Sentinel Hub | Prototype one optional GIBS imagery layer |
| Active fire and smoke | Existing NASA FIRMS layer | AirNow Fire and Smoke | Keep FIRMS canonical; add smoke only after coverage review |
| Weather and ocean | Existing weather capabilities | Ventusky, earth.nullschool.net, Tropical Tidbits | Link first; do not scrape third-party visualizations |
| Earthquakes | Existing USGS layer | EMSC / Seismic Portal, Raspberry Shake | Add EMSC as an explicitly labeled alternate feed |
| Volcanoes | Smithsonian GVP | VolcanoDiscovery | Use GVP for catalog facts; specialist portal for live context |
| Water | NOAA + USGS | NASA Sea Level, U.S. Drought Monitor | Begin with station/river APIs, viewport bounded |
| Space weather | NOAA SWPC | SpaceWeather.com, Aurora Service | Add SWPC alerts/data before presentation portals |
| Satellites | Existing CelesTrak layer | Heavens-Above, N2YO, NASA Spot the Station | Retain current propagator; add pass prediction as a tool |
| Near-Earth objects | NASA/JPL CNEOS | AMS fireball reports | Add CNEOS as verified objects; label fireballs community reports |
| Flights | Existing OpenSky + adsb.lol | ADS-B Exchange | Retain current providers; review terms before another feed |
| Marine activity | Existing vessel layer | Global Fishing Watch, OCEARCH | Add purpose-specific fishing/animal views, not duplicate vessels |
| Energy and networks | Cloudflare Radar plus reviewed grid providers | NetBlocks, Electricity Maps, Energy-Charts, Gridwatch | Use regional adapters with explicit coverage |
| Biodiversity | GBIF | eBird, Movebank, iNaturalist, BirdCast | Query by viewport/time; aggregate at global zoom |

## Audit cautions

- `AQICN` and `WAQI` are closely related views and should be one air-quality family, not duplicate layers.
- `earth.nullschool.net` has an older open-source codebase, but the current deployed application may differ. Treat it as an external visualization unless present licensing and data-provider terms are verified.
- Several sources are regional: NHC and U.S. Drought Monitor are U.S.-focused; Gridwatch is UK-focused; Energy-Charts is mainly European; BirdCast's live migration products are U.S.-focused.
- A public website is not automatically an embeddable or redistributable data feed. No iframe or scraping integration is approved by this audit.
- Existing God's Eye View layers already cover FIRMS fires, USGS earthquakes, OpenSky flights, CelesTrak satellites, and radio. The catalog marks those so future work does not recreate them.

## Next activation tranche

The safest high-value sequence is:

1. NASA Worldview/GIBS imagery overlay.
2. NOAA SWPC space-weather status.
3. NASA/JPL CNEOS near-Earth objects.
4. NOAA/USGS water observations.
5. GBIF/iNaturalist biodiversity observations with zoom-dependent clustering.

Each activation should ship independently with provenance, timestamp, stale-data state, attribution, request budget, and a mobile performance test.
