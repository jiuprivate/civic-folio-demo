import { renderToStaticMarkup } from "react-dom/server";
import { Home } from "../app/pages.jsx";
import { SiteShell } from "../app/site-shell.jsx";

process.stdout.write(
  renderToStaticMarkup(
    <SiteShell path="/">
      <Home />
    </SiteShell>,
  ),
);
