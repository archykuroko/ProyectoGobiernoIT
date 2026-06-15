import { useState, useCallback, useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { DollarSign, Users, Settings2, GraduationCap, ArrowUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../../components/DocContent/Reveal';

interface Layer {
  c: string;
  Icon: LucideIcon;
  name: string;
  strs: string[];
}

interface MapData {
  objective: string;
  layers: Layer[];
  // [fromLayer, fromCard, toLayer, toCard] — layers: 0=Fin, 1=Cli, 2=Pro, 3=Apr (top→bottom render)
  // Arrows go upward: Apr(3)→Pro(2)→Cli(1)→Fin(0)
  connections: [number, number, number, number][];
}

const ACCENT: Record<string, string> = {
  fin: 'oklch(0.88 0.22 135)',
  cli: 'oklch(0.78 0.13 230)',
  pro: 'oklch(0.83 0.17 70)',
  apr: 'oklch(0.72 0.15 310)',
};

const MAPS: MapData[] = [
  {
    objective: 'Mejorar los márgenes de utilidades en 6% para el cierre del ejercicio fiscal del año 2026.',
    connections: [
      [3,0,2,0], [3,0,2,2], [3,1,2,1], [3,2,2,2], [3,2,2,0], [3,2,2,4], [3,3,2,3], [3,3,2,2], [3,4,2,3],
      [2,0,1,0], [2,0,1,1], [2,1,1,0], [2,2,1,2], [2,2,1,1], [2,3,1,3], [2,3,1,1], [2,3,1,4], [2,4,1,0],
      [1,0,0,3], [1,1,0,0], [1,1,0,2], [1,2,0,1], [1,2,0,4], [1,3,0,2], [1,4,0,2],
    ],
    layers: [
      { c: 'fin', Icon: DollarSign,    name: 'Financiero',               strs: ['Acceder a mejores planes de inversión de capital.', 'Reducir costos de marketing.', 'Mejorar el margen de utilidad.', 'Aumentar las ganancias por clientes activos.', 'Reinvertir las utilidades mensuales para el crecimiento del negocio.'] },
      { c: 'cli', Icon: Users,         name: 'Clientes / Usuarios',      strs: ['Mejorar la satisfacción y percepción del cliente.', 'Mejorar la experiencia de la primera impresión del producto.', 'Aumentar las recomendaciones del servicio brindado.', 'Mejorar la orientación inicial del uso del producto.', 'Buena percepción del cliente al soporte brindado.'] },
      { c: 'pro', Icon: Settings2,     name: 'Interno / Procesos',       strs: ['Automatizar flujos de trabajo de las diferentes áreas del negocio.', 'Reducir costos de infraestructura.', 'Reducir tiempos de entrega.', 'Aumentar la productividad del equipo de trabajo.', 'Mejorar la comunicación entre diferentes áreas.'] },
      { c: 'apr', Icon: GraduationCap, name: 'Aprendizaje y crecimiento', strs: ['Capacitaciones para mejorar la eficiencia del desarrollo con herramientas de IA.', 'Programas de certificación para la gestión de costos en la nube.', 'Capacitación a áreas no técnicas con herramientas low-code.', 'Sistema de incentivos por eficiencia para los empleados.', 'Esquemas de trabajo más flexibles para el personal.'] },
    ],
  },
  {
    objective: 'Implementar políticas internas de seguridad para reducir las fugas de información en un 80% y los ataques en un 30%, para el cierre del año 2026.',
    connections: [
      [3,0,2,0], [3,0,2,3], [3,1,2,1], [3,1,2,4], [3,2,2,2], [3,3,2,3], [3,3,2,2], [3,4,2,4],  [3,4,2,3],
      [2,0,1,1], [2,1,1,2], [2,2,1,2], [2,2,1,1], [2,3,1,0], [2,3,1,4], [2,3,1,3], [2,4,1,0],
      [1,0,0,0], [1,0,0,2], [1,1,0,1], [1,1,0,4], [1,2,0,3], [1,3,0,2], [1,3,0,4], [1,4,0,4],
    ],
    layers: [
      { c: 'fin', Icon: DollarSign,    name: 'Financiero',               strs: ['Evaluar la eficiencia de las licencias actuales frente al costo de los riesgos que previenen.', 'Crear un fondo de reserva para contingencia de riesgos tecnológicos.', 'Optimizar los costos relacionados a consultoría externa.', 'Disminuir los costos operativos de limpieza y recuperación tras un ataque.', 'Priorizar inversiones en los activos de información críticos.'] },
      { c: 'cli', Icon: Users,         name: 'Clientes / Usuarios',      strs: ['Informar a los clientes sobre cómo se protegen sus datos.', 'Garantizar tiempos mínimos de comunicación ante cualquier sospecha de fuga.', 'Protección personalizada para directivos y personal con acceso a datos sensibles.', 'Alinear con los usuarios internos las políticas de seguridad.', 'Facilitar el acceso seguro reduciendo el exceso de contraseñas.'] },
      { c: 'pro', Icon: Settings2,     name: 'Interno / Procesos',       strs: ['Estandarizar la seguridad de laptops y móviles corporativos.', 'Revocación trimestral de permisos innecesarios en servicios y bases de datos.', 'Verificación continua de identidad para cada intento de conexión interna.', 'Escaneo y parchado preventivo de servidores y endpoints.', 'Bloqueo automático de transferencia de datos confidenciales a nubes públicas o USBs.'] },
      { c: 'apr', Icon: GraduationCap, name: 'Aprendizaje y crecimiento', strs: ['Integrar herramientas que centralicen la visibilidad de ataques.', 'Designar y capacitar a un referente de seguridad en cada departamento no técnico.', 'Premiar a los empleados que reporten incidentes o vulnerabilidades.', 'Entrenamiento práctico para detectar correos y llamadas maliciosas.', 'Formar al equipo de TI en herramientas de detección proactiva apoyadas por IA.'] },
    ],
  },
];

export default function MapaEstrategico() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [arrowPaths, setArrowPaths] = useState<string[]>([]);

  const tabs = [
    { label: 'Objetivo A · Corporativo', desc: 'Mejorar los márgenes de utilidad en 6% (2026)' },
    { label: 'Objetivo B · Seguridad',   desc: 'Reducir fugas 80% y ataques 30% (2026)' },
  ];

  const map = MAPS[active];

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const getCard = (layer: number, card: number) => {
      const el = container.querySelector<HTMLElement>(`[data-l="${layer}"][data-c="${card}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        cx: r.left - cRect.left + r.width / 2,
        top: r.top - cRect.top,
        bottom: r.top - cRect.top + r.height,
      };
    };

    const paths = MAPS[active].connections.flatMap(([fl, fc, tl, tc]) => {
      const from = getCard(fl, fc);
      const to = getCard(tl, tc);
      if (!from || !to) return [];
      // Arrow goes upward: start at top-center of FROM card, end at bottom-center of TO card
      const x1 = from.cx, y1 = from.top;
      const x2 = to.cx,   y2 = to.bottom;
      const my = (y1 + y2) / 2;
      return [`M ${x1},${y1} C ${x1},${my} ${x2},${my} ${x2},${y2}`];
    });

    setArrowPaths(paths);
  }, [active]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">04</span> · Estrategia · Strategy Map</div>
          <h1>Mapa <em>estratégico</em></h1>
          <p className="lede">La cartografía causa-efecto de la estrategia. Cada objetivo se sostiene sobre cuatro capas del Balanced Scorecard: las capacidades de aprendizaje habilitan los procesos, que mejoran la relación con el cliente y producen el resultado financiero. Se lee de abajo hacia arriba.</p>
          <div className="meta">
            <div className="m"><div className="k">Marco</div><div className="v">BSC · Strategy Map</div></div>
            <div className="m"><div className="k">Mapas</div><div className="v">02 objetivos</div></div>
            <div className="m"><div className="k">Estrategias</div><div className="v">40</div></div>
            <div className="m"><div className="k">Propietario</div><div className="v">Strategy Office</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap doc-block">
        {/* Tabs */}
        <Reveal style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setArrowPaths([]); }}
              style={{
                flex: 1, minWidth: 260, textAlign: 'left', cursor: 'pointer',
                padding: '14px 20px', borderRadius: 'var(--radius)',
                border: active === i ? '1px solid var(--acc)' : '1px solid var(--line-2)',
                background: active === i ? 'color-mix(in oklch,var(--acc) 8%,var(--bg-2))' : 'var(--bg-2)',
                transition: 'all .18s',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: active === i ? 'var(--acc)' : 'var(--muted-2)', marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: active === i ? 'var(--text)' : 'var(--muted)', lineHeight: 1.35 }}>{t.desc}</div>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={measure}
          >
            {/* Objective banner */}
            <div style={{ padding: '24px 28px', border: '1px solid var(--acc-dim)', borderRadius: 'var(--radius)', background: 'linear-gradient(180deg,color-mix(in oklch,var(--acc) 12%,transparent),color-mix(in oklch,var(--acc) 4%,transparent))', display: 'flex', gap: 20, alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--acc)', writingMode: 'vertical-rl', transform: 'rotate(180deg)', borderRight: '1px solid var(--acc-dim)', paddingRight: 16, alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                Objetivo
              </div>
              <p style={{ fontSize: 'clamp(16px,2vw,22px)', fontWeight: 500, lineHeight: 1.4, margin: 0, letterSpacing: '-.01em' }}>
                {map.objective}
              </p>
            </div>

            {/* Up hint */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', padding: '12px 0', letterSpacing: '.05em' }}>
              <ArrowUp size={14} strokeWidth={2} style={{ color: 'var(--acc)' }} />
              cada estrategia impulsa a la de la capa superior, hasta cumplir el objetivo
              <ArrowUp size={14} strokeWidth={2} style={{ color: 'var(--acc)' }} />
            </div>

            {/* Layers + SVG arrow overlay */}
            <div ref={containerRef} style={{ position: 'relative' }}>
              <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 10 }}
              >
                <defs>
                  <marker id="bsc-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" style={{ fill: 'var(--acc)' }} opacity={0.6} />
                  </marker>
                </defs>
                {arrowPaths.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    style={{ stroke: 'var(--acc)' }}
                    strokeWidth={1.4}
                    opacity={0.38}
                    markerEnd="url(#bsc-arr)"
                  />
                ))}
              </svg>

              {map.layers.map((layer, li) => {
                const lc = ACCENT[layer.c];
                return (
                  <div key={layer.c} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, padding: '32px 0', borderTop: '1px solid var(--line)', alignItems: 'start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <span style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: lc, border: `1px solid color-mix(in oklch,${lc} 40%,transparent)`, background: `color-mix(in oklch,${lc} 9%,transparent)` }}>
                        <layer.Icon size={18} strokeWidth={1.5} />
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Perspectiva</span>
                      <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', lineHeight: 1.2 }}>{layer.name}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
                      {layer.strs.map((s, ci) => (
                        <div
                          key={ci}
                          data-l={li}
                          data-c={ci}
                          style={{ padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderLeft: `2px solid ${lc}`, borderRadius: 6, fontSize: 12, lineHeight: 1.42, color: '#d4d9e0' }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
              <span style={{ width: 30, borderTop: '1.5px dashed var(--acc)', opacity: .6 }} />
              el flujo asciende de aprendizaje a financiero, y converge en el objetivo
              <span style={{ width: 30, borderTop: '1.5px dashed var(--acc)', opacity: .6 }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · ME-04</span>
        <div className="nav">
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowRight size={12} strokeWidth={1.75} style={{ transform: 'scaleX(-1)' }} /> Cascada de metas
          </span>
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
            Caso de negocio <ArrowRight size={12} strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </>
  );
}
