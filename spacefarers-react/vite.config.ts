import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/odata": {
        target: "http://localhost:4004",
        changeOrigin: true,
      },
    },
  },
}));
