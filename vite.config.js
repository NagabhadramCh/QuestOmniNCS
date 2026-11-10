import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages ("Deploy from a branch": main, folder /docs) serves this repo at
// https://nagabhadramch.github.io/QuestOmniNCS/ . `npm run build` writes the site into docs/, which is committed.
// Render (static site) builds the same repo at its domain root with BASE_PATH=/ set in the Render environment.
export default defineConfig({
  base: process.env.BASE_PATH || "/QuestOmniNCS/",
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
