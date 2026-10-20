# Remitly Nabha

A multi-page, front-end clone of a cross-border money transfer website, built with plain **HTML, CSS and vanilla JavaScript** — no frameworks, no build step and no dependencies.

> ### Disclaimer
> **Remitly Nabha is a fictional brand and this is a non-functional practice project.** It is not a real financial service, holds no licence, cannot move money, and is **not affiliated with, sponsored by or endorsed by any real payments company**. All copy, the logo, the illustrations and every exchange rate, fee, delivery estimate and testimonial on the site are original sample content created for this exercise. Built for learning front-end layout and interaction patterns.

## Running it

No install required. Either open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's in it

25 pages covering the full shape of a payments site:

| Area | Pages |
| --- | --- |
| Sending | `index`, `send-money`, `large-transfer`, `countries`, `rates-fees` |
| Receiving | `receive-money`, `card`, `converter` |
| Business | `business` (batch payouts, payouts API, pricing tiers) |
| Company | `about`, `blog`, `blog-post`, `careers`, `newsroom`, `contact` |
| Support & legal | `help`, `security`, `terms`, `privacy`, `licenses`, `accessibility`, `sitemap`, `404` |
| Account | `login`, `signup` |

## Interactive pieces

Everything runs client-side against hard-coded sample rates. There are no network requests, no analytics, no cookies and no backend.

- **Transfer calculator** — 24 currencies, bidirectional conversion (type into either field), currency swap, and Express/Economy speed tiers that change both the fee and the rate margin
- **Currency converter** — forward and inverse rates shown together
- **Country directory** — 140 destinations with live search plus A–Z filtering and an empty state
- **Help centre search** — filters the question list in place
- **Accordions, tab panels and dropdown navigation** — wired with correct `aria-expanded` / `aria-selected` state, arrow-key support and Escape-to-close
- Every form is deliberately inert and shows a toast instead of submitting

## Structure

```
├── index.html          # plus 24 other pages
├── css/styles.css      # the whole design system (tokens, components, responsive)
└── js/
    ├── layout.js       # builds the header, nav and footer, injected into every page
    └── main.js         # calculator, converter, tabs, accordions, search, form guards
```

The header and footer are rendered once in `layout.js` and injected into each page, so navigation stays consistent across all 25 files without a templating step.

## Responsive and accessibility notes

Breakpoints at 1060 / 960 / 760 / 520px, with a hamburger menu below 960px. Horizontal overflow was verified by measuring `document.documentElement.scrollWidth` against the viewport for every page at **320px, 390px and 768px** — all 75 combinations pass.

Targets WCAG 2.2 AA: semantic landmarks, one `<h1>` per page, visible `:focus-visible` rings, a skip link, labelled form fields, 4.5:1 text contrast, decorative art hidden from assistive tech, and `prefers-reduced-motion` respected. Known gaps are listed honestly on the site's own `accessibility.html` page — most notably that it has not been tested with real screen readers.

## Licence

Published as a portfolio piece. The trade marks of any real company referenced by name remain the property of their respective owners.
