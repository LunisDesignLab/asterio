@AGENTS.md

# CLAUDE.md — Asterio

> Read this fully before doing anything. It is binding. When something here is marked
> **TBD**, it is not yet decided — ask Adrian, do not invent an answer.

## What Asterio is

Asterio is a **closed-circuit, multi-role SaaS for the UAE (Dubai-first) off-plan real
estate market**. It is the single source of truth between three roles:

- **Developers** (Emaar, Binghatti, Ellington, …) publish off-plan listings. They create a
  listing once, from their own PDF brochures, via OCR/parse → structured form. The listing
  is canonical: brokers reuse it instead of re-typing, so information stays accurate,
  complete and consistent across every broker who picks it up.
- **Brokers** pick up developer listings, build groups of investors, and post **relevant**
  listings to **specific groups** (no more spamming every investor with irrelevant units).
  They can also create their own custom posts. AI assists them with insights, tips and
  benchmarks to convert.
- **Investors** are leads. Most are passive; few invest. They receive only what is relevant
  to them, in-app, from brokers they are connected to.

Nothing is public. **There is no guest access — every view is behind an authenticated
account.** Distribution is primarily in-app, with an optional "share to WhatsApp"
(individual or group) as a secondary channel.

The problem we kill: developers used to scatter PDFs across WhatsApp/Telegram/email;
brokers re-built low-quality listings from them, lost information, and spammed mixed
listings into channels investors couldn't filter. Asterio makes the developer the author,
keeps data clean, and routes the right listing to the right investor.

## Stack

- Next.js 16 (App Router), React 19, TypeScript **strict** (no `any`, no `@ts-ignore`)
- Tailwind CSS v4 (`@theme` tokens)
- **Supabase** — Postgres + Auth + **Row-Level Security** + Storage (PDFs) + Edge/Functions
- **Stripe** — subscriptions (AED, VAT 5%)
- **@anthropic-ai/sdk** — server-side only, for PDF extraction + natural-language layer
- Deploy on **Vercel**, function region matched to the DB region

Node 20+. Design source of truth is **Figma** (file `Asterio`, Broker module
`node 1401:35339`), read via the Figma MCP.

## Commands

```bash
npm run dev     # dev server
npm run build   # production build, must pass with zero TS errors
npm run lint    # eslint, must pass clean
```

Always run `npm run build` before declaring a task complete.

## Roles, plans, pricing & access (security-critical — these are invariants)

**Pricing (AED):** Broker — Free 0, Plus 49, Pro 199. Investor — Free 0, Pro 49. Billed
**monthly or annually (annual at a discount)**. Developer — always free, all features.
**No trials:** Free accounts explore within Free limits; Plus/Pro-only features are shown
**blurred** as upsell teasers, never usable.

| Role | Plans | Self-signup? |
|------|-------|--------------|
| Developer | Free (all features) | **No** — vetted offline by Adrian, provisioned via one-time invite link. |
| Broker | Free / Plus / Pro | Yes |
| Investor | Free / Pro | Free = **invite-only** (a broker invited them). Pro = self-signup. |

**Broker plan limits (enforced server-side):**
- **Free:** max **1 group**, max **50 members** in it; **unlimited posting/distribution** into
  that group. **Cannot** see the investor-discovery list.
- **Plus (49):** can see the investor-discovery list; contact up to **5 investors / month**.
- **Pro (199):** investor-discovery list; contact up to **25 investors / month**.
  (Other Plus/Pro perks beyond these: **TBD**.)

**Distribution is never limited** — we limit *group creation, member count, and discovery
contact*, not how many listings a broker posts (a Free broker can post 1000 listings in their
one group).

**Visibility invariants — must hold at the database (RLS) layer, never only in UI:**

1. **Brokers never see other brokers. Ever.** No broker↔broker visibility, no profile view,
   no discovery between brokers. A broker cannot see another broker's groups, investors,
   members or posts.
