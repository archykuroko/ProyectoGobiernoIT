import { useState, useEffect, useRef } from 'react';
import { Users, Database, Building2, Package, Server, DollarSign, Handshake, Truck, Info, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

/* ── TOC ─────────────────────────────────────────────────── */

const TOC = [
  { href: '#intro',    label: 'Introducción y objetivo' },
  { href: '#recursos', label: 'Recursos críticos' },
  { href: '#rpo',      label: 'Objetivos RPO' },
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

/* ── data ─────────────────────────────────────────────────── */

type Prio = 1 | 2 | 3;
const PRIO_MAP: Record<Prio, { label: string; n: string; cls: string }> = {
  1: { label:'Alta',  n:'P1', cls:'crit' },
  2: { label:'Media', n:'P2', cls:'warn' },
  3: { label:'Baja',  n:'P3', cls:'info' },
};

interface ResItem { name: string; p: Prio; desc?: string; meta?: string; }
interface Category { Icon: LucideIcon; name: string; items: ResItem[]; na?: boolean; }

const CATS: Category[] = [
  { Icon: Users, name:'Personal / Gente', items: [
    { name:'Analista de ciberseguridad', p:1,
      desc:'Operador principal del servicio. Mantiene el inventario de activos, consolida los hallazgos crudos, filtra falsos positivos, clasifica las vulnerabilidades por criticidad y valida el cierre definitivo de los vectores de ataque. Su disponibilidad es crítica para la operación diaria.' },
    { name:'Chief Information Security Officer', p:2,
      desc:'Rol de gobierno y toma de decisiones. Autoriza la intervención de seguridad ofensiva, evalúa y aprueba formalmente la asunción de riesgos cuando una vulnerabilidad no puede mitigarse técnicamente, y supervisa el cumplimiento estratégico de los SLA.' },
    { name:'Ingeniero de infraestructura', p:2,
      desc:'Remediador técnico de la organización. Responsable final del activo tecnológico: aplica parches, actualizaciones y medidas correctivas sobre la infraestructura física, virtual o en nube para eliminar las debilidades detectadas.' },
    { name:'QA / Tester', p:3,
      desc:'Integra los módulos de escaneo con los repositorios de código para detectar fallas lógicas o de diseño de forma temprana, antes de pasar a producción. Su impacto es preventivo.' },
  ]},
  { Icon: Database, name:'Información y datos', items: [
    { name:'Listado crudo de vulnerabilidades',             p:1, meta:'Electrónico · BD plataforma' },
    { name:'Inventario de activos tecnológicos',            p:1, meta:'Electrónico · Base de datos' },
    { name:'Tickets de incidencias priorizados',            p:2, meta:'Electrónico · Jira' },
    { name:'Reportes de diagnóstico y exposición',          p:2, meta:'Electrónico · PDF' },
    { name:'Registro de hallazgos de Pentesting',           p:2, meta:'Electrónico o papel' },
    { name:'Documentación de aceptación de riesgos',        p:2, meta:'PDF firmado digitalmente' },
    { name:'Reportes de cumplimiento y evidencia de parches',p:3, meta:'Evidencia documental' },
  ]},
  { Icon: Building2, name:'Edificios y ambiente de trabajo', items: [
    { name:'Acceso remoto (VPN / Home Office)', p:1, desc:'Alternativa operativa ante indisponibilidad física de las instalaciones.' },
    { name:'Oficina principal (CyberHunters HQ)', p:2, desc:'Centro de operaciones y monitoreo del servicio.' },
  ]},
  { Icon: Package, name:'Instalaciones, mobiliario y equipamiento', items: [
    { name:'Estaciones de trabajo (Laptops / PCs)', p:1, desc:'Equipos con las herramientas de seguridad instaladas.' },
    { name:'Suministro eléctrico / UPS',            p:1, desc:'Protección contra fallas de energía.' },
    { name:'Servidores locales',                    p:2, desc:'Almacenamiento temporal y herramientas de red.' },
  ]},
  { Icon: Server, name:'Sistemas de información y comunicaciones', items: [
    { name:'Plataforma de Gestión de Vulnerabilidades', p:1, desc:'Core del servicio.' },
    { name:'Conectividad a Internet (Dual Link)',        p:1, desc:'Acceso a nubes y a las bases de datos CVE.' },
    { name:'Herramienta de Ticketing (Jira)',            p:2, desc:'Gestión de incidentes y seguimiento de remediación.' },
  ]},
  { Icon: DollarSign, name:'Finanzas', items: [
    { name:'Presupuesto para contingencias', p:2, desc:'Fondos disponibles para recuperación inmediata.' },
  ]},
  { Icon: Handshake, name:'Proveedores y socios de negocio', items: [
    { name:'ISP (Proveedor de Internet)',      p:1, desc:'Suministro de conectividad redundante.' },
    { name:'Proveedor Cloud (AWS / Azure)',    p:1, desc:'Hosting de la plataforma de escaneo.' },
  ]},
  { Icon: Truck, name:'Transportación', items: [], na: true },
];

interface RPOItem {
  asset: string; rpo: string; rpoFull: string;
  prio: string; cls: 'crit' | 'warn' | 'info';
  ola: string; olaTxt: string;
}

const RPO: RPOItem[] = [
  { asset:'Configuración de la plataforma de gestión', rpo:'8h', rpoFull:'8 horas', prio:'Crítica', cls:'crit',
    ola:'Infraestructura', olaTxt:'Auditoría y control de acceso (RBAC) resuelta en máximo 8 horas hábiles.' },
  { asset:'Servicio de escaneo', rpo:'≤1%', rpoFull:'≤ 1% mensual tolerable', prio:'Crítica', cls:'crit',
    ola:'Aplicaciones', olaTxt:'Disponibilidad garantizada del 99% mensual.' },
  { asset:'Base de datos de hallazgos y vulnerabilidades', rpo:'24h', rpoFull:'24 horas', prio:'Alta', cls:'warn',
    ola:'Aplicaciones', olaTxt:'Copias de seguridad diarias de la base de datos de hallazgos.' },
  { asset:'Reportes históricos de cumplimiento de SLAs', rpo:'24h', rpoFull:'24 horas', prio:'Alta', cls:'warn',
    ola:'Infraestructura', olaTxt:'Resguardo histórico con retención mínima de 12 meses.' },
  { asset:'Sincronización con bases de datos externas (NVD / CVE)', rpo:'24h', rpoFull:'24 horas', prio:'Alta', cls:'warn',
    ola:'Infraestructura', olaTxt:'Sincronización automática diaria con NVD y CVE.' },
  { asset:'Firmas, plugins y reglas de detección', rpo:'72h', rpoFull:'72 horas', prio:'Media', cls:'info',
    ola:'Aplicaciones', olaTxt:'Actualización de firmas de malware/vulnerabilidades cada 72 horas en activos no críticos.' },
];

const GRUPO = [
  { k:'Grupo de productos y servicios', v:'Gestión de vulnerabilidades' },
  { k:'Responsable (área/función)',     v:'Seguridad de la información' },
  { k:'Fecha de llenado',              v:'01 / 06 / 2026' },
];

export default function BIAOperacional() {
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
          <div className="eyebrow"><span className="bar" /><span className="num">10</span> · Continuidad · Business Impact Analysis</div>
          <h1>BIA <em>Operacional</em></h1>
          <p className="lede">Análisis de impacto al negocio desde la perspectiva operativa diaria del servicio de <em>Gestión de Vulnerabilidades</em>. Identifica los recursos críticos que soportan la operación —personal, información, sistemas, infraestructura y proveedores—, establece sus niveles de prioridad y define los objetivos de recuperación que mantienen la continuidad ante interrupciones.</p>
          <div className="meta">
            <div className="m"><div className="k">Grupo de servicio</div><div className="v">Gestión de vulnerabilidades</div></div>
            <div className="m"><div className="k">Responsable</div><div className="v">Seguridad de la información</div></div>
            <div className="m"><div className="k">Recursos críticos</div><div className="v">22</div></div>
            <div className="m"><div className="k">Objetivos RPO</div><div className="v">06</div></div>
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
              >
                {t.label}
              </a>
            ))}
          </nav>

          {/* Content */}
          <main style={{ minWidth:0 }}>

            {/* 10.1 Introducción */}
            <section id="intro" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">10.1</span><h2>Introducción y objetivo</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose">
                  <p>La operación efectiva de los servicios de ciberseguridad depende de la disponibilidad y correcta coordinación de diversos recursos organizacionales, tecnológicos y humanos. Los servicios de gestión de vulnerabilidades requieren <strong>personal especializado, plataformas tecnológicas, información actualizada y mecanismos de comunicación</strong> que permitan identificar, analizar y remediar riesgos de seguridad de manera oportuna.</p>
                  <p className="dim">CyberHunters ofrece servicios especializados de gestión de vulnerabilidades mediante procesos de descubrimiento de activos, análisis de exposiciones, priorización de riesgos y seguimiento de la remediación. Dada la naturaleza crítica de estos servicios, resulta indispensable identificar los recursos que soportan su operación y determinar el impacto que tendría su indisponibilidad sobre la continuidad del negocio.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="doc-callout">
                  <Info size={18} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0 }} />
                  <p><strong>Objetivo.</strong> Identificar y evaluar los recursos operacionales críticos que soportan el servicio de Gestión de Vulnerabilidades —personal, información, sistemas tecnológicos, infraestructura y proveedores—, determinar su nivel de prioridad, establecer objetivos de recuperación y continuidad, y garantizar la disponibilidad de los servicios de ciberseguridad ante posibles interrupciones operativas.</p>
                </div>
              </Reveal>

              <Reveal>
                <div style={{ display:'flex', alignItems:'center', gap:14, margin:'38px 0 0', fontFamily:'var(--font-mono)', fontSize:12 }}>
                  <span style={{ color:'var(--acc)', letterSpacing:'.08em' }}>IDENTIFICACIÓN DEL GRUPO DEL SERVICIO</span>
                  <span style={{ flex:1, height:1, background:'var(--line)' }} />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', marginTop:8 }}>
                  {GRUPO.map((g) => (
                    <div key={g.k} style={{ background:'var(--bg-2)', padding:'22px 24px' }}>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)', lineHeight:1.4 }}>{g.k}</div>
                      <div style={{ fontSize:16, fontWeight:500, color:'var(--text)', marginTop:10, lineHeight:1.3 }}>{g.v}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* 10.2 Recursos críticos */}
            <section id="recursos" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">10.2</span><h2>Recursos críticos y prioridades</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose" style={{ marginBottom:20 }}>
                  <p className="dim">Inventario de los recursos que soportan la operación del servicio, agrupados por categoría y clasificados por nivel de prioridad. La prioridad refleja la urgencia de recuperación ante una interrupción: <strong>P1 (Alta)</strong> son recursos indispensables para la operación diaria, <strong>P2 (Media)</strong> de soporte relevante y <strong>P3 (Baja)</strong> de impacto diferido o preventivo.</p>
                </div>
              </Reveal>

              {/* Summary */}
              <Reveal style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:8 }}>
                {([['22','','Recursos identificados'],['10','danger','Prioridad alta (P1)'],['10','warn','Prioridad media (P2)'],['07','','Categorías']] as [string,string,string][]).map(([n,c,k]) => (
                  <div key={k} style={{ background:'var(--bg-0)', padding:24 }}>
                    <div style={{ fontSize:38, fontWeight:500, letterSpacing:'-.03em', lineHeight:1, color:c==='danger'?'var(--danger)':c==='warn'?'var(--warn)':'var(--acc)', fontFamily:'var(--font-sans)' }}>{n}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', marginTop:8 }}>{k}</div>
                  </div>
                ))}
              </Reveal>

              {/* Priority legend */}
              <Reveal style={{ display:'flex', flexWrap:'wrap', gap:10, margin:'24px 0 30px' }}>
                {([['danger','P1 · Alta — indispensable para la operación diaria'],['warn','P2 · Media — soporte relevante'],['info','P3 · Baja — impacto diferido / preventivo']] as [string,string][]).map(([c, label]) => (
                  <span key={c} style={{ display:'inline-flex', alignItems:'center', gap:9, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)', padding:'7px 13px', border:'1px solid var(--line)', borderRadius:50 }}>
                    <span style={{ width:9, height:9, borderRadius:'50%', background:c==='danger'?'var(--danger)':c==='warn'?'var(--warn)':'var(--info)', flexShrink:0 }} />
                    {label}
                  </span>
                ))}
              </Reveal>

              {/* Resource categories */}
              {CATS.map((cat) => {
                const hasMeta = cat.items.length > 0 && cat.items[0].meta !== undefined;
                return (
                  <Reveal key={cat.name} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background: cat.na ? 'var(--bg-1)' : 'var(--bg-2)', overflow:'hidden', marginBottom:16 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 24px', background:'var(--bg-0)', borderBottom:'1px solid var(--line)' }}>
                      <div style={{ width:30, height:30, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid var(--line-2)', borderRadius:6, color:'var(--acc)' }}>
                        <cat.Icon size={15} strokeWidth={1.5} />
                      </div>
                      <span style={{ fontSize:16, fontWeight:600, flex:1, letterSpacing:'-.01em' }}>{cat.name}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted-2)', letterSpacing:'.05em' }}>
                        {cat.na ? 'No aplica' : `${cat.items.length} recurso${cat.items.length !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                    {cat.na
                      ? <div style={{ padding:'18px 24px', fontSize:13.5, color:'var(--muted)', lineHeight:1.6 }}>No se identifican recursos de transporte críticos para la prestación del servicio.</div>
                      : cat.items.map((it) => {
                          const pr = PRIO_MAP[it.p];
                          return (
                            <div key={it.name} style={{
                              display:'grid',
                              gridTemplateColumns: hasMeta ? '1fr 150px' : '260px 1fr 150px',
                              gap:24, padding:'18px 24px', borderBottom:'1px solid var(--line)',
                              alignItems:'start',
                            }}>
                              <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                                <span style={{ fontSize:14.5, fontWeight:600, color:'var(--text)', lineHeight:1.3 }}>{it.name}</span>
                                {it.meta && (
                                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'oklch(0.74 0.13 230)', background:'oklch(0.74 0.13 230 / 0.1)', border:'1px solid oklch(0.74 0.13 230 / 0.2)', padding:'3px 8px', borderRadius:4, width:'fit-content' }}>{it.meta}</span>
                                )}
                              </div>
                              {!hasMeta && (
                                <div style={{ fontSize:13.5, lineHeight:1.6, color:'#cfd5dd' }}>{it.desc}</div>
                              )}
                              <div style={{ display:'flex', justifyContent:'flex-end', paddingTop:1 }}>
                                <span className={`doc-badge ${pr.cls}`}><span className="dot" />{pr.n} · {pr.label}</span>
                              </div>
                            </div>
                          );
                        })
                    }
                  </Reveal>
                );
              })}
            </section>

            {/* 10.3 RPO */}
            <section id="rpo" style={{ scrollMarginTop:16 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">10.3</span><h2>Objetivos de punto de recuperación (RPO)</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose" style={{ marginBottom:28 }}>
                  <p className="dim">El <strong>RPO</strong> (Recovery Point Objective) define la máxima pérdida de datos tolerable por activo de información, medida en tiempo. Cada objetivo se asocia a una <strong>OLA</strong> (Operational Level Agreement) interna —de Aplicaciones o Infraestructura— que garantiza su cumplimiento. Las tarjetas se ordenan de mayor a menor exigencia de recuperación.</p>
                </div>
              </Reveal>

              <Reveal style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
                {RPO.map((r) => {
                  const accentColor = r.cls === 'crit' ? 'var(--danger)' : r.cls === 'warn' ? 'var(--warn)' : 'var(--info)';
                  return (
                    <div key={r.asset} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:24, display:'flex', flexDirection:'column', gap:20, position:'relative', overflow:'hidden' }}>
                      <span style={{ position:'absolute', inset:'0 0 auto 0', height:3, background:accentColor }} />
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
                        <span style={{ fontSize:15, fontWeight:600, lineHeight:1.3, flex:1 }}>{r.asset}</span>
                        <span className={`doc-badge ${r.cls}`}><span className="dot" />{r.prio}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'baseline', gap:14, borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'16px 0' }}>
                        <span style={{ fontFamily:'var(--font-sans)', fontSize:46, fontWeight:600, letterSpacing:'-.04em', lineHeight:.9, color:accentColor }}>{r.rpo}</span>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)', lineHeight:1.7 }}>
                          RPO<br />{r.rpoFull}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--acc)' }}>OLA · {r.ola}</span>
                        <p style={{ margin:'9px 0 0', fontSize:13, lineHeight:1.6, color:'#cfd5dd' }}>{r.olaTxt}</p>
                      </div>
                    </div>
                  );
                })}
              </Reveal>
            </section>

          </main>
        </div>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · BO-10</span>
        <div className="nav">
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11, display:'flex', alignItems:'center', gap:6 }}>
            <ArrowRight size={12} strokeWidth={1.75} style={{ transform:'scaleX(-1)' }} /> BIA Táctico
          </span>
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11, display:'flex', alignItems:'center', gap:6 }}>
            Plan de continuidad <ArrowRight size={12} strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </>
  );
}
