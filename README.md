# Neo Systems website

Static multi-page corporate website for Neo Systems and the NeoTimex product direction.

## Local preview

The site has no framework, package manager, or build step. From the project root:

~~~powershell
python -m http.server 4173 --bind 127.0.0.1
~~~

Open http://127.0.0.1:4173/.

## Project structure

- index.html - Home page
- about.html, services.html, approach.html, contact.html - Core company pages
- neotimex.html - Product-direction page
- terms.html, privacy.html, legal.html - Pre-launch legal page structures
- styles.css and script.js - Shared styling and browser behaviour
- _headers - Cloudflare Pages security headers
- 404.html - Branded missing-page response
- assets/ - Approved visual assets and logo files
- scripts/verify_site.py - Dependency-free static quality check

## Quality check

Run this before opening a pull request:

~~~powershell
python scripts/verify_site.py
~~~

It checks that each HTML page has a title, that local links/assets exist, and that image alternative text is present.

## GitHub review checklist

1. Run the static quality check.
2. Review Home, Services, NeoTimex, and Contact at desktop and mobile widths.
3. Resolve every item in CONTENT_APPROVAL.md before publishing the site.
4. Confirm the production domain, indexing policy, privacy notice, contact route, and legal copy.
5. Open a pull request; do not publish directly from an unreviewed branch.

## Content and launch boundary

The public site intentionally avoids unsupported claims. The NeoTimex page is a product-direction draft, not a verified feature specification. Contact routing and final legal copy need approval before launch.

PROJECT_UNDERSTANDING_AND_INDIA_LAUNCH_READINESS.md documents the current repository evidence and product-source gaps.
