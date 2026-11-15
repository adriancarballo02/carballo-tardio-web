import { getCollection } from 'astro:content';
// Mapa del sitio para buscadores (sin prototipos ni 404).
export async function GET({ site }: { site: URL }) {
  const base = import.meta.env.BASE_URL;
  const fijas = ['', 'proyectos/', 'proyectos/columnas/', 'servicios/', 'estudio/', 'contacto/'];
  const proyectos = (await getCollection('proyectos')).map((p) => `proyectos/${p.id}/`);
  const urls = [...fijas, ...proyectos].map((u) => `  <url><loc>${new URL(base + u, site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
