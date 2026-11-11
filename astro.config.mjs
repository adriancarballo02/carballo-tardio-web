// Carballo Tardío · configuración. Mientras no haya dominio, la web vive en GitHub Pages bajo /carballo-tardio-web/.
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://adriancarballo02.github.io',
  base: '/carballo-tardio-web',
  trailingSlash: 'always',
});
