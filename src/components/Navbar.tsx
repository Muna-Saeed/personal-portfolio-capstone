"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Responsive site navbar with a mobile menu toggle.
 * Assumptions: in-page anchors (#projects, #about, #contact) exist on the page.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header role="banner" className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="#home" className="text-base font-semibold text-slate-900 dark:text-white" aria-label="Go to home">
          Muna Saeed
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="hidden gap-6 md:flex">
          <Link href="/projects" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Projects</Link>
          <Link href="#about" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">About</Link>
          <Link href="#contact" className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Contact</Link>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-3 md:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <Link href="/projects" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Projects</Link>
            <Link href="#about" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">About</Link>
            <Link href="#contact" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}


