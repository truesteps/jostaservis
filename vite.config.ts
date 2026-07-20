import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: ['chrome87', 'edge88', 'firefox78', 'safari15'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Consumed by vite-ssg. See https://github.com/antfu-collective/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Inline critical CSS into each pre-rendered page for faster first paint / better SEO.
    beastiesOptions: {
      preload: 'media',
    },
  },
})
