# Civic Folio

Civic Folio is an English-language showcase of low-cost civil legal self-help for California residents. Start with a claim, a response, a contract or a demand letter. The service directory also covers incoming letters, hearings, decisions and judgment collection. Each service includes a fictional example and an editable worksheet you can download or print.

The complete site is in [index.html](index.html). Download the repository and open that file in a modern browser to use the demo offline. Internet access is needed only when you follow a link to an official resource.

## Source guide

- [Application entry point](app/main.jsx) handles navigation and starts the interactive app.
- [Public page components](app/pages.jsx) render the homepage, service directory, pricing, examples and court guide.
- [Workspace](app/components/workspace.jsx) handles guided intake, editing, printing and text export.
- [Service catalog](lib/catalog.js) contains the sample matters, illustrative prices and official California reference links.
- [Styles](app/styles/) and the [shared page layout](app/site-shell.jsx) control the presentation.

## Build and run

Use Node.js 20 or later. From the repository root, run

```sh
npm ci
npm run build
npm start
```

Open `http://127.0.0.1:4173` for the local preview. The [build script](scripts/build.mjs) writes `index.html` at the repository root and embeds the homepage for immediate display. To publish edits, commit the updated source and rebuilt `index.html` together on `main`.

## Demo data

All parties, matters and prices are examples. The demo processes entries in the current browser tab. Reloading clears the working notes. The browser stores only the display preference. No account, backend, model credentials or payment setup is required.

[Third-party notices](THIRD-PARTY-NOTICES.txt) are also embedded in the standalone page.
