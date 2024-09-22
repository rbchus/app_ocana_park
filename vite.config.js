import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://app-ocana-park.onrender.com/',
  server: {
    historyApiFallback: true, // Agrega esta línea
  },
})
