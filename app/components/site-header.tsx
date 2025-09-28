import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { to: "/", label: "首页" },
  { to: "/learn", label: "学习路径" },
  { to: "/blog", label: "博客" },
  { to: "/toolkit", label: "工具箱" },
  { to: "/about", label: "关于" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, location.search]);

  return (
    <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/65 dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="container-tight flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-500/90 text-sm font-bold text-white shadow-sm shadow-sky-500/20">
            Z
          </span>
          zaxh.org
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "rounded-full px-3 py-2 transition",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm shadow-slate-900/10 dark:bg-white dark:text-slate-900"
                    : "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/80 dark:hover:text-white",
                ].join(" ")
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">切换导航</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out md:hidden`}
      >
        <nav className="container-tight grid gap-2 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "rounded-2xl px-4 py-3",
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-slate-100/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900",
                ].join(" ")
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
