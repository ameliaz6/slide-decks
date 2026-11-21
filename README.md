# Slide Deck Studio

Astro and Reveal.js project for building presentations with a shared blue-green theme and Kainos logo.

## Requirements

- Node.js `22.23.4` or newer
- npm

## Start the project

From the project root:

```sh
nvm use 22.23.4
npm install
npm run dev -- --background
```

Open the root presentation at <http://localhost:4321/>. The presenter-notes editor is at <http://localhost:4321/notes/>.

Manage the background dev server with:

```sh
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Edit the deck

The presentation lives in `src/pages/index.astro`. Each `<DeckSlide>` is one slide; edit the text inside its headings, paragraphs, and list items. Use the existing slide classes for familiar layouts, and add new layout styles to `src/styles/deck-theme.css` when needed.

The shared setup is in:

- `src/layouts/DeckLayout.astro`: Reveal.js, theme CSS, and presentation controls.
- `src/components/DeckSlide.astro`: shared logo and optional cover orbit.
- `src/config/deck-theme.ts`: logo path and alt text.
- `src/styles/deck-theme.css`: colors, typography, and shared slide styles.

## Presenter notes

Edit notes in the browser at `/notes/` and click **Save notes**. Changes are saved to `src/data/presenter-notes.json`. The editor writes files through a dev-only local endpoint, so it requires the local dev server and is not included in the static production build.

Each notes entry has a stable slide `id`, title, and script. `src/pages/index.astro` passes the matching script into `DeckSlide` using its `notes` prop. To add a slide, add its markup and a matching notes entry.

Press `S` during the presentation to open Reveal.js Speaker View. The current slide stays on the left, its notes appear on the right, and the upcoming-slide preview is hidden. Notes are not shown on the audience slide.

## Build and preview

```sh
npm run build
npm run preview
```
