# Indigo Spatial Forensics — read-only integration gate

This is a proposed adapter specification, **not** a live deployment or authorization to track people.

## Layer classification
| Layer | Source policy | Display policy |
|---|---|---|
| Earth observations, weather, hazards | Official/public datasets with attribution and refresh timestamp | Show resolution and uncertainty |
| Aircraft, maritime, satellites | Licensed public feeds only; obey API terms | No claims of exhaustive live coverage |
| Missing persons | Official published notices only | Approximate published place, no private address or real-time tracking |
| Official wanted notices | Official agency publication only | Link to issuing agency, expiry and correction handling |
| Unsolved cases | Official case summaries only | No speculative identification or crowdsourced accusation |

## Data contract
Every item: source_url, publisher, source_timestamp, fetched_at, spatial_precision, license, evidence_status, expiry_or_review_date, and public_visibility. Reject unverified locations, private personal information and stale official notices.

## Technical gate
1. Inventory current data adapters and map layers; do not clone existing pipelines.
2. Create a read-only boundary: no surveillance control, private camera access, person-tracking or automated law-enforcement actions.
3. Add rate limits, source attribution, caching and a removal/correction mechanism.
4. Verify mobile rendering and source-failure fallback.
5. Require human review before any sensitive layer is made public.

**Status:** design and safety gate only; no feed connected or deployment performed.
