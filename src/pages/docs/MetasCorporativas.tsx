import type { LucideIcon } from 'lucide-react';
import { DollarSign, Users, Settings2, GraduationCap } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

interface Perspectiva {
  id: string;
  num: string;
  Icon: LucideIcon;
  name: string;
  metric: string;
  metricLabel: string;
  goal: React.ReactNode;
  inits: string[];
}

const PERSPECTIVAS: Perspectiva[] = [
  {
    id: 'fin',
    num: 'P·01 / FINANCIERO',
    Icon: DollarSign,
    name: 'Financiero',
    metric: '+6%',
    metricLabel: 'márgenes de utilidad · cierre 2026',
    goal: <>Mejorar los <b>márgenes de utilidades en 6%</b> para el cierre del ejercicio fiscal del año 2026.</>,
    inits: [
      'Reducción de los costos de operación.',
      'Acceso a mejores planes de inversión de capital.',
      'Aumento en las ganancias netas.',
      'Mejora en el margen de utilidad.',
      'Reinversión de las utilidades para el crecimiento del negocio.',
    ],
  },
  {
    id: 'cli',
    num: 'P·02 / CLIENTE',
    Icon: Users,
    name: 'Cliente / Usuario',
    metric: '+15%',
    metricLabel: 'usuarios activos mensuales · Q2 2026',
    goal: <>Aumentar la base de <b>usuarios mensualmente activos en un 15%</b> para el cierre del segundo trimestre del 2026.</>,
    inits: [
      'Mejora en la satisfacción y percepción del usuario.',
      'Aumento de las recomendaciones del servicio brindado.',
      'Mejora de la experiencia de la primera impresión del producto.',
      'Mejora de la orientación inicial del uso del producto.',
      'Buena percepción por parte del soporte al usuario.',
    ],
  },
  {
    id: 'pro',
    num: 'P·03 / PROCESOS',
    Icon: Settings2,
    name: 'Interno / Procesos',
    metric: '↓20%',
    metricLabel: 'tiempo de entrega · H1 2027',
    goal: <>Automatizar procesos manuales para <b>reducir en un 20% el tiempo de entrega</b> y así evitar disgustos de nuestros usuarios, para el primer semestre del año 2027.</>,
    inits: [
      'Mayor automatización de flujos de trabajo entre áreas.',
      'Reducción de costos de infraestructura.',
      'Reducción de tiempos de entrega.',
      'Aumento de la productividad del equipo de trabajo.',
      'Mayor integración entre las diferentes áreas.',
      'Capacitaciones para mejorar la eficiencia del desarrollo con herramientas de IA.',
    ],
  },
  {
    id: 'apr',
    num: 'P·04 / APRENDIZAJE',
    Icon: GraduationCap,
    name: 'Aprendizaje y crecimiento',
    metric: '50%',
    metricLabel: 'del equipo capacitado · 2026',
    goal: <>Ofrecer un <b>plan de capacitación continua</b> con las nuevas tendencias de la industria para aumentar la preparación de al menos el <b>50% del equipo</b> para el año 2026.</>,
    inits: [
      'Programas de certificación para la gestión de costos en la nube.',
      'Capacitación de áreas no técnicas con herramientas low-code.',
      'Sistema de incentivos por eficiencia para los empleados.',
      'Esquemas de trabajo más flexibles para el personal.',
    ],
  },
];

const accentMap: Record<string, string> = {
  fin: 'oklch(0.88 0.22 135)',
  cli: 'oklch(0.78 0.13 230)',
  pro: 'oklch(0.83 0.17 70)',
  apr: 'oklch(0.72 0.15 310)',
};

export default function MetasCorporativas() {
  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">01</span> · Estrategia · Balanced Scorecard</div>
          <h1>Metas <em>corporativas</em></h1>
          <p className="lede">Los objetivos institucionales de CyberHunters organizados bajo las cuatro perspectivas del Balanced Scorecard. Cada perspectiva declara una meta rectora con su métrica y horizonte, sostenida por iniciativas estratégicas concretas.</p>
          <div className="meta">
            <div className="m"><div className="k">Marco</div><div className="v">Balanced Scorecard</div></div>
            <div className="m"><div className="k">Perspectivas</div><div className="v">04</div></div>
            <div className="m"><div className="k">Horizonte</div><div className="v">2026 – 2027</div></div>
            <div className="m"><div className="k">Propietario</div><div className="v">Dirección General</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap">
        <Reveal
          className="doc-block"
          style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}
        >
          <span>El valor fluye de abajo hacia arriba</span>
          <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,var(--acc),transparent)' }} />
          <span>Aprendizaje → Procesos → Cliente → Financiero</span>
        </Reveal>

        {PERSPECTIVAS.map((p) => {
          const acc = accentMap[p.id];
          return (
            <Reveal
              key={p.id}
              className="doc-block"
              style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48 }}
            >
              {/* Side */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '.2em', marginBottom: 14 }}>{p.num}</div>
                <div style={{ fontSize: 22, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span style={{
                    width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: acc, border: `1px solid color-mix(in oklch,${acc} 40%,transparent)`, background: `color-mix(in oklch,${acc} 9%,transparent)`,
                  }}>
                    <p.Icon size={17} strokeWidth={1.5} />
                  </span>
                  <span style={{ color: acc }}>{p.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontSize: 'clamp(40px,4vw,54px)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1, color: acc, fontFamily: 'var(--font-sans)' }}>{p.metric}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>{p.metricLabel}</span>
                </div>
              </div>

              {/* Body */}
              <div>
                <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text)', fontWeight: 400, marginBottom: 24, maxWidth: '60ch' }}>{p.goal}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {p.inits.map((init, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', fontSize: 14, lineHeight: 1.45, color: '#cfd5dd' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: acc, flexShrink: 0, marginTop: 2 }}>{String(idx + 1).padStart(2, '0')}</span>
                      {init}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · MC-01</span>
        <div className="nav">
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>Siguiente: Metas de TI</span>
        </div>
      </div>
    </>
  );
}
