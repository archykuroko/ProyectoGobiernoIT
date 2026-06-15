import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/DocContent/Reveal';

/* ── TOC ─────────────────────────────────────────────────── */

const TOC = [
  { href: '#intro',       label: 'Introducción y objetivo' },
  { href: '#metodologia', label: 'Metodología' },
  { href: '#vm-proc1',    label: '· VM-PROC1 · Escaneo' },
  { href: '#vm-proc2',    label: '· VM-PROC2 · Análisis' },
  { href: '#vm-proc3',    label: '· VM-PROC3 · Remediación' },
];

function useTocActive(ids: string[]) {
  const [active, setActive] = useState(ids[0] || '');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ── data ────────────────────────────────────────────────── */

const BUCKETS = ['0–5 m','5–30 m','30–60 m','1–6 h','6–12 h','12–24 h','1–2 d','2–5 d','>5 d'];
const SCALE   = ['<5 m','<15 m','<30 m','<1 h','<3 h','<6 h','<12 h','<24 h','<5 d','<15 d'];
const DIMS = [
  'Pérdida económica',
  'Incumplimiento legal / regulatorio',
  'Daño a la reputación / imagen',
  'Afectación del servicio al cliente',
  'Pérdida de calidad',
  'Pérdida de productividad',
  'Pérdida de control',
  'Daño a la salud / bienestar',
  'Daño medioambiental',
];

type HeatVal = 'N' | 'B' | 'M' | 'A';
interface ContItem { id: string; act: string; mech: string[]; }
interface FlowItem { id: string; label: string; }
interface Process {
  id: string; code: string; name: string;
  group: string; area: string; owner: string; date: string;
  mtpd: number; rto: number; bcomin: string;
  matrix: HeatVal[][];
  continuity: ContItem[];
  inflow: FlowItem[];
  outflow: FlowItem[];
}

const PROCESSES: Process[] = [
  {
    id:'VM-PROC1', code:'1',
    name:'Identificación y escaneo de activos',
    group:'Gestión de vulnerabilidades',
    area:'Seguridad de la información',
    owner:'Irmin Hernández Jiménez',
    date:'28 / 05 / 2026',
    mtpd:5, rto:3, bcomin:'N/A',
    matrix:[
      ['N','N','N','N','B','B','M','M','A'],
      ['N','N','N','N','N','N','B','M','M'],
      ['N','N','N','N','N','N','N','B','M'],
      ['N','N','N','N','N','B','B','M','A'],
      ['N','N','N','B','B','M','M','M','A'],
      ['N','N','N','B','B','M','M','A','A'],
      ['N','N','N','N','N','B','M','M','A'],
      ['N','N','N','N','N','N','N','N','N'],
      ['N','N','N','N','N','N','N','N','N'],
    ],
    continuity:[
      { id:'1.1', act:'Descubrimiento de Activos Tecnológicos', mech:[
        'Extracción manual de inventarios desde paneles de infraestructura nube (AWS, Azure).',
        'Sincronización temporal con las bases de datos de configuración (CMDB) de TI.',
      ]},
      { id:'1.3', act:'Integración de Repositorios de Código', mech:[
        'Ejecución local de herramientas de escaneo (SAST/DAST locales) por los desarrolladores.',
        'Revisiones entre pares obligatorias en código crítico.',
      ]},
      { id:'1.4', act:'Ejecución de Escaneos Automatizados', mech:[
        'Reprogramación y compactación de ventanas de escaneo en horarios de baja carga.',
        'Uso de herramientas efímeras para escaneos perimetrales ante vulnerabilidades "Día Cero".',
      ]},
      { id:'1.5', act:'Identificación de Vectores de Entrada', mech:[
        'Registro manual en hojas de cálculo temporales de vulnerabilidades reportadas por pentesting o consultoría externa.',
      ]},
      { id:'1.7', act:'Traspaso al Macroproceso de Análisis', mech:[
        'Exportación e intercambio manual de listados crudos de vulnerabilidades vía canales seguros.',
      ]},
    ],
    inflow:[{ id:'EXT', label:'Registro de hallazgos de pentesting' }],
    outflow:[
      { id:'2.1', label:'Ingesta de Datos de Escaneo' },
      { id:'2.4', label:'Análisis de Impacto en el Negocio' },
      { id:'3.1', label:'Direccionamiento Automático de Incidencias' },
    ],
  },
  {
    id:'VM-PROC2', code:'2',
    name:'Análisis, priorización y direccionamiento',
    group:'Gestión de vulnerabilidades',
    area:'Analista de Ciberseguridad',
    owner:'Steven Arturo Escárcega Hernández',
    date:'28 / 05 / 2026',
    mtpd:6, rto:4, bcomin:'N/A',
    matrix:[
      ['N','N','N','N','B','M','M','A','A'],
      ['N','N','N','N','N','B','M','M','A'],
      ['N','N','N','N','N','N','B','B','M'],
      ['N','N','N','N','B','B','M','A','A'],
      ['N','N','N','B','B','M','M','A','A'],
      ['N','N','N','B','B','M','A','A','A'],
      ['N','N','N','N','B','M','M','A','A'],
      ['N','N','N','N','N','N','N','N','N'],
      ['N','N','N','N','N','N','N','N','N'],
    ],
    continuity:[
      { id:'2.2', act:'Filtrado de Falsos Positivos', mech:[
        'Revisión manual de hallazgos críticos basada en conocimiento previo de la infraestructura.',
      ]},
      { id:'2.3', act:'Cálculo del Valor de Priorización (VPR)', mech:[
        'Uso de tablas de criticidad estáticas (CVSS) en hojas de cálculo si el motor automático falla.',
      ]},
      { id:'2.5', act:'Clasificación por Criticidad', mech:[
        'Priorización manual basada en el inventario de activos críticos (CMDB).',
      ]},
    ],
    inflow:[
      { id:'VM-PROC1', label:'Identificación y escaneo de activos' },
      { id:'EXT',      label:'Registro de hallazgos de pentesting (consultoría externa)' },
    ],
    outflow:[{ id:'VM-PROC3', label:'Remediación y seguimiento de SLA' }],
  },
  {
    id:'VM-PROC3', code:'3',
    name:'Remediación y seguimiento de SLAs',
    group:'Gestión de vulnerabilidades',
    area:'Ingeniería de Infraestructura / CISO',
    owner:'Cesar Alberto Mariano Reyes',
    date:'28 / 05 / 2026',
    mtpd:7, rto:5, bcomin:'N/A',
    matrix:[
      ['N','N','N','B','B','M','M','A','A'],
      ['N','N','N','N','B','M','A','A','A'],
      ['N','N','N','N','N','B','B','M','A'],
      ['N','N','N','B','B','M','A','A','A'],
      ['N','N','B','B','M','M','A','A','A'],
      ['N','N','N','B','B','M','M','A','A'],
      ['N','N','N','B','M','M','A','A','A'],
      ['N','N','N','N','N','N','N','N','N'],
      ['N','N','N','N','N','N','N','N','N'],
    ],
    continuity:[
      { id:'3.1', act:'Direccionamiento Automático', mech:[
        'Comunicación directa vía canales de emergencia (Teams/Slack) para asignación manual de críticos.',
      ]},
      { id:'3.3', act:'Ejecución de Remediación', mech:[
        'Implementación de medidas de mitigación temporales (reglas de Firewall/WAF) mientras se aplica el parche.',
      ]},
      { id:'3.5', act:'Monitoreo y Escalamiento', mech:[
        'Seguimiento manual de tickets críticos mediante reportes diarios en hojas de cálculo.',
      ]},
    ],
    inflow:[{ id:'VM-PROC2', label:'Análisis, priorización y direccionamiento' }],
    outflow:[{ id:'EXT', label:'Reportes de cumplimiento' }],
  },
];

/* ── heat cell styles ───────────────────────────────────────── */
const HEAT_STYLE: Record<HeatVal, React.CSSProperties> = {
  N: { background:'var(--bg-3)',   color:'var(--muted-2)', border:'1px solid transparent' },
  B: { background:'oklch(0.74 0.13 230 / 0.12)', color:'oklch(0.74 0.13 230)', border:'1px solid oklch(0.74 0.13 230 / 0.28)' },
  M: { background:'oklch(0.82 0.18 70 / 0.12)',  color:'var(--warn)',           border:'1px solid oklch(0.82 0.18 70 / 0.28)' },
  A: { background:'oklch(0.65 0.22 25 / 0.12)',  color:'var(--danger)',         border:'1px solid oklch(0.65 0.22 25 / 0.28)' },
};

const SEC_LABELS = ['9.3','9.4','9.5'];

/* ── sub-components ─────────────────────────────────────────── */

function Timeline({ p }: { p: Process }) {
  return (
    <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'24px 26px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(10,1fr)', gap:5, marginBottom:22 }}>
        {SCALE.map((s, i) => {
          const isRto  = i === p.rto;
          const isMtpd = i === p.mtpd;
          const base: React.CSSProperties = {
            position:'relative', textAlign:'center', padding:'11px 2px', borderRadius:4,
            fontFamily:'var(--font-mono)', fontSize:10, transition:'.15s',
          };
          const style: React.CSSProperties = isRto
            ? { ...base, background:'var(--acc-soft)', border:'1px solid var(--acc-dim)', color:'var(--acc)' }
            : isMtpd
            ? { ...base, background:'oklch(0.82 0.18 70 / 0.12)', border:'1px solid oklch(0.82 0.18 70 / 0.3)', color:'var(--warn)' }
            : { ...base, background:'var(--bg-0)', border:'1px solid var(--line)', color:'var(--muted-2)' };
          return (
            <div key={i} style={style}>
              {(isRto || isMtpd) && (
                <span style={{
                  position:'absolute', top:-9, left:'50%', transform:'translateX(-50%)',
                  fontSize:8, letterSpacing:'.08em', padding:'2px 6px', borderRadius:3,
                  whiteSpace:'nowrap', fontWeight:600,
                  background: isRto ? 'var(--acc)' : 'var(--warn)', color:'#000',
                }}>
                  {isRto ? 'RTO' : 'MTPD'}
                </span>
              )}
              {s}
            </div>
          );
        })}
      </div>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontFamily:'var(--font-sans)', fontSize:34, fontWeight:600, letterSpacing:'-.03em', lineHeight:1, color:'var(--acc)' }}>{SCALE[p.rto]}</span>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)' }}>RTO objetivo</div>
            <div style={{ fontSize:12, color:'#cfd5dd', marginTop:3, lineHeight:1.4 }}>Plazo meta de restablecimiento del proceso.</div>
          </div>
        </div>
        <div style={{ width:1, background:'var(--line)', alignSelf:'stretch' }} />
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontFamily:'var(--font-sans)', fontSize:34, fontWeight:600, letterSpacing:'-.03em', lineHeight:1, color:'var(--warn)' }}>{SCALE[p.mtpd]}</span>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)' }}>MTPD tolerable</div>
            <div style={{ fontSize:12, color:'#cfd5dd', marginTop:3, lineHeight:1.4 }}>Límite antes de un daño inaceptable al negocio.</div>
          </div>
        </div>
        <div style={{ marginLeft:'auto', fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', border:'1px solid var(--line-2)', borderRadius:50, padding:'7px 14px', alignSelf:'center' }}>
          Continuidad mínima (BCO): <strong style={{ color:'var(--text)' }}>{p.bcomin}</strong>
        </div>
      </div>
    </div>
  );
}

