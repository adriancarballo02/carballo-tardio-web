# Carballo Tardío · web

Web del estudio Carballo Tardío, hecha con [Astro](https://astro.build). Se publica sola en GitHub Pages cada vez que se sube un cambio a `main`.

## Añadir un proyecto

1. Crea una carpeta en `src/content/proyectos/` con el nombre del proyecto, por ejemplo `2025-vendimia-en-peque/`.
2. Mete dentro la imagen de portada (`portada.jpg`) y un archivo `ficha.md` copiando la estructura de cualquier proyecto existente.
3. Sube el cambio. En unos minutos está en la web.

Campos de la ficha: `titulo`, `año`, `categorias` (audiovisual, fotografia, dron, producto, cine, cultura, otros), `cliente`, `servicios`, `resumen`, `portada`, `miniatura` (horizontal, vertical, panoramica, cuadrada), `peso` (1 a 3), `destacado` (aparece en portada), `orden`, `video` y `provisional`.

## Trabajar en local

```
npm install
npm run dev
```