2. **Discovery is broker↔investor only.** Brokers (Plus/Pro) discover & connect with
   investors; investors (Pro) discover & connect with brokers. The module in the broker view
   is **"Discover Investors"**.
3. **Investors see each other only inside a shared group**, where they may interact (comments,
   etc.). Outside a shared group, investors are invisible to each other.
4. **Investor (Free):** sees a post only if (a) it was sent to a group they belong to or sent
   directly to them, AND (b) it is from a broker they are connected to. Never appears in any
   broker's discovery. No discovery access.
5. **Investor (Pro):** self-registers; can contact/connect any broker; may belong to multiple
   brokers' portfolios (invited, or via accepted connection requests). Appears in broker
   discovery **unless they turn visibility off in settings**.
6. A **post** is visible only to the **groups it was posted into** (a post may span multiple
   groups). Post in groups A,B,C → groups D…Z and their members cannot see it.
7. **Developers are fully isolated** from each other — a developer never sees another
   developer's data. Investors cannot author content; only brokers (custom posts) and
   developers (listings) do.

**Abuse control:** one account per unique **email or phone** (verified) — blocks farming free
accounts. We do **not** police how many brokers contact the same investor.

**Discovery participation (investor visibility) — reciprocity model:**
- Investor (Pro) is **visible in Discovery by default (opt-out)**, so the pool we sell to
  brokers stays full.
- **Reciprocity:** to discover & contact brokers, the investor must themselves be
  discoverable. If they hide, they also cannot cold-contact brokers. (One coupled state, not
  two independent toggles that let them take without giving.)
- The visibility toggle affects **cold discovery only.** A broker the investor is **already
  connected to** (or whom the investor contacted first) can still reach them — consent given
  once persists; never break an in-flight conversation.
- **No time-based cooldown in V1.** Reciprocity already removes most toggle-gaming; add a
  cooldown later only if data shows real abuse. Don't ship punitive friction prematurely.
- Pro investors can send **unlimited** connection requests (broker contact limits are the
  metered side: Plus 5/mo, Pro 25/mo).

## Security model (Adrian's #1 priority — no leaks, ever)

- **Postgres Row-Level Security is the backbone.** Every tenant-scoped table carries the
  owner key (`broker_id`, and where relevant `developer_id`), and access is gated by RLS
  policies keyed on the authenticated `auth.uid()` and role. Even a buggy frontend query
  must be refused by the database. UI checks are convenience, never the security boundary.
- **Index every column used in an RLS policy** (`broker_id`, `group_id`, membership joins).
- Investor↔post visibility is expressed as RLS over group membership + broker connection —
  not as application filtering.
- **The Anthropic + Supabase service keys are server-side only.** Never `NEXT_PUBLIC_*`,
  never imported in a client component, never shipped to the browser. The browser uses the
  Supabase **anon** key under RLS only.
- All privileged work (AI calls, Stripe webhooks, admin/developer approval, OCR) goes
  through route handlers / server actions / Edge Functions — never the client.
- Capture marketing/contact **consent** at investor onboarding (closed-circuit covers most
  of PDPL; WhatsApp share needs explicit opt-in when we build it).
- `.env.local` is gitignored; ship `.env.example` with names only.
- **Developer identity**: developers are vetted offline by Adrian and provisioned via a
  one-time invite — there is no public developer signup. Treat impersonation as a top risk.

## Data access architecture

- No component touches Supabase directly. All data access goes through a typed repository /
  data-access layer in `src/lib/` so the UI stays thin and swappable.
- Server Components by default; `"use client"` only where interactivity demands it.
- Business logic (access rules, plan limits, attention/insight engines, AI prompt builders)
  lives in `src/lib/`, pure and unit-testable. Components stay thin.

## AI layer philosophy (agreed with Adrian — follow strictly)

> **Determinism first. AI only where it earns its place.**

