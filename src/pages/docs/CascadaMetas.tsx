import { TrendingUp, AlertTriangle, Target, ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

type Rel = 'P' | 'S' | '—';

interface GoalRow { goal: string; ben: Rel; ris: Rel; rec: Rel; }

const CORP_ROWS: GoalRow[] = [
  { goal: 'Mejorar los márgenes de utilidades en 6% para el cierre del ejercicio fiscal 2026.', ben: 'P', ris: 'S', rec: 'S' },
  { goal: 'Aumentar la base de usuarios mensualmente activos en un 15% para el cierre del Q2 2026.', ben: 'P', ris: '—', rec: '—' },
  { goal: 'Automatizar procesos manuales para reducir en un 20% el tiempo de entrega, para el H1 2027.', ben: 'S', ris: 'S', rec: 'P' },
  { goal: 'Ofrecer un plan de capacitación continua para preparar al menos al 50% del equipo en 2026.', ben: 'P', ris: 'S', rec: 'S' },
];

const IT_ROWS: GoalRow[] = [
  { goal: 'Optimizar los recursos invertidos en seguridad reduciendo un 40% los costos operativos, para el H1 2026.', ben: 'S', ris: '—', rec: 'P' },
  { goal: 'Garantizar una disponibilidad del 99.9% en servicios críticos sin degradar la experiencia, para 2026.', ben: 'S', ris: 'P', rec: '—' },
  { goal: 'Implementar políticas internas de seguridad para reducir fugas en 80% y ataques en 30%, para el H1 2026.', ben: 'S', ris: 'P', rec: '—' },
  { goal: 'Certificar al 100% del personal en seguridad digital y reducir clics en phishing a menos del 2%, para 2026.', ben: '—', ris: 'P', rec: '—' },
];

const GOV_OBJECTIVES = [
  { Icon: TrendingUp,    title: 'Obtener beneficios', desc: 'Generar valor a partir de la inversión en TI y el servicio de seguridad.',     color: 'oklch(0.88 0.22 135)' },
  { Icon: AlertTriangle, title: 'Optimizar riesgos',  desc: 'Mantener la exposición al riesgo dentro de niveles tolerables.',               color: 'oklch(0.66 0.21 25)' },
  { Icon: Target,        title: 'Optimizar recursos', desc: 'Asignar de forma eficiente las capacidades, personas y tecnología.',            color: 'oklch(0.78 0.13 230)' },
];

function Badge({ rel }: { rel: Rel }) {
  if (rel === '—') return <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted-2)', fontSize: 16 }}>—</span>;
  const isPrimary = rel === 'P';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 16,
        ...(isPrimary
          ? { background: 'var(--acc)', color: '#000', boxShadow: '0 0 22px color-mix(in oklch,var(--acc) 35%,transparent)' }
          : { border: '1px solid var(--line-2)', color: 'var(--muted)' })
      }}>{rel}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: isPrimary ? 'var(--acc)' : 'var(--muted)' }}>
        {isPrimary ? 'Primaria' : 'Secundaria'}
      </div>
    </div>
  );
}

