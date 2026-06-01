import type { LucideIcon } from 'lucide-react';
import { DollarSign, Users, Settings2, GraduationCap, Info } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

interface Card {
  id: string;
  Icon: LucideIcon;
  label: string;
  when: string;
  metrics: { n: string; label: string }[];
  goal: React.ReactNode;
}

const CARDS: Card[] = [
  {
    id: 'fin',
    Icon: DollarSign,
    label: 'Financiero',
    when: 'CIERRE H1 · 2026',
    metrics: [{ n: '↓40%', label: 'Costos operativos\nde seguridad' }],
    goal: <>Optimizar los recursos invertidos en seguridad <b>reduciendo un 40% los costos operativos</b> derivados de la remediación de incidentes y la eliminación de licencias duplicadas o en desuso.</>,
  },
  {
    id: 'cli',
    Icon: Users,
    label: 'Usuarios / Clientes',
    when: 'CIERRE · 2026',
    metrics: [{ n: '99.9%', label: 'Disponibilidad de\nservicios críticos' }],
    goal: <>Garantizar una <b>disponibilidad del 99.9%</b> en servicios críticos, sin que las nuevas políticas de seguridad degraden la experiencia del usuario ni los tiempos de respuesta.</>,
  },
  {
    id: 'pro',
    Icon: Settings2,
    label: 'Interno / Procesos',
    when: 'CIERRE H1 · 2026',
    metrics: [
      { n: '↓80%', label: 'Fugas de\ninformación' },
      { n: '↓30%', label: 'Ataques\nrecibidos' },
    ],
    goal: <>Implementar <b>políticas internas de seguridad</b> para reducir las fugas de información en un 80% y los ataques en un 30%.</>,
  },
  {
    id: 'apr',
    Icon: GraduationCap,
    label: 'Aprendizaje y crecimiento',
    when: 'CIERRE · 2026',
    metrics: [
      { n: '100%', label: 'Personal\ncertificado' },
      { n: '<2%', label: 'Clics en\nphishing' },
    ],
    goal: <>Lograr que el <b>100% del personal se certifique</b> en seguridad digital y <b>reducir la tasa de clics</b> en simulacros de phishing a menos del 2%.</>,
  },
];

const accentMap: Record<string, string> = {
  fin: 'oklch(0.88 0.22 135)',
  cli: 'oklch(0.78 0.13 230)',
  pro: 'oklch(0.83 0.17 70)',
  apr: 'oklch(0.72 0.15 310)',
};

export default function MetasTI() {
  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">02</span> · Estrategia · Alineación de TI</div>
          <h1>Metas de <em>TI</em></h1>
          <p className="lede">Las metas del área de tecnología y seguridad de la información que traducen los objetivos corporativos en compromisos operativos medibles. Cada perspectiva del Balanced Scorecard fija un indicador y un horizonte de cumplimiento.</p>
          <div className="meta">
            <div className="m"><div className="k">Marco</div><div className="v">Balanced Scorecard · TI</div></div>
            <div className="m"><div className="k">Perspectivas</div><div className="v">04</div></div>
            <div className="m"><div className="k">Horizonte</div><div className="v">2026</div></div>
            <div className="m"><div className="k">Propietario</div><div className="v">CIO / CISO Office</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap doc-block">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          {CARDS.map((c) => {
            const acc = accentMap[c.id];
            return (
              <Reveal key={c.id} style={{ background: 'var(--bg-0)', padding: '38px 36px', minHeight: 320, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                {/* Glow */}
                <div style={{ position: 'absolute', right: -40, bottom: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, color-mix(in oklch,${acc} 14%,transparent), transparent 70%)`, pointerEvents: 'none' }} />
                {/* Top */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    <span style={{ width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: acc, border: `1px solid color-mix(in oklch,${acc} 40%,transparent)`, background: `color-mix(in oklch,${acc} 9%,transparent)` }}>
                      <c.Icon size={15} strokeWidth={1.5} />
                    </span>
                    {c.label}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted-2)', letterSpacing: '.1em', border: '1px solid var(--line-2)', padding: '4px 9px', borderRadius: 50 }}>{c.when}</span>
                </div>
                {/* Metrics */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'baseline', marginBottom: 22, position: 'relative', zIndex: 2 }}>
                  {c.metrics.map((m, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 'clamp(38px,4vw,54px)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: .95, color: acc, fontFamily: 'var(--font-sans)' }}>{m.n}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 8, whiteSpace: 'pre-line' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
                {/* Goal */}
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#cfd5dd', marginTop: 'auto', position: 'relative', zIndex: 2, maxWidth: '46ch' }}>{c.goal}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal style={{ marginTop: 36 }}>
          <div className="doc-callout">
            <Info size={18} strokeWidth={1.5} style={{ color: 'var(--acc)', flexShrink: 0 }} />
            <p>Estas metas descienden directamente de las metas corporativas y se relacionan con los objetivos de gobierno en la cascada de metas. Las estrategias que las hacen posibles se detallan en el mapa estratégico.</p>
          </div>
        </Reveal>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · MIT-02</span>
        <div className="nav">
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>← Metas corporativas</span>
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>Cascada de metas →</span>
        </div>
      </div>
    </>
  );
}
