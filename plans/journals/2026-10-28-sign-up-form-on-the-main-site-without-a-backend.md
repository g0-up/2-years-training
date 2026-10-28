---
title: Sign-up form on the main site without a backend
date: 2026-10-28
summary: "Added #dang-ky form posting to a Google Apps Script web app that appends rows to a Google Sheet"
---

# Sign-up form on the main site without a backend

## What happened
Added a shared "Đăng ký tư vấn" section (#dang-ky) after #tuyen-sinh in public/index.html, so all four route pages show it. Fields: họ tên, SĐT, email (required) and lộ trình quan tâm (optional, preset from the route being viewed until the visitor picks one). The 2-year CTA gained an "Đăng ký tư vấn" button.

## Decision
No backend: the form posts (fetch, no-cors, URL-encoded) to a Google Apps Script web app in the form's action; apps-script/dang-ky.gs appends one row per student to a "Đăng ký" sheet. The reply is opaque, so the page can only confirm "sent". The script re-validates every field and stores values with a leading apostrophe, which keeps phone numbers' leading 0 and blocks formula injection. A hidden honeypot field drops bot posts. The script lives outside public/ so Vercel never serves it; setup steps are in its header comment.

## Verification
Node run of the script against fake Sheets services: 11/11 cases pass. Browser run against a local stub endpoint: validation messages and focus, live error clearing, sending state, success reset, route preset and override, honeypot (nothing sent), network failure, empty action. 375px has no horizontal scroll; inputs 48px high.

## Next steps
Deploy the Apps Script, paste its /exec URL into the form's action, deploy the site, and submit once to confirm a row appears.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
