/** Display preference only. Never store account, order, or case content here. */
export const DISPLAY_MODE_STORAGE_KEY = "civic-folio.display-mode.v1";
export const DISPLAY_MODE_MEDIA = "(min-width: 900px)";
export const DISPLAY_MODE_BREAKPOINT = 900;
export type DisplayModeChoice = "auto" | "desktop" | "mobile";
export type DisplayLayout = Exclude<DisplayModeChoice, "auto">;

export function parseDisplayMode(value: unknown): DisplayModeChoice {
  return value === "desktop" || value === "mobile" ? value : "auto";
}

export function resolveDisplayMode(
  choice: DisplayModeChoice,
  matchesDesktop: boolean,
): DisplayLayout {
  return choice === "auto" ? (matchesDesktop ? "desktop" : "mobile") : choice;
}
