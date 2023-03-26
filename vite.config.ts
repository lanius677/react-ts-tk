// vite.config.js/ts
import { join } from "path";
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
})