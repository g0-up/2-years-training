---
title: Course perks added to the value section
date: 2026-10-26
summary: Added a third block to the shared "Giá trị của mọi khoá học" panel listing the free onboarding steps for every course and the extra perks for courses of 6 months or longer.
---

# Course perks added to the value section

Added a third block (03, "Quyền lợi đi kèm khoá học") to the shared value panel in public/index.html. Because the panel is a shared module moved into each view through `data-slot="gia-tri"`, the block appears on the 2-month, 6-month, 12-month and 2-year pages from one edit.

The block has two groups. The light group lists the free first steps for every course: a 30–45 minute 1-1 talk with a mentor and an entry skills assessment. The navy group lists the perks for courses of 6 months or longer: career guidance with a mentor and a weekly tech and IT hiring newsletter. The 2-month page still shows the second group, labelled by course length, so visitors can see what the longer courses add.

Checked the layout with headless Chrome at 1280px (two columns) and 390px (stacked). Headless Chrome clamps the window to a minimum width, so the phone check used a 390px iframe.

Later the same day, the Vietnamese copy across index.html was rewritten in plainer language for students and sales staff (module C is now "Từ yêu cầu đến sản phẩm thật"), and the 2-year view's top bar, which only held the internal version and source line, was removed.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
