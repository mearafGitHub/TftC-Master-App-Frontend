import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: "vite-plugin-react",
      transform(code: string, id: string) {
        if (id.endsWith(".tsx") || id.endsWith(".jsx")) {
          return code.replace(/import React from 'react';/g, "");
        }
        return code;
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
