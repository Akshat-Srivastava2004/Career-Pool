import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  host: '0.0.0.0',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
