import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set the output directory to ../server/public
    outDir: path.resolve(__dirname, "../server/public"),
  },
});
