import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    // StyleX before React to preserve Fast Refresh (StyleX Vite docs).
    stylex.vite({
      useCSSLayers: true,
    }),
    react(),
  ],
})
