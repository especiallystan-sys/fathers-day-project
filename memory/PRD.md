# PRD — A Letter For Pappa (Father's Day Memory Website)

## Original Problem Statement
Premium, emotional, interactive Father's Day website dedicated to the user's father — designed as a "digital memory book" rather than a corporate site.

**Theme**: Elegant, emotional, nostalgic, luxurious, heartfelt.
**Palette**: Deep Navy Blue, Charcoal Black, Warm Gold, Soft Cream, White accents.
**Typography**: Playfair Display (headings), Inter (body), Caveat / Dancing Script (handwritten letter & signature).

## User Personas
- **Pranjlee** (daughter, owner of the site) — wants to surprise her father with a personalised, premium-feeling tribute.
- **Pappa** (recipient) — opens a link on Father's Day and is taken through an emotional four-act journey.

## Architecture
- Frontend: React 19 + craco + Tailwind. No backend logic required for this experience.
- Animations: framer-motion (already installed) for fade-ins, layout transitions, and the polaroid → postcard transformation.
- Confetti: canvas-confetti (newly installed).
- Background music: served locally from `/public/audio/background.mp3` (Eternal Hope, royalty-free, Kevin MacLeod).
- Fonts loaded via Google Fonts: Playfair Display, Inter, Caveat, Dancing Script.
- Particles & starfield are pure CSS for zero JS overhead.

## Core Requirements (static)
1. Four-act experience: Surprise → Memory Gallery → Handwritten Letter → Final Closing.
2. Premium polaroid cards (6) that smoothly morph into a postcard modal (~70% screen width) — never a fullscreen image.
3. Background music with mute/play toggle (bottom-left, glassmorphism pill).
4. Confetti celebration when the closing section enters the viewport.
5. Mobile-first, responsive, premium aesthetic; no AI-slop generic gradients.

## What's been implemented (Dec 2025)
- ✅ Surprise landing page with starfield, gold particles, animated emotional copy, glowing "Open My Gift" CTA.
- ✅ Memory Gallery with 6 polaroid cards (tape effect, slight rotation, glassmorphism shadow), each with title + sub-caption.
- ✅ Polaroid → Postcard modal using framer-motion `layoutId` shared element transition. Photo on one side, message + "from Pranjlee" signature on the other, on a parchment background with diagonal gold texture. Backdrop blur. Close button works.
- ✅ Handwritten Letter page — parchment paper with ruled lines, wax seal "P", emotional 7-paragraph letter signed "Pranjlee, your daughter".
- ✅ Final Closing — animated heartbeat heart, "Happy Father's Day, Pappa", thank-you triplet, signed "Pranjlee, your daughter, forever and always". Canvas-confetti fires from both corners + a center burst when the section enters viewport.
- ✅ Music toggle (data-testid `music-toggle-btn`) — auto-starts after opening the gift, toggles between PLAYING ↔ MUSIC, optimistic UI state, no CORS dependency (audio served locally).
- ✅ Fixed pre-existing `webpack-dev-server` v5 incompatibility (pinned to 4.15.2) so the dev server starts cleanly.

## Files
- `/app/frontend/src/App.js` — top-level Surprise/Journey switcher.
- `/app/frontend/src/components/Surprise.jsx`
- `/app/frontend/src/components/Gallery.jsx`
- `/app/frontend/src/components/Letter.jsx`
- `/app/frontend/src/components/Closing.jsx`
- `/app/frontend/src/components/MusicToggle.jsx`
- `/app/frontend/src/components/Particles.jsx`
- `/app/frontend/src/index.css` — fonts, theme, polaroid/postcard/letter styles.
- `/app/frontend/public/audio/background.mp3` — Eternal Hope by Kevin MacLeod (royalty-free).

## Prioritised Backlog
- **P1**: Allow Pranjlee to upload her own photos (replace 6 placeholder Unsplash/Pexels images in `/app/frontend/src/components/Gallery.jsx`). Could be done via simple file replacement in `/public/photos/` and updated img paths.
- **P1**: Add a "Save / Share" footer so other family members can re-share the link with a custom OG preview.
- **P2**: Allow Pappa to record a video or text reply at the end of the journey (would need backend + storage).
- **P2**: Add a tiny family timeline (year by year) between the Letter and Closing.
- **P3**: Backdrop click on postcard modal does not always dismiss (close X works fine) — LOW priority polish.
- **P3**: Bundle a tiny offline fallback animation in case fonts load slowly on a poor network.

## Next Action Items
- Replace placeholder gallery images with real family photos.
- Optionally add an OG image + meta tags so the share preview also feels premium.
