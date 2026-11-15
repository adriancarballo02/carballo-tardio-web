// Servicios de Carballo Tardío, ordenados por lo que necesita quien contrata.
// categorias: qué proyectos del archivo se enseñan como ejemplo.
export interface Servicio { slug: string; nombre: string; hacemos: string; resuelve: string; proyectos: string[]; categorias: string[] }
export const SERVICIOS: Servicio[] = [
  {
    slug: 'campanas', nombre: 'Campañas y vídeo de marca',
    hacemos: 'Ideamos, rodamos y montamos piezas para marcas, empresas y negocios: desde un spot o una campaña para redes hasta el vídeo que explica qué hace una empresa.',
    resuelve: 'Contar qué ofreces de forma que se recuerde, con imágenes cuidadas y un mensaje claro.',
    proyectos: ['Spot y campaña', 'Vídeo corporativo', 'Piezas para redes', 'Vídeo de producto'],
    categorias: ['audiovisual', 'producto'],
  },
  {
    slug: 'fotografia', nombre: 'Fotografía',
    hacemos: 'Sesiones de retrato, documental, producto y espacios, con la misma atención a la luz y la composición que en un rodaje.',
    resuelve: 'Tener imágenes propias, coherentes entre sí, para la web, la prensa, el catálogo o las redes.',
    proyectos: ['Retrato', 'Fotografía de producto', 'Reportaje documental', 'Espacios y arquitectura'],
    categorias: ['fotografia'],
  },
  {
    slug: 'dron', nombre: 'Dron e imagen aérea',
    hacemos: 'Planos aéreos de vídeo y fotografía para territorio, arquitectura, eventos y producciones audiovisuales.',
    resuelve: 'Enseñar un lugar, un edificio o un paisaje desde un punto de vista que no se consigue desde el suelo.',
    proyectos: ['Territorio y paisaje', 'Arquitectura', 'Eventos', 'Planos para cine y publicidad'],
    categorias: ['dron'],
  },
  {
    slug: 'cultura', nombre: 'Cultura, territorio y patrimonio',
    hacemos: 'Piezas para instituciones, museos, festivales, ayuntamientos y proyectos culturales: documentación, difusión y piezas propias sobre un lugar o una tradición.',
    resuelve: 'Dar a conocer un proyecto cultural o un territorio con rigor y con una mirada que no caiga en el tópico.',
    proyectos: ['Documentación de proyectos', 'Difusión institucional', 'Patrimonio y oficios', 'Festivales y eventos culturales'],
    categorias: ['cultura'],
  },
  {
    slug: 'cine', nombre: 'Cine y documental',
    hacemos: 'Desarrollamos y producimos cortometrajes, documentales y proyectos de autor, propios o en colaboración con otras productoras.',
    resuelve: 'Llevar una historia desde la idea hasta la pantalla, con criterio narrativo en cada fase.',
    proyectos: ['Cortometraje', 'Documental', 'Videoclip', 'Coproducción'],
    categorias: ['cine'],
  },
  {
    slug: 'direccion', nombre: 'Dirección creativa y guion',
    hacemos: 'Pensamos qué contar y cómo: conceptos, guiones, tratamientos y dirección de arte para que una pieza tenga sentido antes de rodarla.',
    resuelve: 'Saber qué hacer antes de gastar en producción, o dar dirección a un proyecto que ya está en marcha.',
    proyectos: ['Concepto de campaña', 'Guion y tratamiento', 'Dirección de arte', 'Narrativa de marca'],
    categorias: [],
  },
];
