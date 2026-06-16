# Elm Lodge Kennels — Website Platform Upgrade Proposal
### Migrating from Umbraco (.NET/C#) to Sanity.io + Next.js

Prepared for: Elm Lodge Kennels
Prepared by: [Your Name / Company]
Date: 16 June 2026

---

## 1. Executive Summary

The current Elm Lodge Kennels website (elmlodgekennels.co.uk) runs on **Umbraco 7**, a 10+ year-old CMS built on the legacy ASP.NET MVC (.NET Framework) stack. While the site has served the business well, the underlying platform is now a liability: Umbraco 7 is long past end-of-life, the .NET Framework version it depends on is no longer the modern, supported runtime, and the hosting/licensing model is increasingly costly and inflexible relative to current alternatives.

We propose rebuilding the site on a modern **Sanity.io + Next.js** stack — keeping every feature and page the current site offers, replicating the existing design faithfully, while gaining:

- A modern, fast, secure, and easily maintained platform
- A content editing experience that is dramatically simpler for non-technical staff
- Significantly lower ongoing hosting and maintenance costs
- A foundation that can grow with the business (online booking, availability calendars, reviews, galleries) without re-platforming again

This is a **like-for-like rebuild**: visitors and staff will see the same site they know today, just running on faster, safer, easier-to-manage infrastructure underneath.

---

## 2. Why Move Away from Umbraco?

| Issue | Detail |
|---|---|
| **End-of-life platform** | Umbraco 7 reached end of support; security patches and community support are no longer reliably available. |
| **Legacy .NET Framework** | The site runs on classic ASP.NET MVC / WebForms hybrid (.aspx, masterpages) rather than modern .NET — harder to find developers, harder to host cheaply. |
| **Heavy, server-dependent hosting** | Requires a Windows/IIS server or Azure App Service plan running 24/7, plus a SQL Server database — this is the most expensive class of web hosting. |
| **Clunky editor experience** | Umbraco's backoffice (Rich Text Editor + node tree) is dated and unintuitive for day-to-day content edits compared to modern CMS UIs. |
| **Security exposure** | An unsupported CMS with a public admin login (`/umbraco`) is a known target for automated attacks. |
| **Slow page loads** | Server-rendered ASP.NET pages with jQuery/Bootstrap-era front-end assets are slower than modern statically-generated/edge-rendered pages. |
| **Vendor/skills lock-in** | Fewer developers know legacy Umbraco/WebForms each year, increasing future maintenance costs. |

---

## 3. Why Sanity.io + Next.js?

**Sanity.io** is a modern, API-first "headless" CMS used by companies like Figma, Skims, and Tata. Content is edited in a clean, customisable web Studio and delivered instantly via a fast content API — no servers to patch, no database to manage.

**Next.js** is the industry-standard React framework for building fast, SEO-friendly websites, used by brands like Nike, TikTok, and Hulu's marketing sites. Pages can be pre-rendered for near-instant load times and excellent search engine visibility.

Together they provide:

- **Speed** — pages load in a fraction of the time of the current site (better experience for customers booking boarding, better Google ranking)
- **Security** — no exposed CMS admin panel, no database to breach, no Windows server to patch
- **Editing simplicity** — staff edit prices, news, photos and pages in a clean visual Studio, with instant preview, from any device
- **Lower running cost** — typically hosted for a fraction of the cost of a Windows/SQL Server setup (see Section 6)
- **Future-proofing** — easy to add features later (online booking forms, availability widgets, customer reviews, photo galleries, blog) without another full re-platform

---

## 4. Feature Parity — What Stays the Same

Every feature on the current site has been reviewed in the existing codebase and is accounted for in the new build. **Nothing is lost; the visual design is replicated faithfully.**

