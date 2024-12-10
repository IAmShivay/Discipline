// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker"; // Type checking and dependency audit
import visualizer from "rollup-plugin-visualizer"; // Visualize bundle sizes
import compression from "vite-plugin-compression"; // Gzip compression for assets
import { imagetools } from "vite-imagetools"; // Optimize images

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }), // Enable TypeScript type checking
    // visualizer({ filename: "./dist/stats.html", open: true }), // Visualize bundle size
    compression(), // Compress output files
    imagetools(), // Optimize images
  ],
  optimizeDeps: {
    exclude: ["lucide-react"], // Exclude specific dependencies
    include: ["react", "react-dom", "react-router-dom", "redux", "react-redux"], // Include critical dependencies
  },
  build: {
    target: "esnext", // Use modern browser targets
    minify: "esbuild", // Esbuild is faster than Terser
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable excessive code splitting
      },
    },
  },
  server: {
    hmr: { overlay: false }, // Disable HMR overlay for cleaner dev experience
  },
});
