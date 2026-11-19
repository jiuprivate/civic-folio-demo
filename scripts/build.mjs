import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const project = new URL("../", import.meta.url);
const renderEntry = await build({
  absWorkingDir: fileURLToPath(project),
  entryPoints: ["scripts/render-home.jsx"],
  outfile: "build-output/render-home.cjs",
  bundle: true,
  write: false,
  packages: "external",
  format: "cjs",
  platform: "node",
  jsx: "automatic",
  loader: { ".module.css": "empty", ".css": "empty" },
});
const initialHome = execFileSync(process.execPath, ["--input-type=commonjs"], {
  cwd: fileURLToPath(project),
  input: renderEntry.outputFiles[0].text,
  encoding: "utf8",
});
const result = await build({
  absWorkingDir: fileURLToPath(project),
  entryPoints: ["app/main.jsx"],
  outdir: "build-output",
  write: false,
  bundle: true,
  minify: true,
  legalComments: "none",
  charset: "utf8",
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
});

const script = result.outputFiles.find((file) => file.path.endsWith(".js"));
const stylesheet = result.outputFiles.find((file) =>
  file.path.endsWith(".css"),
);
if (!script || !stylesheet)
  throw new Error("The HTML needs both JavaScript and CSS.");
const notices = await readFile(
  new URL("THIRD-PARTY-NOTICES.txt", project),
  "utf8",
);
const mark =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect x="12" y="3" width="23" height="29" rx="4" fill="#bfceb3"/><rect x="8" y="7" width="23" height="29" rx="4" fill="#eddeb5"/><rect x="4" y="11" width="23" height="27" rx="4" fill="#204c3e"/><path d="M9 18h12m-12 5h9" stroke="#f7ebce" stroke-width="2"/></svg>';
const html = [
  "<!doctype html>",
  '<html lang="en-US"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<meta name="referrer" content="no-referrer">',
  "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'\">",
  '<meta name="description" content="Explore practical tools for everyday California civil matters with Civic Folio.">',
  '<meta name="theme-color" content="#faf9f4">',
  "<title>Civic Folio · California civil self-help</title>",
  '<link rel="icon" href="data:image/svg+xml,' +
    encodeURIComponent(mark) +
    '">',
  "<style>" +
    stylesheet.text.replace(/<\/style/gi, "<\\/style") +
    "</style></head>",
  '<body><div id="initial-home"><noscript><p class="script-note">Enable JavaScript to open a workspace or edit a worksheet.</p></noscript>' +
    initialHome +
    '</div><div id="root"></div>',
  '<script type="text/plain" id="third-party-notices">' +
    notices.replace(/<\/script/gi, "<\\/script") +
    "</script>",
  "<script>" + script.text.replace(/<\/script/gi, "<\\/script") + "</script>",
  "</body></html>",
].join("\n");
await writeFile(new URL("index.html", project), html, "utf8");
console.log("Created index.html");
