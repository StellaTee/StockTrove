import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint';
//import '@testing-library/jest-dom'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  eslint({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  
})