function Heatmap({ p }: { p: Process }) {
  return (
    <div style={{ overflowX:'auto', border:'1px solid var(--line)', borderRadius:'var(--radius)' }}>
      <table style={{ borderCollapse:'collapse', width:'100%', minWidth:660 }}>
        <thead>
          <tr>
            <th style={{ textAlign:'left', padding:'12px 16px', background:'var(--bg-0)', borderBottom:'1px solid var(--line)', fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)', fontWeight:500, letterSpacing:'.05em', width:230 }}>Tipo de impacto</th>
            {BUCKETS.map((b) => (
              <th key={b} style={{ fontFamily:'var(--font-mono)', fontSize:9.5, fontWeight:500, letterSpacing:'.03em', color:'var(--muted-2)', padding:'12px 4px', background:'var(--bg-0)', textAlign:'center', borderBottom:'1px solid var(--line)' }}>{b}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DIMS.map((dim, ri) => (
            <tr key={dim} style={{ borderBottom:'1px solid var(--line)' }}>
              <th style={{ textAlign:'left', fontFamily:'var(--font-sans)', fontSize:13, fontWeight:500, color:'#cfd5dd', padding:'11px 16px', background:'var(--bg-2)', whiteSpace:'nowrap' }}>{dim}</th>
              {p.matrix[ri].map((v, ci) => (
                <td key={ci} style={{ padding:5, textAlign:'center' }}>
                  <span style={{ width:30, height:30, borderRadius:4, display:'inline-flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:11, fontWeight:600, ...HEAT_STYLE[v] }}>{v}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionLabel({ text, top = false }: { text: string; top?: boolean }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:11, fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.13em', textTransform:'uppercase', color:'var(--muted-2)', margin: top ? '0 0 18px' : '42px 0 18px' }}>
      <span style={{ width:18, height:1, background:'var(--acc-dim)' }} />
      {text}
    </div>
  );
}

function ProcessBlock({ p, secLabel }: { p: Process; secLabel: string }) {
  return (
    <Reveal>
      <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-1)', overflow:'hidden' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:20, padding:'26px 30px', background:'var(--bg-0)', borderBottom:'1px solid var(--line)', flexWrap:'wrap' }}>
          <div style={{ fontFamily:'var(--font-sans)', fontSize:30, fontWeight:600, letterSpacing:'-.03em', color:'var(--acc)', lineHeight:1, flexShrink:0, width:46 }}>{p.code}</div>
          <div style={{ flex:1, minWidth:240 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.12em', color:'var(--muted-2)', marginBottom:7 }}>{p.id} · {p.group}</div>
            <h3 style={{ fontSize:23, fontWeight:600, letterSpacing:'-.02em', margin:0, lineHeight:1.15 }}>{p.name}</h3>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:4, textAlign:'right' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)' }}>Responsable</span>
            <span style={{ fontSize:13.5, color:'var(--text)', fontWeight:500 }}>{p.owner}</span>
          </div>
        </div>

        {/* Identity strip */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line)', borderBottom:'1px solid var(--line)' }}>
          {[['Área / función', p.area], ['Grupo de servicio', p.group], ['Fecha de llenado', p.date]].map(([k, v]) => (
            <div key={k} style={{ background:'var(--bg-2)', padding:'18px 22px' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.11em', textTransform:'uppercase', color:'var(--muted-2)' }}>{k}</div>
              <div style={{ fontSize:14, color:'var(--text)', marginTop:8, fontWeight:500, lineHeight:1.35 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding:30 }}>

          <SectionLabel text="Tolerancia a la interrupción · MTPD / RTO" top />
          <Timeline p={p} />

          <SectionLabel text="Nivel de impacto por la interrupción del proceso" />
          <Heatmap p={p} />

          <SectionLabel text="Actividades que soportan la operación del proceso" />
          <Link to="/docs/IA-07" style={{
            display:'flex', alignItems:'center', gap:22,
            border:'1px solid var(--line-2)', borderRadius:'var(--radius)',
            background:'linear-gradient(120deg, var(--acc-soft), transparent 70%), var(--bg-2)',
            padding:'24px 26px', textDecoration:'none', color:'inherit', transition:'.18s',
          }}>
            <span style={{ width:46, height:46, flexShrink:0, borderRadius:9, border:'1px solid var(--acc-dim)', background:'var(--acc-soft)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--acc)' }}>
              <Database size={20} strokeWidth={1.5} />
            </span>
            <span style={{ flex:1 }}>
              <span style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:6 }}>Referencia · Inventario de activos</span>
              <span style={{ display:'block', fontSize:16, fontWeight:600, color:'var(--text)' }}>Consultar las actividades y activos que soportan este proceso</span>
              <span style={{ display:'block', fontSize:13, color:'var(--muted)', marginTop:5, lineHeight:1.5 }}>El detalle de tareas, sistemas y recursos que habilitan la operación se mantiene centralizado en el inventario de activos del servicio.</span>
            </span>
            <ArrowRight size={18} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0 }} />
          </Link>

          <SectionLabel text="Opciones actuales de continuidad operacional" />
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {p.continuity.map((c) => (
              <div key={c.id} style={{ display:'grid', gridTemplateColumns:'54px 1fr', gap:18, border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'18px 20px', alignItems:'start' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:600, color:'var(--acc)', paddingTop:2 }}>{c.id}</div>
                <div>
                  <div style={{ fontSize:14.5, fontWeight:600, color:'var(--text)', marginBottom:10 }}>{c.act}</div>
                  <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:7 }}>
                    {c.mech.map((m) => (
                      <li key={m} style={{ fontSize:13, lineHeight:1.5, color:'#cfd5dd', paddingLeft:16, position:'relative' }}>
                        <span style={{ position:'absolute', left:0, color:'var(--acc)' }}>›</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <SectionLabel text="Interdependencia con otros procesos" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {([
              { dir:'in',  arrow:<ArrowLeft  size={14} strokeWidth={1.75} />, label:'Recibe información de',  items: p.inflow,  clr:'oklch(0.74 0.13 230)' },
              { dir:'out', arrow:<ArrowRight size={14} strokeWidth={1.75} />, label:'Envía información a',    items: p.outflow, clr:'var(--acc)' },
            ] as const).map(({ dir, arrow, label, items, clr }) => (
              <div key={dir} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', overflow:'hidden' }}>
                <div style={{ display:'flex', alignItems:'center', gap:11, padding:'15px 20px', borderBottom:'1px solid var(--line)', background:'var(--bg-0)' }}>
                  <span style={{ color: clr }}>{arrow}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
                </div>
                <div style={{ padding:'8px 20px 16px' }}>
                  {items.map((it) => (
                    <div key={it.id} style={{ display:'flex', alignItems:'center', gap:13, padding:'11px 0', borderBottom:'1px solid var(--line)' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, fontWeight:600, padding:'4px 8px', borderRadius:4, flexShrink:0, letterSpacing:'.03em', color: clr, background:`${clr === 'var(--acc)' ? 'var(--acc-soft)' : 'oklch(0.74 0.13 230 / 0.1)'}`, border:`1px solid ${clr === 'var(--acc)' ? 'var(--acc-dim)' : 'oklch(0.74 0.13 230 / 0.28)'}` }}>{it.id}</span>
                      <span style={{ fontSize:13.5, color:'#cfd5dd', lineHeight:1.4 }}>{it.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div style={{ display:'none' }}>{secLabel}</div>
    </Reveal>
  );
}

/* ── page ───────────────────────────────────────────────────── */

export default function BIATactico() {
  const ids = TOC.map(t => t.href.slice(1));
  const active = useTocActive(ids);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">09</span> · Continuidad · Business Impact Analysis</div>
          <h1>BIA <em>Táctico</em></h1>
          <p className="lede">Análisis de Impacto al Negocio a nivel táctico para los procesos del servicio de <em>Gestión de Vulnerabilidades</em>. Determina la criticidad de cada proceso, evalúa las consecuencias de su interrupción y define los parámetros de continuidad y recuperación —MTPD y RTO— que minimizan afectaciones operativas, económicas y de reputación.</p>
          <div className="meta">
            <div className="m"><div className="k">Grupo de servicio</div><div className="v">Gestión de vulnerabilidades</div></div>
            <div className="m"><div className="k">Procesos evaluados</div><div className="v">03</div></div>
            <div className="m"><div className="k">Dimensiones de impacto</div><div className="v">09</div></div>
            <div className="m"><div className="k">Fecha de llenado</div><div className="v">28 · 05 · 2026</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap" style={{ paddingTop:56, paddingBottom:56 }} ref={scrollRef}>
        <div className="doc-withtoc">

          {/* TOC */}
          <nav className="doc-toc">
            <div className="tl">Contenido</div>
            {TOC.map(t => (
              <a
                key={t.href}
                href={t.href}
                className={active === t.href.slice(1) ? 'active' : ''}
                onClick={(e) => scrollTo(t.href.slice(1), e)}
                style={t.href.startsWith('#vm-proc') ? { paddingLeft:24, fontSize:11, opacity: active === t.href.slice(1) ? 1 : 0.7 } : undefined}
              >
                {t.label}
              </a>
            ))}
          </nav>

          {/* Content */}
          <main style={{ minWidth:0 }}>

            {/* 9.1 Introducción */}
            <section id="intro" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">9.1</span><h2>Introducción y objetivo</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose">
                  <p>Las organizaciones dependen cada vez más de sus activos tecnológicos para garantizar la continuidad de sus operaciones y la prestación de sus servicios. Esta dependencia ha incrementado la necesidad de identificar, proteger y monitorear constantemente los recursos de información que forman parte de la infraestructura tecnológica.</p>
                  <p className="dim">El presente documento desarrolla el Análisis de Impacto al Negocio (BIA) a nivel táctico para los procesos relacionados con la gestión de vulnerabilidades. Su finalidad es determinar la importancia de cada proceso para la operación del servicio, evaluar las consecuencias derivadas de una posible interrupción y establecer parámetros de continuidad y recuperación.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="doc-callout">
                  <span className="ic">ℹ</span>
                  <p><strong>Objetivo.</strong> Identificar la criticidad de los procesos tácticos asociados al servicio de gestión de vulnerabilidades de CyberHunters, evaluar los impactos derivados de una interrupción operativa y definir los tiempos máximos tolerables de interrupción y recuperación, contribuyendo al fortalecimiento de la continuidad operativa, la resiliencia organizacional y la protección de los activos de información de los clientes.</p>
                </div>
              </Reveal>
            </section>

            {/* 9.2 Metodología */}
            <section id="metodologia" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">9.2</span><h2>Metodología de evaluación</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose" style={{ marginBottom:30 }}>
                  <p className="dim">Cada proceso se evalúa según el nivel de impacto que generaría su interrupción a lo largo de nueve ventanas de tiempo y nueve dimensiones de afectación. A partir de esa evaluación se determinan el <strong>MTPD</strong> (máximo periodo de interrupción tolerable) y el <strong>RTO</strong> (tiempo de recuperación objetivo).</p>
                </div>
              </Reveal>

              <Reveal>
                <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:18 }}>

                  {/* Impact levels */}
                  <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'24px 26px' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.13em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:18 }}>Niveles de impacto</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
                      {([
                        { v:'N', style:HEAT_STYLE.N, title:'No aplica', desc:'la interrupción no genera afectación medible en esta dimensión.' },
                        { v:'B', style:HEAT_STYLE.B, title:'Bajo',      desc:'impacto leve, absorbible por la operación.' },
                        { v:'M', style:HEAT_STYLE.M, title:'Medio',     desc:'impacto relevante que compromete la calidad del servicio.' },
                        { v:'A', style:HEAT_STYLE.A, title:'Alto',      desc:'impacto severo sobre la operación, el cliente o el cumplimiento.' },
                      ] as const).map(({ v, style, title, desc }) => (
                        <div key={v} style={{ display:'flex', alignItems:'center', gap:14 }}>
                          <span style={{ width:30, height:30, borderRadius:5, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:13, fontWeight:600, ...style }}>{v}</span>
                          <span style={{ fontSize:13.5, color:'#cfd5dd', lineHeight:1.4 }}><strong style={{ color:'var(--text)' }}>{title}</strong> — {desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Continuity parameters */}
                  <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'24px 26px' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.13em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:18 }}>Parámetros de continuidad</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                      {([
                        { key:'MTPD', desc:<><strong>Máximo periodo de interrupción tolerable.</strong> Tiempo límite que un proceso puede permanecer inactivo antes de causar un daño inaceptable al negocio.</> },
                        { key:'RTO',  desc:<><strong>Tiempo de recuperación objetivo.</strong> Plazo meta para restablecer el proceso tras una interrupción; siempre inferior al MTPD.</> },
                        { key:'BCO',  desc:<><strong>Objetivo de continuidad mínimo.</strong> Nivel mínimo de operación a sostener durante una contingencia. <em>No aplica</em> en los procesos evaluados.</> },
                      ]).map(({ key, desc }) => (
                        <div key={key} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, fontWeight:600, color:'var(--acc)', border:'1px solid var(--acc-dim)', background:'var(--acc-soft)', padding:'4px 9px', borderRadius:4, flexShrink:0, letterSpacing:'.04em' }}>{key}</span>
                          <p style={{ margin:0, fontSize:13.5, lineHeight:1.6, color:'#cfd5dd' }}>{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </Reveal>
            </section>

            {/* 9.3 – 9.5 Process sections */}
            {PROCESSES.map((p, idx) => (
              <section
                key={p.id}
                id={p.id.toLowerCase()}
                style={{ scrollMarginTop:16, marginBottom: idx < PROCESSES.length - 1 ? 56 : 0 }}
              >
                <Reveal>
                  <div className="doc-sec-h">
                    <span className="idx">{SEC_LABELS[idx]}</span>
                    <h2>Proceso {p.code} · {p.name}</h2>
                    <span className="rule" />
                  </div>
                </Reveal>
                <ProcessBlock p={p} secLabel={SEC_LABELS[idx]} />
              </section>
            ))}

          </main>
        </div>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · BT-09</span>
        <div className="nav">
          <a href="/docs/MR-08">
            <ArrowRight size={12} strokeWidth={1.75} style={{ transform:'scaleX(-1)' }} /> Matriz de riesgos
          </a>
          <a href="/docs/BO-10">
            BIA Operacional <ArrowRight size={12} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </>
  );
}
