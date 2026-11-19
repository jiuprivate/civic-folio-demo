import React, { useEffect, useState } from "react";
import { FolderOpen, Menu, X } from "lucide-react";
import { Wordmark } from "./components/brand.jsx";

const nav = [
  ["Services", "/services"],
  ["Examples", "/examples"],
  ["Court guide", "/guide"],
  ["Pricing", "/pricing"],
];
function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <header className="masthead">
      <div className="mast-inner">
        <Wordmark />
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="main-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-nav" data-expanded={open} aria-label="Main navigation">
          {nav.map(([label, to]) => (
            <a
              key={to}
              aria-current={
                path === to || path.startsWith(to + "/") ? "page" : undefined
              }
              href={"#" + to}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="workspace-link"
          href="#/workspace"
          aria-current={path.startsWith("/workspace") ? "page" : undefined}
        >
          <FolderOpen size={17} />
          Workspace
        </a>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Wordmark />
        <p>California civil self-help · Demonstration edition</p>
      </div>
      <nav aria-label="Resources and policies">
        <a href="#/help">Help</a>
        <a href="#/policies/terms">Terms of use</a>
        <a href="#/policies/privacy">Privacy</a>
        <a href="#/policies/fees">Fees and refunds</a>
      </nav>
    </footer>
  );
}

export function SiteShell({ path, children }) {
  return (
<div className="site-shell">
        <Header path={path} />
        <main
          className={path === "/" ? "content home" : "content inner-page"}
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
        <Footer />
      </div>
  );
}
