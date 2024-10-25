import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vite.setup.ts",
    exclude: [
        "src/client/_e2e_/e2e.spec.ts", 
        "**/node_modules/**"
    ],
  },
})