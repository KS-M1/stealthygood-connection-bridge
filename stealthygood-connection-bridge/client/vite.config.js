import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3001,           // Force port 3000
    strictPort: true      // Fail if port 3000 is taken (no auto-switching)
  }
})
