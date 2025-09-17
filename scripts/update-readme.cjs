/*
 Auto-update README Features section between markers.
 Detects present components, pages, api routes, tests, and Mongo usage.
 Idempotent: only replaces content between markers.
*/
const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const readmePath = path.join(repoRoot, "README.md");

function exists(rel) {
  return fs.existsSync(path.join(repoRoot, rel));
}

function detectFeatures() {
  const features = [];
  if (exists("src/components/Navbar.tsx")) features.push("Responsive Navbar with mobile menu");
  if (exists("src/components/Hero.tsx")) features.push("Animated Hero section (Framer Motion)");
  if (exists("src/components/About.tsx")) features.push("About section with skill chart");
  if (exists("src/components/ContactForm.tsx")) features.push("Contact form with a11y validation");
  if (exists("src/components/ProjectCard.tsx")) features.push("ProjectCard component with badges and links");
  if (exists("src/app/projects/page.tsx")) features.push("Projects page (App Router)");
  if (exists("src/app/api/projects/route.ts")) features.push("Projects API (GET/POST)");
  if (exists("src/app/api/projects/[id]/route.ts")) features.push("Project item API (GET/PUT/DELETE)");
  if (exists("src/app/api/contact/route.ts")) features.push("Contact API endpoint");
  if (exists("src/lib/mongo.ts") && exists("src/models/Project.ts")) features.push("Mongoose + Mongo integration");
  if (exists("src/components/ProjectCard.test.tsx")) features.push("Vitest tests for ProjectCard");
  if (exists("src/components/ContactForm.test.tsx")) features.push("Vitest tests for ContactForm");
  return features;
}

function renderList(items) {
  if (!items.length) return "- (No detected features yet)";
  return items.map((i) => `- ${i}`).join("\n");
}

function updateReadme() {
  const startMarker = "<!-- AUTO-FEATURES:START -->";
  const endMarker = "<!-- AUTO-FEATURES:END -->";
  let readme = fs.readFileSync(readmePath, "utf8");

  if (!readme.includes(startMarker) || !readme.includes(endMarker)) {
    const heading = "## Features";
    const block = `${startMarker}\n\n${endMarker}`;
    if (readme.includes(heading)) {
      readme = readme.replace(heading, `${heading}\n\n${block}`);
    } else {
      readme += `\n\n${heading}\n\n${block}\n`;
    }
  }

  const features = detectFeatures();
  const content = renderList(features);

  const startIdx = readme.indexOf(startMarker);
  const endIdx = readme.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return;
  const before = readme.slice(0, startIdx + startMarker.length);
  const after = readme.slice(endIdx);
  const updated = `${before}\n\n${content}\n\n${after}`;
  fs.writeFileSync(readmePath, updated, "utf8");
}

updateReadme();


