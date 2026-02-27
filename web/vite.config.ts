import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dev (localhost): "/"
  // Build (GitHub Pages project site): "/allisonhou-portfolio/"
  base: command === "build" ? "/allisonhou-portfolio/" : "/",
}));