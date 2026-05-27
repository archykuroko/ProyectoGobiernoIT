export type DocType = 'Estratégico' | 'Operativo' | 'Riesgo' | 'Continuidad';

export interface Document {
  id: string;
  code: string;
  title: string;
  type: DocType;
  pages: number;
  date: string;
  author: string;
  summary: string;
  /** Full URL to the hosted PDF. Fill in when available. */
  pdfUrl: string;
}

export const DOCUMENTS: Document[] = [
  {
    id: 'MC-01',
    code: 'MC',
    title: 'Metas Corporativas',
    type: 'Estratégico',
    pages: 6,
    date: '2026·02·10',
    author: 'Dirección General',
    summary:
      'Definición de las metas corporativas que orientan la estrategia institucional de CyberHunters para el ejercicio 2026.',
    pdfUrl: '/docs/Metas%20Corporativas.pdf',
  },
  {
    id: 'MIT-02',
    code: 'MIT',
    title: 'Metas de IT',
    type: 'Estratégico',
    pages: 5,
    date: '2026·02·14',
    author: 'CIO Office',
    summary:
      'Metas tácticas del área de tecnología que dan soporte al cumplimiento de las metas corporativas.',
    pdfUrl: '/docs/Metas%20de%20TI.pdf',
  },
  {
    id: 'CG-03',
    code: 'CG',
    title: 'Cascada de Metas',
    type: 'Estratégico',
    pages: 4,
    date: '2026·02·20',
    author: 'PMO',
    summary:
      'Mapeo que conecta cada meta corporativa con sus respectivas metas de TI, iniciativas y entregables operativos.',
    pdfUrl: '/docs/Cascada%20de%20metas.pdf',
  },
  {
    id: 'ME-04',
    code: 'ME',
    title: 'Mapa Estratégico',
    type: 'Estratégico',
    pages: 3,
    date: '2026·02·22',
    author: 'Strategy Office',
    summary:
      'Representación visual del modelo Balanced Scorecard adaptado al programa CyberHunters.',
    pdfUrl: '/docs/Mapa%20estrategico.pdf',
  },
  {
    id: 'CN-05',
    code: 'CN',
    title: 'Caso de Negocio',
    type: 'Estratégico',
    pages: 9,
    date: '2026·03·02',
    author: 'Finance + CISO',
    summary:
      'Justificación económica del servicio de gestión de vulnerabilidades, con análisis costo-beneficio a 36 meses.',
    pdfUrl: '/docs/Caso%20de%20negocio.pdf',
  },
  {
    id: 'CS-06',
    code: 'CS',
    title: 'Cédula de Servicio',
    type: 'Operativo',
    pages: 7,
    date: '2026·03·15',
    author: 'Service Design',
    summary:
      'Ficha técnica completa del servicio: alcance, entregables, niveles de servicio y modelo de soporte.',
    pdfUrl: '/docs/Cedula%20de%20servicio.pdf',
  },
  {
    id: 'IA-07',
    code: 'IA',
    title: 'Inventario de Activos',
    type: 'Operativo',
    pages: 11,
    date: '2026·03·20',
    author: 'Asset Management',
    summary:
      'Catálogo exhaustivo de activos tecnológicos bajo el alcance del servicio, clasificados por criticidad.',
    pdfUrl: '/docs/Inventario%20de%20activos.pdf',
  },
  {
    id: 'MR-08',
    code: 'MR',
    title: 'Matriz de Riesgos',
    type: 'Riesgo',
    pages: 8,
    date: '2026·03·28',
    author: 'Risk & Compliance',
    summary:
      'Identificación, valoración y tratamiento de los riesgos asociados al servicio y a la operación interna.',
    pdfUrl: '',
  },
  {
    id: 'BT-09',
    code: 'BT',
    title: 'BIA Táctico',
    type: 'Continuidad',
    pages: 6,
    date: '2026·04·05',
    author: 'BCM Team',
    summary:
      'Análisis de impacto al negocio en el plano táctico: procesos críticos, RTO y RPO objetivo.',
    pdfUrl: '',
  },
  {
    id: 'BO-10',
    code: 'BO',
    title: 'BIA Operacional',
    type: 'Continuidad',
    pages: 6,
    date: '2026·04·12',
    author: 'BCM Team',
    summary:
      'Profundización en el análisis de impacto al negocio desde la perspectiva operativa diaria.',
    pdfUrl: '',
  },
  {
    id: 'PC-11',
    code: 'PC',
    title: 'Plan de Continuidad',
    type: 'Continuidad',
    pages: 10,
    date: '2026·04·25',
    author: 'BCM Team + Ops',
    summary:
      'Estrategia integral de continuidad operativa y recuperación ante desastres del servicio CyberHunters.',
    pdfUrl: '',
  },
];
