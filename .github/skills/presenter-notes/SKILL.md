---
name: presenter-notes
description: "Use when writing clear, concise presenter notes, speaker notes, a spoken script, or a talk track for one or more slides in this Astro/Reveal.js workspace. Ask which deck and slide to cover."
argument-hint: "Name a deck and slide, or ask for notes for the whole presentation."
---

# Presenter Notes

Create a natural, easy-to-say script for the user's slides. Presenter notes should explain the point of a slide, not merely read its text aloud.

## Intake

1. Read the current slide content in `src/pages/index.astro` and any deck pages under `src/pages/decks/`. When saving notes, also read `src/data/presenter-notes.json` to find the slide IDs and existing notes.
2. If the user has not identified a deck, list available deck titles and ask which one they mean.
3. If the deck is known but the slide is not, list its slides in presentation order with their numbers and titles, then ask which slide they want. Accept a slide number, title, or "all slides".
4. Ask about audience, speaking time, or tone only when it would materially change the script. Otherwise use a clear, conversational tone suitable for a general audience.

## Writing Notes

- Cover every meaningful point on the slide: the main idea, each listed challenge or takeaway, both sides of a comparison, and each important stage, label, or qualification in a diagram. Do not silently drop a point just to keep the script short.
- Before writing, identify the slide's distinct points and make sure each one has a clear place in the script. After writing, check the script against the slide and confirm that none were missed.
- Explain and connect the points in natural spoken language; do not simply read the slide word for word or announce a mechanical “first, second, third” list unless that sounds right for the speaker.
- For one slide, aim for about 30-45 seconds, usually 2-4 short sentences. Coverage takes priority over this target: for a dense slide, use a little more time or group related details clearly rather than omitting content.
- For a full deck, create a separate section for each requested slide, headed by slide number and title. Keep each script concise and add a brief transition only when it helps the flow.
- Mention meaningful graphics when they communicate information; do not spend time describing decorative elements such as the logo or background.
- Explain jargon in plain language when the audience may not know it.
- Use the slide and user-provided context as the source of truth. Do not invent facts, statistics, anecdotes, or claims. If a necessary detail is missing, ask for it or mark a suggestion clearly.
- Preserve the user's intended tone and any explicit fictional framing on the slide.
- Make the notes sound speakable: contractions are fine, sentences should be short, and avoid stiff phrases like "On this slide we can see" unless natural in context.

## Output

- Return the script in chat by default; do not edit project files unless the user asks to save or embed the notes.
- When asked to save notes into the deck, update the matching slide's `notes` value in `src/data/presenter-notes.json`. Preserve other slides' notes and avoid duplicating notes in slide markup. `DeckSlide` renders the notes through Reveal.js's Notes plugin, and the same JSON file is editable in the local `/notes/` browser editor.
- The `/notes/` editor writes to project files through a dev-only local endpoint. Verify saved notes there and run the project build after source changes; do not imply browser editing writes files in a production static build.
- For a full deck, separate scripts clearly so the user can rehearse one slide at a time.
