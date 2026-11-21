---
name: slide
description: "Use when turning a presentation topic, prompt, notes, or outline into one or more slides in this Astro/Reveal.js workspace. Ask whether to follow a design reference or improvise, then create varied, on-theme slides."
argument-hint: "Describe the slide or deck topic; include audience, content, and any design reference if available."
---

# Slides from a Prompt

Create presentation slides from a user's brief in this Astro and Reveal.js project. Use the existing deck theme and logo, and choose a layout that suits each slide's purpose rather than repeating one layout throughout.

## Intake

- Identify whether the user wants one slide, several slides, or a full deck. Reuse details already present in their prompt; do not ask for them again.
- If the user has not supplied a visual reference or design direction, ask: **"Do you have a design prompt or visual reference to follow, or should I improvise a design that fits the deck?"** Accept an attached image or a short style description as a reference.
- If the user says to improvise, choose a clear direction that fits the established blue-green palette and the slide's content. Do not keep asking for design details.
- For a multi-slide request, ask for the audience, desired takeaway, and presentation length only when they materially affect the content or structure.
- If it is unclear whether new material should replace the current sample deck or be appended, ask before removing existing slides.
- Use user-provided facts and sources. Do not invent statistics, citations, product capabilities, or other factual claims; ask for source material or mark gaps clearly.

## Workflow

1. Read `src/pages/index.astro`, any existing pages under `src/pages/decks/`, `src/components/DeckSlide.astro`, `src/layouts/DeckLayout.astro`, `src/styles/deck-theme.css`, `src/config/deck-theme.ts`, and `src/data/presenter-notes.json` before editing. Preserve existing user-authored material and conventions.
2. For a deck, make a concise story outline before implementation: opening, key points, evidence or example, and takeaway. Use one central message per slide and keep on-slide copy brief.
3. Map each slide to a suitable layout. Existing layouts in `src/pages/index.astro` include:
   - Cover: `title-slide` with the `orbit` prop.
   - Topic introduction: `automation-slide`.
   - Process or sequence: `pipeline-slide`.
   - Big takeaway: `statement-slide`.
   - Side-by-side comparison: `comparison-slide light-slide`.
   - Good-fit versus less-suitable: `fit-slide light-slide`.
4. By default, add or replace slide content in `src/pages/index.astro` and keep the presentation in that single file. Create a separate Astro route under `src/pages/decks/<slug>.astro` only when the user explicitly asks for separate deck files or URLs. Each `<DeckSlide>` is one Reveal.js slide.
5. For each new or replaced root-deck slide, create or preserve a stable `id` and title in `src/data/presenter-notes.json`, then pass its notes with the `notes` prop on `<DeckSlide>`. This keeps the slide and `/notes/` editor connected; use an empty notes string until the user supplies a script.
6. In each deck page, import `DeckLayout` and `DeckSlide` using paths relative to `src/pages/decks/`. `DeckLayout` already imports Reveal.js and the shared theme CSS; `DeckSlide` already adds the configured company logo. Reuse these instead of copying theme or setup code. Use `orbit` only on the opening slide unless the user asks otherwise.
7. Prefer a diagram, comparison, process, or restrained graphic over decorative imagery. Use light backgrounds selectively; maintain contrast and preserve the logo's light-slide treatment. Avoid repeating a layout across adjacent slides when another existing type fits.
8. If no existing layout fits, add the smallest reusable variant to `src/styles/deck-theme.css` and use it in the relevant deck page. Do not duplicate the logo, Reveal.js setup, or shared layout.
9. Use animation sparingly and preserve the existing `prefers-reduced-motion` behavior. Keep the orbit animation limited to slides explicitly using the `orbit` prop.
10. Validate with `nvm use 22.23.4 && npm run build`. For visual changes, use the local browser preview at desktop and mobile sizes, check for clipped text and overlap, and confirm the logo loads. Follow `AGENTS.md` when starting or stopping the Astro dev server.

## Completion

Summarize which deck page and layouts were created or changed, name any content assumptions, report validation, and give the preview URL when the dev server is running.