| Current Feature | How It's Rebuilt in Sanity + Next.js |
|---|---|
| **Home page with rotating slideshow/welcome panel** | Sanity "Home Page" document with an editable slideshow array (image + caption), rendered as a fast React carousel. |
| **Standard content pages** (with sidebar content panels + features list) | Reusable Next.js page template driven by a flexible Sanity "Page" document, with a portable, block-based body editor (richer and easier than Umbraco's RTE), sidebar panels, and feature grid blocks. |
| **Prices page** (text + optional pricing table) | Dedicated "Prices" document type with a structured table field — easier for staff to update than the current raw HTML table. |
| **Contact form** (name, email, message → emails a configurable recipient, redirects to a thank-you page) | Next.js form posting to a serverless function (e.g. Resend/SendGrid), with the same validation rules (required name, valid email, max-length message) and a configurable recipient/subject/thank-you page per use, managed in Sanity. |
| **News/Articles page** (paginated list of dated articles with summaries) | Sanity "Article" document type (title, date, summary, body, image) with a paginated Next.js listing page — easier to author than the current Umbraco news nodes. |
| **Client/Members area** (login-gated pages) | Re-implemented with secure authentication (e.g. NextAuth) gating specific Sanity-driven pages — same restricted-access behaviour, modern secure login instead of legacy ASP.NET Forms Authentication. |
| **Sitemap page** | Auto-generated from the Sanity page tree — always accurate, zero maintenance. |
| **Site search** | Modern search (e.g. Sanity's built-in search API or Algolia) replacing the legacy Lucene/Examine search — same "search across pages and articles" experience, faster results. |
| **Top & left navigation menus** | Editable navigation structure stored in Sanity, rendered as the same primary/secondary nav, including active-page highlighting. |
| **Footer** (address, phone, email, social links, copyright) | Editable "Site Settings" singleton in Sanity — staff can update contact details and social links without a developer. |
| **Social/affiliation links** (Facebook, Google+/successor, Twitter/X) | Same footer icon links, managed in Site Settings. |
| **Responsive design (Bootstrap-based)** | Faithfully replicated using modern CSS (Tailwind or CSS Modules) matching current breakpoints and look exactly — visitors notice no visual difference. |

**Net result:** the public site looks and behaves the same; everything behind the scenes is faster, safer and easier to update.

---

## 5. What Improves Immediately

- **Page speed** — typically 2–5x faster load times with Next.js static/edge rendering vs. server-rendered ASP.NET
- **Mobile experience** — same responsive design, but faster on mobile data connections
- **SEO** — Next.js's rendering model and clean markup tend to improve Google rankings over time
- **Editing experience** — staff edit content in a modern, visual, real-time-preview Studio rather than Umbraco's dated backoffice
- **Security** — no public CMS admin login to attack, no SQL Server/IIS to patch, fewer moving parts overall
- **Reliability** — content and code are hosted on globally distributed infrastructure (e.g. Vercel + Sanity's CDN) rather than a single server instance

---

## 6. Indicative Costs

These are **ballpark planning figures** for discussion — a fixed quote would follow a short discovery/scoping call.

### One-off build cost

| Item | Estimate |
|---|---|
| Discovery, content audit & data migration planning | £400 – £600 |
| Sanity Studio setup (schemas for all page/content types above) | £800 – £1,200 |
| Next.js front-end build (faithful replication of current design, all pages/templates) | £2,500 – £3,800 |
| Contact form, search, and members-area re-implementation | £600 – £1,000 |
| Content migration (pages, articles, images from current Umbraco site) | £400 – £800 |
| Testing, SEO redirects (old URLs → new), and launch | £400 – £600 |
| **Total estimated build cost** | **£5,100 – £8,000** |

### Ongoing running costs (replacing current Windows/IIS/SQL hosting)

| Item | Estimate |
|---|---|
| Hosting (Vercel — Next.js front-end) | £0 – £20/month (free tier covers most small business traffic) |
| Sanity.io (CMS, content API, image CDN) | £0/month on the free tier for a single-editor site of this size; £15–£20/month if more editors/usage needed |
| Domain & DNS | Unchanged — no new cost |
| Transactional email for contact form (e.g. Resend) | £0/month on free tier (well within typical kennel enquiry volume) |
| **Estimated ongoing cost** | **£0 – £40/month**, vs. typical Windows/SQL CMS hosting of £25–£80+/month |

*Figures exclude VAT and any optional ongoing support/retainer agreement. Exact figures will be confirmed after a short discovery session covering current content volume and any extra requirements.*

---

## 7. Proposed Process & Timeline

| Phase | Activity | Duration |
|---|---|---|
| 1. Discovery | Confirm content inventory, page list, and any must-keep details | 2–3 days |
| 2. Schema & Studio build | Build Sanity content models for every page/content type | 3–5 days |
| 3. Front-end build | Build Next.js templates replicating current design pixel-for-pixel | 7–10 days |
| 4. Content migration | Move existing pages, articles, prices, images into Sanity | 2–4 days |
| 5. Forms, search, members area | Re-implement contact form, search, login-gated pages | 3–5 days |
| 6. QA & client review | Cross-browser/device testing, client sign-off | 3–5 days |
| 7. Launch | DNS cut-over, 301 redirects from old URLs, monitoring | 1 day |

**Estimated total: 4–6 weeks**, depending on content volume and feedback turnaround.

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| SEO impact from platform change | Implement 301 redirects for every existing URL; submit updated sitemap to Google Search Console at launch. |
| Content migration errors | Manual review pass of every migrated page against the live site before launch. |
| Staff need to re-learn the editing tool | Sanity Studio is simpler than Umbraco's backoffice; a short walkthrough/training session will be included. |
| "Client area" login security | Re-built using a current, actively maintained authentication library rather than legacy ASP.NET Forms Authentication. |

---

## 9. Why Act Now

- Umbraco 7 receives no further security updates — every month live increases risk.
- Hosting costs for legacy Windows/.NET sites are rising relative to modern alternatives.
- A faster, more secure site directly benefits enquiry conversion and Google visibility for a local service business that depends on search traffic.
- Migrating now, while the site is small and stable, is far cheaper and lower-risk than migrating later under pressure (e.g. after a security incident or hosting cost increase).

---

## 10. Next Steps

1. Client approval to proceed with discovery phase
2. Confirm any new requirements beyond feature parity (e.g. online booking enquiry, photo gallery, reviews)
3. Agree fixed price and timeline following discovery
4. Kick off build

---

*This proposal is based on a review of the current site's codebase and live site at elmlodgekennels.co.uk. All figures are indicative and subject to confirmation after discovery.*
