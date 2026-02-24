import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => ({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID
      ? [
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
          (await import("@replit/vite-plugin-dev-banner")).devBanner(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.url, "../client/src"),
      "@shared": path.resolve(import.meta.url, "../shared"),
      "@assets": path.resolve(import.meta.url, "../attached_assets"),
    },
  },
  root: path.resolve(import.meta.url, "../client"),
  build: {
    outDir: path.resolve(import.meta.url, "../dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    // Removed proxy for Vercel deployment
  },
}));