- Anything derivable from the database + rules (to-do lists, insights, benchmarks, lead
  scoring, "what to do next", plan limits) is **pure code**, computed locally. No AI, instant,
  free, testable.
- AI is used **only** for: (1) **extracting structured fields from developer PDFs**
  (vision/document understanding — Claude with vision, not classic OCR), (2) turning cold
  structured data into **natural language** for the user (no raw/technical text), (3)
  drafting/optimizing broker messages and suggestions.
- Cost discipline: cheapest adequate model per job (Haiku for bulk/cheap, Sonnet per-lead,
  Opus only for heavy strategy), **prompt caching** and **Batch API** where possible.
- All AI route handlers validate input, handle API errors gracefully, and return a typed
  error shape the UI can render — never a raw 500.

## PDF → listing pipeline (the hardest, highest-stakes feature)

- A listing has a fixed set of structured fields (~40, exact list **TBD**). A developer
  uploads one or more PDFs; we extract what we can (0%→100% fill); they review/edit/add
  fields; they publish. **Extraction is English-only** — Arabic text in the PDF is ignored;
  we parse only the English content.
- PDFs may be **image-only / scanned** → use **vision / document understanding** (Claude
  vision), not classic OCR.
- **Developer PDFs are large (often hundreds of MB)** — a real cost/perf problem. Enforce
  **page + size limits**, and **preprocess** before the model (pull any text layer,
  downsample/strip heavy images, split per page) so we don't blow vision token cost. Run
  extraction as a **background job**.
- **Malware-scan every uploaded PDF** before processing or storage.
- UX is **"AI suggests, human confirms" field-by-field**, with confidence signals. Never
  silently trust extraction — garbage in = dead reputation.
- **Save as draft / resume** if extraction or the wizard is interrupted — never lose work.

## Listing ownership & customization

- The **developer listing is canonical**. When a broker picks it up they get **their own
  overlay copy** — so 100 brokers customizing "the same" listing = 100 independent copies, no
  edit conflicts.
- The developer sets, **per field**, what a broker may edit. Brokers can only change unlocked
  fields; **critical fields (price, payment plan, RERA/permit, unit counts) stay locked**, so
  brokers cannot corrupt legal/financial data — and the developer therefore does **not** need
  to review each broker's customization (chaos at scale). Wrong data in *unlocked* fields is
  the broker's responsibility. *(This is the answer to "should the developer see every
  customization?": no — bound the risk with field-level locks instead.)*
- **Off-plan status** (units available, types, prices) updates **daily**, primarily via
  **CSV upload** by the developer (manual entry is too heavy), with manual edits also allowed.
  A broker can request an update if the developer forgets. When a listing changes, **notify
  brokers and mark in the UI** that it was updated / already distributed.
- **Developer analytics** per listing: brokers who picked it up, views, investor interactions,
  conversion rate. Be smart/conservative about what's exposed.

## Operations & integrations

- **Notifications:** in-app + email now; **push** later (when a mobile app exists); **WhatsApp**
  integration only if it stays cheap.
- **Investor invite flows:** (a) **magic link** — broker sends a link, investor creates the
  account + fills their data; (b) **broker pre-fills** the investor's data and group(s) and
  sends an invite — on accept the investor only sets a password. Magic links must be
  **single-use, expiring, scoped** to the inviting broker + selected groups.
- **Account deletion / retention:** soft-delete with a retention window (keep data for a
  period, subject to UAE law / PDPL) — not an immediate hard cascade-delete.
- **English-only, desktop web-app first.** Mobile app comes later (we start desktop). No RTL
  needed for V1.

## Engagement, comments & group privacy

- Investors can **react** to a broker's post: **Like / Save for later / Interested**. Reactions
  are **private to the broker** (lead intelligence) — investors never see *who* reacted, at
  most an **anonymized aggregate count** as social proof. The broker gets notifications +
  per-post analytics from them.
