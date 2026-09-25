# Noel Vincent Ramli Portfolio

## What it does
- A single-page editorial portfolio for Noel Vincent Ramli, combining UI/UX, visual design, and creative experiments.
- Opens with a Pac-Man-inspired loading intro that auto-finishes after a short animation and supports Skip / Escape.
- Shows a real Binus Health UI/UX case study in the first project slot, a Munchware visual/content campaign study (`visualStudy`: metadata, summary, 4 highlight numbers from the GA4 deck, 4 key findings, "Download Laporan Lengkap (PDF)" button (red, opens the 12-page Analytics Strategic Deck in a new tab) and "Kunjungi Website" button (https://ecovibes-web.vercel.app/, new tab) directly under the description, 4-image gallery with lightbox) in the second slot, and a StarWave UI/UX case study (slug `starwave`; generic `CaseStudy` shape: problemTitle, 2 personas with meta/quote, 6-stage user journey with mood scores, 5-menu solution, design system palette/typography/spacing, Figma feature chips, 10 labeled screen slots, all filled — 01 Splash Animation, 02 Onboarding, 03 Auth, 04 Home, 05 Interact, 06 Chat Bot, 07 Shop, 08 Profile, 09 Pop-ups & Overlay, 10 About Us; StarWave screens use `bg: "#454545"` letterbox to match the boards) in the third slot. Filters: All, UI/UX, Visual (the "Experiment" filter was retired). Case-study testids are prefixed by `project.slug` (e.g. `binus-health-…`, `starwave-…`); logo covers use the generic `BrandLogoCover` driven by `project.logo`.

## Key flows
1. Visitor skips or waits through the Pac-Man intro.
2. Visitor explores the oversized hero, filters project cards (compact cards: 1 column mobile, 2 tablet, 3 equal columns desktop; landscape cover, 2-line clamped description), and clicks the Binus Health logo cover to open a three-screen quick preview.
3. From the preview, visitors continue into the fully embedded Binus Health case study with Indonesian copy, metadata, problem framing, 3-step design thinking process, persona, 5 solution features, and 8 labeled screen slots.
4. Visitor reads the About section and sends a short contact brief, copies the real email (noelvr67@gmail.com), or opens Instagram (@noelvincentr_), WhatsApp (https://wa.me/6287745071161), or LinkedIn (noel-vincent-ramli-8b71963b3) — all in `contact-channels`, new tab.

## Data model and auth
- No backend data model is required for the current static portfolio experience.
- No authentication or gated areas.
- Contact submission and email copy are UI feedback only in this first layout; no email integration is connected.
- Binus Health has no external case-study or live-site link; visitors remain inside the portfolio.
- All 8 Binus Health screens (Splash/Onboarding/Auth, Home, Cek Kalori, Cek Kantin, Reminder, Analisis, Profil, Support) are filled with the user's Figma boards. Quick-preview slots use Home, Cek Kalori, and Cek Kantin positions.
- Screen slots are landscape (aspect 1.6, object-contain on white) because the uploads are multi-frame boards; clicking a filled slot opens a full-screen lightbox (`screen-lightbox`) in both the quick preview and the full case study.

## Visual direction
- Dark obsidian editorial layout, oversized Sora display type, JetBrains Mono metadata, signal red, Pac-Man yellow, user-provided photography.