import React from "react";
import {
  BookOpenText,
  Inbox,
  NotebookPen,
  Mail,
  CalendarDays,
  BookMarked,
  ListChecks,
  FolderOpen,
} from "lucide-react";

const icons = {
  claim: NotebookPen,
  response: Inbox,
  contract: BookOpenText,
  letter: Mail,
  hearing: CalendarDays,
  decision: BookMarked,
  collection: ListChecks,
};
export function ServiceIcon({ id, size = 22 }) {
  const Icon = icons[id] || FolderOpen;
  return <Icon size={size} strokeWidth={1.65} aria-hidden="true" />;
}
export function Wordmark() {
  return (
    <a className="wordmark" href="#/" aria-label="Civic Folio home">
      <span className="folio-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      Civic Folio
    </a>
  );
}