- Investors can **comment** on a post. Comments are **async — no realtime chat.**
- **Per-group "Private mode" toggle (default OFF = open, WhatsApp-style):**
  - **OFF (default):** group members see each other and see each other's comments on a post.
  - **ON:** members cannot see each other; each investor's comments are visible **only to the
    broker** (private Q&A).
- Moderation: the broker can delete comments. Reporting is a later addition.

## Domain specs (read on demand — keeps CLAUDE.md lean)

- `docs/domain/investor-profile.md` — investor account fields, preference enums, settings, system data.
- `docs/domain/deals.md` — the deal pipeline stages (EOI → … → Oqood).

## Figma → code workflow (how we build the front end)

**Figma is the single source of truth for UI.** Adrian's designs are customized UntitledUI;
we build from his Figma via the Figma MCP, not from any third-party component library.

1. **Audit before building any page.** When Adrian asks for a page/screen, FIRST review it
   across every angle — regulations/UAE law (RERA/Trakheesi, PDPL), UX, UI, security,
   edge/corner cases, data model implications — and report findings. Adrian decides what we
   build and what we skip. Only then write code.
2. **Component taxonomy.** Components are named so Adrian can say "use `Button/primary/md`"
   and it maps to one place. Maintain the taxonomy as the design system grows
   (`src/components/` + a living index). Promote a component to the design system when a
   second page needs it.
3. Build foundation (tokens → primitives) first, then pages, pulling/promoting components as
   pages demand. Avoid building components no page uses.
4. Once the design system is mature, simple screens may be built directly from prompts,
   skipping Figma — Adrian's call, case by case.

## Design system

- Tokens extracted from Figma into Tailwind v4 `@theme` (colors, spacing, typography,
  radius). Keep parity with Figma variable names where sensible.
- Clean, premium, minimal — this is a product sold as polished and "AI-powered". No emoji in
  the UI. Designed empty states, not blank screens.
- Dark mode: **TBD** (check the Figma — do not assume).

## Conventions

- TypeScript strict; no `any`, no `@ts-ignore`. Fix root causes, never suppress.
- File names kebab-case; components PascalCase.
- Server components by default; `"use client"` only where needed.
- Commit style: short imperative subject; body explains why. Commit/push only when Adrian asks.
- Token efficiency: work in small, verified vertical slices. Don't generate dozens of files
  at once. Read these rules once instead of re-deriving.

## Roadmap / phasing

- **Phase 0 (now):** foundation — tokens, primitives, component taxonomy; then the **Broker
  module** (Adrian's chosen starting point; finalized in Figma). Build a first vertical slice
  end-to-end (auth + RLS + one real flow) before scaling to all screens.
- Broker module sub-modules (from Figma): Create account + Onboarding, Dashboard, Add new
  post, My Posts, Create new group, Groups, Add new member, My Investors, My deals, Upgrade,
  Discover investors *(WIP — wireframes only)*.
- Later: Developer module, Investor module, PDF pipeline, Stripe, WhatsApp share, UAE Pass.

## Collaboration style (how Adrian and I work)

Adrian is the founder. Treat this as a long-term partnership; think like an entrepreneur
building the product. **Reply in Romanian**, warm and direct.

- **Challenge me.** Don't agree by default. When something is wrong, risky, or sub-optimal,
  say so with reasons and propose the better option. Bring innovative, up-to-date ideas.
- **Be honest about the scary stuff** — regulation, security, adoption, cost — early, not after.
- **Security is non-negotiable.** No leaks, no data exposed across tenants. RLS first.
- **Work autonomously to completion**, then self-verify and report with proof. Don't ask
  permission at every step.
- **Audit before building** any page (see Figma workflow).
- **Don't work on live / don't push** until Adrian says so. Develop locally / on a branch.
- UAE-specific: data residency in-region (Supabase ME region + matched Vercel function
  region); RERA/Trakheesi advertising permits and PDPL consent are live concerns to track.
