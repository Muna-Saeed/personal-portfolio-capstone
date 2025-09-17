"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Hero section of the landing page with subtle motion and accessible markup.
 * Contains name heading, short bio, and primary CTAs.
 * Assumptions: content is static; animations run on mount.
 */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Hero() {
  return (
    <section
      role="banner"
      aria-label="Portfolio hero section"
      className="relative isolate"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />
        <div className="absolute left-1/2 top-[-10rem] -z-10 -translate-x-1/2 transform-gpu blur-3xl">
          <div className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-indigo-400/40 to-cyan-400/40 opacity-50 dark:from-indigo-600/30 dark:to-cyan-600/30" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:flex lg:items-center lg:gap-x-16 lg:px-8 lg:py-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left"
        >
          <motion.p
            variants={fadeIn}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30"
          >
            Available for freelance work
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Hi, I’m Muna Saeed
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300"
          >
            I’m a full-stack engineer building robust, accessible web applications from database to UI. I work across the stack with React, Next.js, TypeScript, and Node.js—bringing ideas to life with clean code, subtle motion, and thoughtful design.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-x-4 lg:justify-start"
          >
            <Link
              href="/projects"
              aria-label="View my projects"
              className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              aria-label="Contact me"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-800/50 dark:focus-visible:ring-offset-slate-900"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mt-14 w-full max-w-xl lg:mt-0 lg:ml-auto"
          aria-hidden="true"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-cyan-500/30 blur-2xl dark:from-indigo-600/20 dark:to-cyan-500/20" />
            <div className="relative rounded-2xl border border-slate-200/60 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