function MatrixTable({ rows }: { rows: GoalRow[] }) {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ background: 'var(--bg-2)', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted-2)', padding: '14px 16px', fontWeight: 500, borderBottom: '1px solid var(--line)', width: '40%' }}>Meta</th>
            {GOV_OBJECTIVES.map((g) => (
              <th key={g.title} style={{ background: 'var(--bg-2)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', padding: '14px 16px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: g.color, display: 'inline-block', marginRight: 8, verticalAlign: 'middle' }} />
                {g.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <td style={{ padding: '18px 16px', fontSize: 14, color: '#d4d9e0', lineHeight: 1.5, borderRight: '1px solid var(--line)' }}>{r.goal}</td>
              {([r.ben, r.ris, r.rec] as Rel[]).map((rel, j) => (
                <td key={j} style={{ padding: '18px 16px', textAlign: 'center', borderRight: j < 2 ? '1px solid var(--line)' : 'none' }}>
                  <Badge rel={rel} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CascadaMetas() {
  const steps = ['Necesidades de las partes interesadas', 'Objetivos de gobierno', 'Metas corporativas', 'Metas de TI'];

  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">03</span> · Gobierno · COBIT</div>
          <h1>Cascada de <em>metas</em></h1>
          <p className="lede">El mapeo que conecta las metas corporativas y de TI con los tres objetivos de gobierno de COBIT —obtener beneficios, optimizar riesgos y optimizar recursos— indicando la fuerza de cada relación: primaria (P) o secundaria (S).</p>
          <div className="meta">
            <div className="m"><div className="k">Marco</div><div className="v">COBIT · Goals Cascade</div></div>
            <div className="m"><div className="k">Obj. de gobierno</div><div className="v">03</div></div>
            <div className="m"><div className="k">Metas mapeadas</div><div className="v">08</div></div>
            <div className="m"><div className="k">Propietario</div><div className="v">PMO</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap">
        {/* 3.1 Cascade flow */}
        <Reveal className="doc-block">
          <div className="doc-sec-h"><span className="idx">3.1</span><h2>Lógica de la cascada</h2><span className="rule" /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 140, padding: '16px 18px', background: 'var(--bg-2)', border: '1px solid var(--line)', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--acc)', letterSpacing: '.16em', marginBottom: 6 }}>NIVEL {i + 1}</div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{s}</div>
                {i < steps.length - 1 && (
                  <span style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', zIndex: 3, color: 'var(--acc)', background: 'var(--bg-1)', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <ArrowRight size={12} strokeWidth={2} />
                  </span>
                )}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 22, fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', maxWidth: '70ch' }}>
            Las necesidades de las partes interesadas se traducen en tres grandes objetivos de gobierno. A partir de ellos, cada meta corporativa y de TI declara su grado de contribución, garantizando trazabilidad hacia la ejecución.
          </p>
        </Reveal>

        {/* 3.2 Governance objectives */}
        <div className="doc-block">
          <div className="doc-sec-h"><span className="idx">3.2</span><h2>Objetivos de gobierno</h2><span className="rule" /></div>
          <Reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {GOV_OBJECTIVES.map((g) => (
              <div key={g.title} style={{ padding: 22, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--bg-2)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.color, border: `1px solid color-mix(in oklch,${g.color} 40%,transparent)`, background: `color-mix(in oklch,${g.color} 9%,transparent)`, marginBottom: 14 }}>
                  <g.Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 500, margin: '0 0 6px' }}>{g.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--muted)', margin: 0, fontFamily: 'var(--font-mono)' }}>{g.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* 3.3 Corporate mapping */}
        <div className="doc-block">
          <div className="doc-sec-h"><span className="idx">3.3</span><h2>Mapeo de metas corporativas</h2><span className="rule" /></div>
          <Reveal><MatrixTable rows={CORP_ROWS} /></Reveal>
        </div>

        {/* 3.4 IT mapping */}
        <div className="doc-block">
          <div className="doc-sec-h"><span className="idx">3.4</span><h2>Mapeo de metas de TI</h2><span className="rule" /></div>
          <Reveal><MatrixTable rows={IT_ROWS} /></Reveal>
          <Reveal style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginTop: 22, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--acc)', color: '#000', fontWeight: 600, fontSize: 13 }}>P</div>
              Relación primaria — contribución directa y central
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line-2)', color: 'var(--muted)', fontSize: 13 }}>S</div>
              Relación secundaria — contribución de apoyo
            </div>
          </Reveal>
        </div>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · CG-03</span>
        <div className="nav">
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowRight size={12} strokeWidth={1.75} style={{ transform: 'scaleX(-1)' }} /> Metas de TI
          </span>
          <span style={{ color: 'var(--muted-2)', fontFamily: 'var(--font-mono)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
            Mapa estratégico <ArrowRight size={12} strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </>
  );
}
