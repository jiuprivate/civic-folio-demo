import React, { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  Directory,
  ServiceEntry,
  Examples,
  Guide,
  Policy,
  Help,
} from "./pages.jsx";
import {
  Questions,
  Workspace,
  WorkspaceIndex,
  PageTitle,
} from "./components/workspace.jsx";
import { SiteShell } from "./site-shell.jsx";
import { byId } from "../lib/catalog.js";
import DisplayModeProvider, {
  initializeDisplayMode,
} from "./components/display-mode.tsx";
import "./styles/site.css";

function subscribe(f) {
  window.addEventListener("hashchange", f);
  return () => window.removeEventListener("hashchange", f);
}
function readPath() {
  return window.location.hash.slice(1).replace(/\/+$/, "") || "/";
}
function resolvePage(path, drafts, changeDraft) {
  const parts = path.split("/").filter(Boolean);
  const [route, id] = parts;
  const service = Object.prototype.hasOwnProperty.call(byId, id) ? byId[id] : undefined;
  if (!route) return ["California civil self-help", <Home />];
  if (parts.length <= 2) {
    if (route === "services" && !id) return ["Services", <Directory />];
    if (route === "pricing" && !id)
      return ["Service prices", <Directory pricing />];
    if (route === "services" && service)
      return [service.heading, <ServiceEntry service={service} />];
    if (route === "examples" && (!id || service))
      return [
        service?.example.title || "Examples",
        <Examples service={service} />,
      ];
    if (route === "workspace" && !id)
      return ["Your folios", <WorkspaceIndex drafts={drafts} />];
    if (route === "workspace" && service)
      return [
        service.document,
        <Workspace
          key={id}
          service={service}
          drafts={drafts}
          changeDraft={changeDraft}
        />,
      ];
    if (route === "guide" && !id) return ["California court guide", <Guide />];
    if (route === "questions" && !id)
      return ["General questions", <Questions />];
    if (route === "help" && !id) return ["Help", <Help />];
    if (route === "policies" && ["terms", "privacy", "fees"].includes(id))
      return [
        {
          terms: "Terms of use",
          privacy: "Privacy notice",
          fees: "Fees and refunds",
        }[id],
        <Policy kind={id} />,
      ];
  }
  return [
    "Page not found",
    <>
      <PageTitle
        title="Page not found"
        body="This page is not part of the showcase."
      />
      <a className="button primary" href="#/">
        Return home
      </a>
    </>,
  ];
}
function App() {
  const path = useSyncExternalStore(subscribe, readPath);
  const [drafts, update] = useState({});
  useLayoutEffect(() => {
    document.getElementById("initial-home")?.remove();
  }, []);
  const [title, element] = resolvePage(path, drafts, (id, value) =>
    update((old) => ({ ...old, [id]: value })),
  );
  useEffect(() => {
    document.title = title + " · Civic Folio";
    window.scrollTo(0, 0);
  }, [path, title]);
  return (
    <DisplayModeProvider>
      <SiteShell path={path}>{element}</SiteShell>
    </DisplayModeProvider>
  );
}
initializeDisplayMode();
createRoot(document.getElementById("root")).render(<App />);
