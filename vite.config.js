import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment to azizbenayed.github.io (user/org site),
// the base should be '/' since it's served from the root.
// If deploying to a project repo (e.g. github.com/azizbenayed/portfolio),
// change base to '/portfolio/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
