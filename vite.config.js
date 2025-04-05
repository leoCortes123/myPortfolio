import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [react()],
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url.endsWith('.html')) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
        next(); // Continuar sin modificar otros archivos
      });
    },
  },
});
