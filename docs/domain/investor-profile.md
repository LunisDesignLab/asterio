# Investor — profile & data model

Source of truth for the investor account fields. Read when building investor onboarding,
the investor settings, or the Discover Investors matching logic.

## Required at signup (basic profile)

- Full name
- Email address
- Password
- Phone number
- WhatsApp number — *optional*
- Profile photo — *optional*
- Preferred language
- Country of residence

## Required at signup (investment preferences)

**What are you looking for?** (multi-select)
Apartments · Villas · Townhouses · Penthouses · Offices · Retail · Warehouses · Whole Buildings

**Unit type** — asked *only* if Apartments / Villas / Townhouses / Penthouses is selected:
Studio · 1 bedroom · 2 bedroom · 3 bedroom · 4 bedroom · 5+ bedroom · Flexible

**Budget range (AED):** 100K – 100M (range slider)

**When do you plan to invest?**
Ready now · Within 30 days · Within 3 months · Within 6 months · Within 12 months · Exploring only

**Preferred areas** (multi-select)
All · Dubai Marina · Downtown · Dubai Hills · JVC/JVT · Palm Jumeirah · MBR City ·
Dubai Creek Harbour · Damac Hills · Other areas

## Optional, can be added later (deeper profile)

**Primary goal:**
Investment · End-user / living in Dubai · Holiday home · Rental income ·
Capital appreciation · Golden Visa eligibility · Portfolio diversification

**Buying method:** Cash · Mortgage · Cash + mortgage · Not decided

**Number of properties planned:** 1 property · 2–3 properties · 4+ properties

**Previous Dubai property ownership:**
First-time buyer · Existing Dubai property owner · Investor with multiple properties

## Settings (privacy)

- **Visible in Discover Investors** (Pro) — appear in brokers' cold discovery. See
  `CLAUDE.md` → discovery reciprocity model.
- **Contactable by brokers** — whether brokers can send connection requests.

## System data (captured automatically)

- Account created at
- Invited at (and by which broker, if invite-only Free)
- Plan (Free / Pro), plan changed at
- Last active, etc.

> These preference fields feed the **relevance / AI matching** in Discover Investors and the
> per-group targeting of posts. Without them, discovery and targeting are blind.
