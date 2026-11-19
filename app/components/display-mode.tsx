import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DISPLAY_MODE_BREAKPOINT,
  DISPLAY_MODE_MEDIA,
  DISPLAY_MODE_STORAGE_KEY,
  parseDisplayMode,
  resolveDisplayMode,
  type DisplayLayout,
  type DisplayModeChoice,
} from "../../lib/display-mode";
import styles from "../styles/display-mode.module.css";

type Snapshot = {
  choice: DisplayModeChoice;
  layout: DisplayLayout;
  ready: boolean;
};
const serverSnapshot: Snapshot = {
  choice: "auto",
  layout: "mobile",
  ready: false,
};
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();
let stopWatching: (() => void) | null = null;
function desktopViewport() {
  return typeof window.matchMedia === "function"
    ? window.matchMedia(DISPLAY_MODE_MEDIA).matches
    : window.innerWidth >= DISPLAY_MODE_BREAKPOINT;
}
function applyChoice(choice: DisplayModeChoice) {
  if (typeof window === "undefined") return;
  const layout = resolveDisplayMode(choice, desktopViewport());
  document.documentElement.dataset.layout = layout;
  document.documentElement.dataset.layoutChoice = choice;
  if (
    snapshot.ready &&
    snapshot.choice === choice &&
    snapshot.layout === layout
  )
    return;
  snapshot = { choice, layout, ready: true };
  listeners.forEach((notify) => notify());
}
/** Also called by the standalone entry point before its first render. */
export function initializeDisplayMode() {
  if (typeof window === "undefined") return;
  let choice = snapshot.choice;
  try {
    choice = parseDisplayMode(
      window.localStorage.getItem(DISPLAY_MODE_STORAGE_KEY),
    );
  } catch {
    /* Display choices also work without browser storage. */
  }
  applyChoice(choice);
}
function chooseDisplayMode(choice: DisplayModeChoice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISPLAY_MODE_STORAGE_KEY, choice);
  } catch {
    /* Keep the selected mode in memory when storage is unavailable. */
  }
  applyChoice(choice);
}
function subscribe(notify: () => void) {
  listeners.add(notify);
  if (!stopWatching && typeof window !== "undefined") {
    initializeDisplayMode();
    const media =
      typeof window.matchMedia === "function"
        ? window.matchMedia(DISPLAY_MODE_MEDIA)
        : null;
    const changedViewport = () => {
      if (snapshot.choice === "auto") applyChoice("auto");
    };
    const changedStorage = (event: StorageEvent) => {
      if (event.key === DISPLAY_MODE_STORAGE_KEY || event.key === null)
        applyChoice(parseDisplayMode(event.newValue));
    };
    if (media && typeof media.addEventListener === "function")
      media.addEventListener("change", changedViewport);
    else if (media && typeof media.addListener === "function")
      media.addListener(changedViewport);
    else window.addEventListener("resize", changedViewport);
    window.addEventListener("storage", changedStorage);
    stopWatching = () => {
      if (media && typeof media.removeEventListener === "function")
        media.removeEventListener("change", changedViewport);
      else if (media && typeof media.removeListener === "function")
        media.removeListener(changedViewport);
      else window.removeEventListener("resize", changedViewport);
      window.removeEventListener("storage", changedStorage);
    };
  }
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) {
      stopWatching?.();
      stopWatching = null;
    }
  };
}
const getSnapshot = () => snapshot;
const getServerSnapshot = () => serverSnapshot;
type DisplayModeContextValue = Snapshot & {
  setChoice: (choice: DisplayModeChoice) => void;
};
const DisplayModeContext = createContext<DisplayModeContextValue>({
  ...serverSnapshot,
  setChoice: chooseDisplayMode,
});
export const useDisplayMode = () => useContext(DisplayModeContext);
export function DisplayModeProvider({ children }: { children: ReactNode }) {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <DisplayModeContext.Provider
      value={{ ...value, setChoice: chooseDisplayMode }}
    >
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <div className={styles.surface}>{children}</div>
      <footer className={styles.switcher} aria-label="Page display settings">
        <div className={styles.switcherInner}>
          <span className={styles.label}>Display mode</span>
          <div
            className={styles.options}
            role="group"
            aria-label="Choose layout"
          >
            {(["auto", "desktop", "mobile"] as const).map((choice) => (
              <button
                type="button"
                key={choice}
                aria-pressed={choice === value.choice}
                onClick={() => chooseDisplayMode(choice)}
              >
                {
                  { auto: "Automatic", desktop: "Desktop", mobile: "Mobile" }[
                    choice
                  ]
                }
              </button>
            ))}
          </div>
        </div>
      </footer>
    </DisplayModeContext.Provider>
  );
}
export default DisplayModeProvider;
