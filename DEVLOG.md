# Development Log

## Day 1 — 2026-05-08
**Hours worked:** 5
**What I did:** Initialized the React + Vite project. Setup Tailwind CSS and shadcn components. Built the landing page UI.
**What I learned:** Vite's incredibly fast HMR makes styling with Tailwind seamless.
**Blockers:** Had some minor issues configuring `tsconfig.json` for paths.
**Plan for tomorrow:** Build the Audit form and global state.

## Day 2 — 2026-05-09
**Hours worked:** 6
**What I did:** Implemented `audit-form.tsx`. Connected Zustand store. Started API integration. Fixed VS Code CSS warnings by ignoring unknown at-rules.
**What I learned:** Zustand is much more lightweight than Redux for simple form persistence.
**Blockers:** Ran into CORS issues and a major payload mismatch between the frontend structure and the backend schema.
**Plan for tomorrow:** Fix the payload mismatch, refine the report rendering UI, and finalize documentation.

## Day 3 — 2026-05-10
**Hours worked:** 4
**What I did:** Debugged the payload mismatch. The frontend was sending `name` instead of `toolId`. Fixed `report.tsx` to properly read `toolId` and prevent "Report not found" crashes on the frontend side.
**What I learned:** Always strictly type the API boundaries. A simple UI payload change easily breaks the frontend parsing if not checked thoroughly.
**Blockers:** None currently.
**Plan for tomorrow:** Polish UI charts and prep for launch.
