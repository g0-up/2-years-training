---
title: Fix menu highlight for nested and short sections
date: 2026-10-27
summary: "Scrollspy now marks the last menu target whose top passed 40% of the viewport, fixing wrong highlights on the pricing page"
---

# Fix menu highlight for nested and short sections

## What happened

On the pricing page (`public/hoc-phi-530f586a.html`), clicking the sticky menu scrolled to the right place but highlighted the wrong item. Clicking "Quyền lợi" lit "Ưu đãi sớm", and clicking "Ưu đãi sớm" lit "Quyền lợi". Reproduced with agent-browser at 1366x900.

## Root cause

The scrollspy in `public/assets/site.js` used an IntersectionObserver band at 45–50% of the viewport and only reacted when a target entered the band, never when it left. The roadmap pages use sibling sections, so that worked there. The pricing page nests `#quyen-loi` inside `#uu-dai`, so leaving the inner block fired nothing and the old highlight stayed. `#quyen-loi` is also about 330px tall, so after a menu jump its bottom sits above the band and it could never be matched on its own.

## Fix

The scrollspy is now a rAF-throttled scroll and resize listener. The active link is the last menu target, in menu order, whose top has passed 40% of the viewport. Menus of hidden views and targets without layout are skipped.

Behaviour change: at the very top of a page, before the first target, no menu item is highlighted. Previously the last highlight stayed.

## Verification

- Pricing page, desktop 1366 and mobile 390: every menu click highlights its own item, in any order.
- `index.html` over a local server: all menu items on the 2-year, 6-month, 12-month and 2-month views highlight correctly, including `#mod-b-dau-ra`, which is nested inside `#mod-b`.

## Next steps

None required.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
