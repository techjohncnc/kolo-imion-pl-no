import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative paths make the build work both at username.github.io/repo-name/
  // and in local preview without needing to know the repository name in advance.
  base: './',
});
