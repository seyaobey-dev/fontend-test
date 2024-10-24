import { defineConfig } from "vite";
import "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src/client"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vite.setup.ts",
  },
});
