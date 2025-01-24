import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [/\.keep$/], // Exclude .keep files from the bundle
    },
  },
  esbuild: {
    jsx: "automatic", // Ensure JSX runtime is set to automatic
  },
});
