import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { designerPythonLoader } from '@disguise-one/designer-pythonapi/vite-loader'

export default defineConfig({
  base: './', // Use relative URLs for assets, so it works when hosted in designer
  plugins: [vue(), designerPythonLoader()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'copy-extra-assets',
          generateBundle() {
            if (!existsSync('dist')) {
              mkdirSync('dist');
            }
            copyFileSync('icon.svg', 'dist/icon.svg');
            copyFileSync('d3plugin.json', 'dist/d3plugin.json');
          }
        }
      ]
    }
  }
});
