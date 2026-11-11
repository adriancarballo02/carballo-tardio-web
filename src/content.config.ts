import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada proyecto es una carpeta en src/content/proyectos/<nombre>/ con ficha.md e imágenes.
const proyectos = defineCollection({
  loader: glob({ pattern: '*/ficha.md', base: './src/content/proyectos', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    año: z.number(),
    categorias: z.array(z.enum(['audiovisual', 'fotografia', 'dron', 'producto', 'cine', 'cultura', 'otros'])),
    cliente: z.string().optional(),
    servicios: z.array(z.string()).default([]),
    resumen: z.string(),
    portada: image(),
    miniatura: z.enum(['horizontal', 'vertical', 'panoramica', 'cuadrada']).default('horizontal'),
    peso: z.number().min(1).max(3).default(2),
    destacado: z.boolean().default(false),
    orden: z.number().default(99),
    video: z.string().url().optional(),
    provisional: z.boolean().default(false),
  }),
});
export const collections = { proyectos };
