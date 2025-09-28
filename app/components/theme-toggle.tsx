import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";
const themeOrder = ["light", "dark", "system"] as const;

export type Theme = (typeof themeOrder)[number];

const isBrowser = typeof window !== "undefined";

function applyTheme(nextTheme: Theme) {
  if (!isBrowser) return;

  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark =
    nextTheme === "dark" || (nextTheme === "system" && prefersDark);

  root.dataset.theme = isDark ? "dark" : "light";
  root.classList.toggle("dark", isDark);

  if (nextTheme === "system") {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, nextTheme);
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    if (!isBrowser) return;
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    setTheme("system");
    applyTheme("system");
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const subscription = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    subscription.addEventListener("change", listener);
    return () => subscription.removeEventListener("change", listener);
  }, [theme]);

  const label = useMemo(() => {
    switch (theme) {
      case "light":
        return "浅色模式";
      case "dark":
        return "深色模式";
      default:
        return "跟随系统";
    }
  }, [theme]);

  function handleToggle() {
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 focus-visible:outline-hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      title={`切换主题：${label}`}
      aria-label={`切换主题：${label}`}
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.5 12H3m18 0h-1.5M5.28 5.28 6.34 6.34m11.32 11.32 1.06 1.06M5.28 18.72 6.34 17.66m11.32-11.32 1.06-1.06M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
          />
        </svg>
      ) : theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2m6.36.64-1.42 1.42M21 12h-2m-.64 6.36-1.42-1.42M12 21v-2m-6.36.64 1.42-1.42M3 12h2m.64-6.36 1.42 1.42"
          />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )}
    </button>
  );
}
