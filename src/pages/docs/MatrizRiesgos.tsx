import { useState, useEffect, useRef } from 'react';
import { Info, ShieldAlert, ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

const TOC = [
  { href: '#cid',              label: 'Matriz CID' },
  { href: '#vm-proc1',         label: '· VM-PROC1 · Escaneo' },
  { href: '#vm-proc2',         label: '· VM-PROC2 · Análisis' },
  { href: '#vm-proc3',         label: '· VM-PROC3 · Remediación' },
  { href: '#vulnerabilidades', label: 'Análisis de vulnerabilidades' },
  { href: '#infraestructura',  label: 'Infraestructura crítica' },
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

interface CIDItem {
  proc: string; id: string; name: string;
  c: number; i: number; d: number;
  vuln: string; amen: string; risk: string; ctrl: string;
}
interface VulnCard {
  id: string; tag: string; name: string;
  sev: number; exp: number; vval: number;
  threat: string;
  cap: number; mot: number; tval: number;
  amenaza: number; prob: number; impacto: number; total: number;
  level: 'hi' | 'md' | 'lo';
}
interface InfraItem {
  proc: string; id: string; name: string;
  geo: number; per: number; imp: number;
  inf: number; cmp: number; dep: number;
  crit: 'IV' | 'III' | 'I';
}
interface CritCtrl { name: string; id: string; ctrl: string; }

const CID: CIDItem[] = [
  { proc:'VM-PROC1', id:'CH_VULNS', name:'Escáneres de vulnerabilidades', c:5, i:4, d:3,
    vuln:'Falta de actualización en las firmas, plugins y motores de escaneo automatizado.',
    amen:'Ataques de zero-day.',
    risk:'Ataque que explota una vulnerabilidad crítica de la que no se tenía conocimiento.',
    ctrl:'Procedimiento de actualización automática y diaria de las bases de datos de conocimiento del escáner.' },
  { proc:'VM-PROC1', id:'CH_SER', name:'Servidores y VMs', c:4, i:4, d:5,
    vuln:'Parches de seguridad pendientes de aplicar por falta de ventanas de mantenimiento documentadas.',
    amen:'Administrador que aplica parches sin pruebas previas.',
    risk:'Interrupción no planificada del servicio por incompatibilidad del parche.',
    ctrl:'Procedimiento formal de gestión de cambios con entornos de prueba, aprobaciones y ventanas de mantenimiento documentadas.' },
  { proc:'VM-PROC1', id:'CH_NET', name:'Dispositivos de red', c:3, i:3, d:5,
    vuln:'Firmware desactualizado en switches y routers.',
    amen:'Fallo espontáneo del firmware.',
    risk:'Caída de segmentos de red que interrumpe la comunicación.',
    ctrl:'Programa de actualización de firmware con inventario actualizado, pruebas en entorno controlado y monitoreo del estado de los dispositivos.' },
  { proc:'VM-PROC2', id:'CH_CLD', name:'Infraestructura cloud', c:4, i:3, d:5,
    vuln:'Políticas de IAM excesivamente permisivas.',
    amen:'Procesos que utilizan estos permisos excesivos sin revisión de seguridad.',
    risk:'Acceso a recursos fuera de su alcance.',
    ctrl:'Aplicación del principio de mínimo privilegio, revisiones periódicas de IAM y uso de herramientas de análisis de políticas.' },
  { proc:'VM-PROC2', id:'CH_DB', name:'Base de datos de hallazgos', c:5, i:5, d:4,
    vuln:'Ausencia de controles de exportación masiva de datos para usuarios con acceso legítimo de consulta.',
    amen:'Atacante interno que descarga el historial completo de vulnerabilidades para compartirlo externamente.',
    risk:'Fuga de información sensible sobre vulnerabilidades no remediadas de sistemas críticos de la organización.',
    ctrl:'Implementación de DLP, alertas sobre consultas masivas, monitoreo del comportamiento de usuario y segregación de funciones.' },
  { proc:'VM-PROC2', id:'CH_PERS', name:'Personal analista', c:3, i:4, d:3,
    vuln:'Falta de formación actualizada en técnicas de análisis de vulnerabilidades y criterios de clasificación de riesgo.',
    amen:'Analista que clasifica erróneamente una vulnerabilidad crítica como de riesgo bajo por desconocer el contexto de negocio.',
    risk:'Postergación de la remediación de una vulnerabilidad crítica explotable, incrementando la ventana de exposición.',
    ctrl:'Programa de capacitación continua, revisión por pares de hallazgos críticos y criterios de clasificación documentados alineados con CVSS.' },
  { proc:'VM-PROC3', id:'CH_CODE', name:'Repositorios de código', c:5, i:5, d:1,
    vuln:'API keys y tokens hardcodeados o presentes en el historial de commits del repositorio.',
    amen:'Pipeline de CI/CD que publica accidentalmente el repositorio como público durante una reconfiguración.',
    risk:'Exposición pública de credenciales.',
    ctrl:'Escaneo automático de secretos en cada commit (git-secrets, truffleHog), políticas de repositorio privado y rotación inmediata ante detección.' },
  { proc:'VM-PROC3', id:'CH_TICK', name:'Sistema de tickets', c:2, i:4, d:4,
    vuln:'Ausencia de respaldo automatizado y plan de recuperación ante desastres para la base de datos del sistema de tickets.',
    amen:'Fallo de hardware del servidor físico.',
    risk:'Pérdida del historial de tickets.',
    ctrl:'Backups automatizados fuera de sitio, RTO/RPO definidos y pruebas periódicas de restauración.' },
  { proc:'VM-PROC3', id:'CH_MAN', name:'Manuales de remediación', c:1, i:5, d:3,
    vuln:'Documentación de remediación desactualizada sin control de versiones ni proceso de revisión periódica.',
    amen:'Analista que aplica un procedimiento de remediación obsoleto, incompatible con la versión actual del sistema afectado.',
    risk:'Remediación incorrecta que introduce una nueva falla.',
    ctrl:'Control de versiones de los manuales, revisión periódica y validación de compatibilidad del procedimiento con la versión vigente del sistema antes de aplicarlo.' },
];

const VULN: VulnCard[] = [
  { id:'CH_CLD', tag:'Infraestructura cloud', name:'Políticas de IAM excesivamente permisivas',
    sev:3, exp:2, vval:4, threat:'Procesos que utilizan estos permisos excesivos sin revisión de seguridad.',
    cap:2, mot:2, tval:3, amenaza:3, prob:1, impacto:12, total:144, level:'md' },
  { id:'CH_CODE', tag:'Repositorios de código', name:'API keys y tokens hardcodeados en el repositorio',
    sev:3, exp:1, vval:3, threat:'Pipeline de CI/CD que publica el repositorio como público durante una reconfiguración.',
    cap:1, mot:2, tval:2, amenaza:2, prob:1, impacto:11, total:66, level:'lo' },
  { id:'CH_VULNS', tag:'Escáneres de vulnerabilidades', name:'Firmas y motores de escaneo desactualizados',
    sev:2, exp:2, vval:3, threat:'Ataques de zero-day que explotan una vulnerabilidad crítica desconocida.',
    cap:3, mot:3, tval:5, amenaza:5, prob:2, impacto:12, total:360, level:'hi' },
];

const INFRA: InfraItem[] = [
  { proc:'VM-PROC1', id:'CH_VULNS', name:'Escáneres de vulnerabilidades', geo:2,per:1,imp:2,inf:2,cmp:2,dep:3, crit:'III' },
  { proc:'VM-PROC1', id:'CH_SER',   name:'Servidores y VMs',              geo:2,per:2,imp:3,inf:1,cmp:2,dep:2, crit:'III' },
  { proc:'VM-PROC1', id:'CH_NET',   name:'Dispositivos de red',           geo:2,per:1,imp:2,inf:2,cmp:2,dep:3, crit:'III' },
  { proc:'VM-PROC2', id:'CH_CLD',   name:'Infraestructura cloud',         geo:2,per:2,imp:3,inf:2,cmp:2,dep:3, crit:'IV'  },
  { proc:'VM-PROC2', id:'CH_DB',    name:'Base de datos de hallazgos',    geo:3,per:2,imp:4,inf:2,cmp:2,dep:3, crit:'IV'  },
  { proc:'VM-PROC2', id:'CH_PERS',  name:'Personal analista',             geo:1,per:3,imp:3,inf:3,cmp:2,dep:4, crit:'IV'  },
  { proc:'VM-PROC3', id:'CH_CODE',  name:'Repositorios de código',        geo:3,per:3,imp:5,inf:1,cmp:1,dep:1, crit:'IV'  },
  { proc:'VM-PROC3', id:'CH_TICK',  name:'Sistema de tickets',            geo:3,per:1,imp:3,inf:2,cmp:2,dep:3, crit:'IV'  },
  { proc:'VM-PROC3', id:'CH_MAN',   name:'Manuales de remediación',       geo:1,per:1,imp:1,inf:1,cmp:1,dep:1, crit:'I'   },
];

const CRIT: CritCtrl[] = [
  { name:'Infraestructura cloud', id:'CH_CLD',
    ctrl:'Implementar políticas IAM granulares que otorguen únicamente los permisos estrictamente necesarios por rol y función. Revisar y eliminar permisos wildcard en todas las cuentas de servicio.' },
  { name:'Base de datos de hallazgos', id:'CH_DB',
    ctrl:'Definir un proceso formal para detectar y revertir modificaciones no autorizadas en los hallazgos, incluyendo comparación contra snapshots de referencia y notificación al responsable de seguridad y al equipo auditor.' },
  { name:'Personal analista', id:'CH_PERS',
    ctrl:'Definir un proceso de offboarding que incluya revocación inmediata de accesos al sistema de tickets, base de datos y herramientas de escaneo, además de transferencia documentada del conocimiento antes de la desvinculación.' },
  { name:'Repositorios de código', id:'CH_CODE',
    ctrl:'Integrar herramientas de detección de secretos como hook pre-commit y en el pipeline CI/CD. Bloquear automáticamente cualquier push que contenga patrones de API keys, tokens o contraseñas.' },
  { name:'Sistema de tickets', id:'CH_TICK',
    ctrl:'Configurar copias de seguridad automáticas diarias de la base de datos del sistema de tickets en una ubicación fuera del sitio principal. Definir RTO y RPO formales y realizar pruebas de restauración al menos una vez al trimestre.' },
];

const PROCS = ['VM-PROC1', 'VM-PROC2', 'VM-PROC3'];
const LEVEL_COLOR = { hi: 'var(--danger)', md: 'var(--warn)', lo: 'var(--info)' } as const;
const LEVEL_LABEL = { hi: 'Riesgo crítico', md: 'Riesgo medio', lo: 'Riesgo bajo' } as const;
const CRIT_CLS   = { IV: 'crit', III: 'warn', I: 'info' } as const;

function nivel(total: number) {
  if (total >= 11) return { label: 'Alto',  cls: 'crit' as const };
  if (total >=  7) return { label: 'Medio', cls: 'warn' as const };
  return                  { label: 'Bajo',  cls: 'info' as const };
}

function CIABar({ value }: { value: number }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:13, width:14, display:'inline-block', textAlign:'center' }}>{value}</span>
      <span style={{ width:42, height:5, borderRadius:3, background:'var(--bg-3)', overflow:'hidden', display:'inline-block' }}>
        <span style={{ display:'block', height:'100%', width:`${value/5*100}%`, background:'var(--acc)', borderRadius:3 }} />
      </span>
    </span>
  );
}

function GroupTag({ left, right, count }: { left: string; right?: string; count: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, margin:'28px 0 14px', fontFamily:'var(--font-mono)', fontSize:12 }}>
      <span style={{ color:'var(--acc)', letterSpacing:'.08em' }}>{left}</span>
      {right && <span style={{ color:'var(--muted)', letterSpacing:'.06em' }}>{right}</span>}
      <span style={{ flex:1, height:1, background:'var(--line)' }} />
      <span style={{ color:'var(--muted)' }}>{count}</span>
    </div>
  );
}

export default function MatrizRiesgos() {
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
          <div className="eyebrow"><span className="bar" /><span className="num">08</span> · Riesgo · ISO 31000</div>
          <h1>Matriz de <em>riesgos</em></h1>
          <p className="lede">Identificación, valoración y tratamiento de los riesgos del servicio de gestión de vulnerabilidades. Integra la <em>matriz CID</em> de valoración de activos con sus vulnerabilidades, amenazas y controles; el <em>análisis cuantitativo</em> de tres vulnerabilidades prioritarias; y la <em>matriz de infraestructura crítica</em> que identifica los activos de mayor impacto operacional.</p>
          <div className="meta">
            <div className="m"><div className="k">Activos evaluados</div><div className="v">09</div></div>
            <div className="m"><div className="k">Vulnerabilidades analizadas</div><div className="v">03</div></div>
            <div className="m"><div className="k">Infraestructuras críticas</div><div className="v">05</div></div>
            <div className="m"><div className="k">Marco</div><div className="v">ISO 31000</div></div>
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

            {/* 8.1 Matriz CID */}
            <section id="cid" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">8.1</span><h2>Matriz CID</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose" style={{ marginBottom:30 }}>
                  <p className="dim">Cada activo de información se valora sobre la tríada <strong>Confidencialidad · Integridad · Disponibilidad</strong> (escala 1–5). La suma determina el nivel de criticidad del activo y enmarca el binomio vulnerabilidad–amenaza que origina cada evento de riesgo, junto con el control propuesto para mitigarlo.</p>
                </div>
              </Reveal>

              {/* Summary strip */}
              <Reveal style={{ overflowX:'auto', marginBottom:36 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', minWidth:480 }}>
                  {([['09','','Activos valorados'],['06','danger','Nivel alto'],['03','warn','Nivel medio'],['14','','Valoración máxima']] as [string,string,string][]).map(([n,c,k]) => (
                    <div key={k} style={{ background:'var(--bg-0)', padding:24 }}>
                      <div style={{ fontSize:38, fontWeight:500, letterSpacing:'-.03em', lineHeight:1, color: c==='danger'?'var(--danger)':c==='warn'?'var(--warn)':'var(--acc)', fontFamily:'var(--font-sans)' }}>{n}</div>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', marginTop:8 }}>{k}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CID table */}
              <Reveal>
                <GroupTag left="VALORACIÓN CID" right="Tríada Confidencialidad · Integridad · Disponibilidad" count="" />
                <div style={{ overflowX:'auto' }}>
                  <table className="doc-tbl" style={{ minWidth:560 }}>
                    <thead>
                      <tr>
                        <th>Activo</th>
                        <th className="center">C</th>
                        <th className="center">I</th>
                        <th className="center">D</th>
                        <th className="center">Total</th>
                        <th>Nivel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CID.map((a) => {
                        const total = a.c + a.i + a.d;
                        const n = nivel(total);
                        return (
                          <tr key={a.id}>
                            <td><span className="em">{a.name}</span><br /><span className="mono">{a.id}</span></td>
                            <td className="center"><CIABar value={a.c} /></td>
                            <td className="center"><CIABar value={a.i} /></td>
                            <td className="center"><CIABar value={a.d} /></td>
                            <td className="center"><span style={{ fontFamily:'var(--font-sans)', fontSize:18, fontWeight:600 }}>{total}</span></td>
                            <td><span className={`doc-badge ${n.cls}`}><span className="dot" />{n.label}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              {/* Risk flow cards */}
              <GroupTag left="VULNERABILIDAD → AMENAZA → RIESGO → CONTROL" count="9 escenarios de riesgo" />
              {PROCS.map((proc) => {
                const items = CID.filter((a) => a.proc === proc);
                return (
                  <div key={proc} id={proc.toLowerCase()} style={{ scrollMarginTop:16 }}>
                    <GroupTag left={proc} count={`${items.length} escenario${items.length !== 1 ? 's' : ''}`} />
                    {items.map((a) => {
                      const total = a.c + a.i + a.d;
                      const n = nivel(total);
                      const steps = [
                        { label:'Vulnerabilidad',   text:a.vuln, color:'var(--warn)' },
                        { label:'Amenaza',          text:a.amen, color:'var(--danger)' },
                        { label:'Evento de riesgo', text:a.risk, color:'oklch(0.74 0.13 230)' },
                        { label:'Control',          text:a.ctrl, color:'var(--acc)' },
                      ];
                      return (
                        <Reveal key={a.id} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', overflow:'hidden', marginBottom:14 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:14, padding:'18px 24px', borderBottom:'1px solid var(--line)', background:'var(--bg-0)', flexWrap:'wrap' }}>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--acc)', fontWeight:600 }}>{a.id}</span>
                            <span style={{ fontSize:17, fontWeight:600, lineHeight:1.2, flex:1, minWidth:180 }}>{a.name}</span>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)' }}>CID <strong style={{ color:'var(--text)', fontSize:14 }}>{total}</strong></span>
                            <span className={`doc-badge ${n.cls}`}><span className="dot" />{n.label}</span>
                          </div>
                          <div style={{ overflowX:'auto' }}>
                            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,minmax(170px,1fr))', gap:1, background:'var(--line)', minWidth:580 }}>
                              {steps.map((step, si) => (
                                <div key={si} style={{ background:'var(--bg-2)', padding:'18px 20px', position:'relative' }}>
                                  <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:step.color, marginBottom:10 }}>
                                    <span style={{ width:18, height:18, borderRadius:'50%', border:'1px solid var(--line-2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'var(--acc)', flexShrink:0 }}>{si+1}</span>
                                    {step.label}
                                  </div>
                                  <p style={{ margin:0, fontSize:13, lineHeight:1.55, color:'#cfd5dd' }}>{step.text}</p>
                                  {si < 3 && (
                                    <span style={{ position:'absolute', right:-7, top:24, zIndex:3, color:'var(--muted-2)', background:'var(--bg-1)', width:14, height:14, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%' }}>
                                      <ArrowRight size={10} strokeWidth={2} />
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                );
              })}
            </section>

            {/* 8.2 Análisis de vulnerabilidades */}
            <section id="vulnerabilidades" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">8.2</span><h2>Análisis de vulnerabilidades</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose" style={{ marginBottom:28 }}>
                  <p className="dim">Análisis cuantitativo de las tres vulnerabilidades prioritarias. Cada una se descompone en su componente de <strong>vulnerabilidad</strong> (severidad × exposición) y de <strong>amenaza</strong> (capacidad de actuar × motivación de explotación). El riesgo residual con control se calcula como <strong>Amenaza × Probabilidad × Impacto</strong>.</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="doc-callout" style={{ marginBottom:28 }}>
                  <Info size={18} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0 }} />
                  <p>El <strong>riesgo total</strong> ordena la prioridad de tratamiento: a mayor producto, mayor exposición de la organización. El escenario de <em>zero-day sobre los escáneres</em> encabeza la lista con <strong>360</strong>, seguido del de <em>IAM permisivo en la nube</em> con <strong>144</strong>.</p>
                </div>
              </Reveal>

              <Reveal style={{ overflowX:'auto' }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:24, minWidth:600 }}>
                  {VULN.map((v) => (
                    <div key={v.id} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'26px 24px', display:'flex', flexDirection:'column', gap:20, position:'relative', overflow:'hidden' }}>
                      <span style={{ position:'absolute', inset:'0 0 auto 0', height:3, background:LEVEL_COLOR[v.level] }} />
                      <div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)' }}>
                          {v.tag} · <span style={{ color:'var(--acc)' }}>{v.id}</span>
                        </div>
                        <h3 style={{ fontSize:16, fontWeight:600, lineHeight:1.3, margin:'8px 0 0' }}>{v.name}</h3>
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                        {[
                          { title:'Vulnerabilidad', val:v.vval, metrics:[['Severidad',v.sev],['Exposición',v.exp]] as [string,number][] },
                          { title:'Amenaza',        val:v.tval, metrics:[['Capacidad',v.cap],['Motivación',v.mot]] as [string,number][] },
                        ].map((blk) => (
                          <div key={blk.title}>
                            <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted)', marginBottom:9, display:'flex', alignItems:'center', gap:7 }}>
                              {blk.title} <span style={{ flex:1, height:1, background:'var(--line)' }} /> {blk.val}
                            </div>
                            <div style={{ display:'flex', gap:10 }}>
                              {blk.metrics.map(([mk, mv]) => (
                                <div key={mk} style={{ flex:1, background:'var(--bg-0)', border:'1px solid var(--line)', borderRadius:4, padding:'11px 12px' }}>
                                  <div style={{ fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted-2)', lineHeight:1.3 }}>{mk}</div>
                                  <div style={{ fontFamily:'var(--font-sans)', fontSize:24, fontWeight:600, lineHeight:1, marginTop:6 }}>{mv}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop:'auto', borderTop:'1px solid var(--line)', paddingTop:18 }}>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:10 }}>Riesgo con control</div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted)', lineHeight:1.6 }}>
                          Amenaza <strong style={{ color:'var(--text)' }}>{v.amenaza}</strong> × Probabilidad <strong style={{ color:'var(--text)' }}>{v.prob}</strong> × Impacto <strong style={{ color:'var(--text)' }}>{v.impacto}</strong>
                        </div>
                        <div style={{ display:'flex', alignItems:'baseline', gap:10, marginTop:12 }}>
                          <span style={{ fontFamily:'var(--font-sans)', fontSize:40, fontWeight:600, letterSpacing:'-.03em', lineHeight:1, color:LEVEL_COLOR[v.level] }}>{v.total}</span>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)' }}>{LEVEL_LABEL[v.level]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* 8.3 Infraestructura crítica */}
            <section id="infraestructura" style={{ scrollMarginTop:16 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">8.3</span><h2>Matriz de infraestructura crítica</h2><span className="rule" /></div></Reveal>

              <Reveal>
                <div className="doc-prose" style={{ marginBottom:28 }}>
                  <p className="dim">Identificación de las infraestructuras críticas según su <strong>área geográfica</strong>, <strong>periodo de afectación</strong>, <strong>impacto</strong>, número de infraestructuras afectadas, campos comprometidos e <strong>interdependencia</strong>. El grado de criticidad resultante (I a IV) prioriza qué activos requieren controles reforzados.</p>
                </div>
              </Reveal>

              <Reveal style={{ overflowX:'auto' }}>
                <table className="doc-tbl" style={{ minWidth:680 }}>
                  <thead>
                    <tr>
                      <th>Activo</th>
                      <th className="center">Área geo.</th>
                      <th className="center">Periodo</th>
                      <th className="center">Impacto</th>
                      <th className="center">Infra. afect.</th>
                      <th className="center">Campos</th>
                      <th className="center">Interdep.</th>
                      <th className="center">Criticidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INFRA.map((a) => (
                      <tr key={a.id}>
                        <td><span className="em">{a.name}</span><br /><span className="mono">{a.id}</span></td>
                        {[a.geo, a.per, a.imp, a.inf, a.cmp, a.dep].map((v, i) => (
                          <td key={i} className="center"><span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#cfd5dd' }}>{v}</span></td>
                        ))}
                        <td className="center">
                          <span className={`doc-badge ${CRIT_CLS[a.crit]}`} style={{ justifyContent:'center', fontWeight:600, minWidth:34 }}>{a.crit}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>

              {/* Legend */}
              <Reveal style={{ overflowX:'auto', marginTop:18 }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', minWidth:480 }}>
                  {[
                    { title:'Área geográfica', rows:[['1','Una sola ubicación / nodo afectado'],['2','Más de una ubicación afectada'],['3','Todas las ubicaciones afectadas']] },
                    { title:'Periodo de afectación', rows:[['1','6 horas o menos'],['2','Menos de 24 horas'],['3','Más de 24 horas']] },
                    { title:'Infraestructuras afectadas', rows:[['1','Solo una afectada'],['2','Más de una afectada'],['3','Todas afectadas']] },
                  ].map((lg) => (
                    <div key={lg.title} style={{ background:'var(--bg-2)', padding:'20px 22px' }}>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--acc)', marginBottom:12 }}>{lg.title}</div>
                      <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                        {lg.rows.map(([k, v]) => (
                          <li key={k} style={{ fontSize:12.5, lineHeight:1.5, color:'var(--muted)', paddingLeft:24, position:'relative', marginBottom:7 }}>
                            <span style={{ position:'absolute', left:0, top:0, fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text)', fontWeight:600 }}>{k}</span>
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Critical infra cards */}
              <GroupTag left="INFRAESTRUCTURAS CRÍTICAS DETECTADAS" count="5 activos · grado IV" />
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {CRIT.map((c) => (
                  <Reveal key={c.id} style={{ overflowX:'auto' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', background:'var(--bg-2)', minWidth:480 }}>
                      <div style={{ background:'var(--bg-0)', padding:'22px 24px', borderRight:'1px solid var(--line)', display:'flex', flexDirection:'column', gap:12, justifyContent:'center' }}>
                        <span className="doc-badge crit" style={{ alignSelf:'flex-start', fontWeight:600 }}>IV</span>
                        <span style={{ fontSize:16, fontWeight:600, lineHeight:1.25 }}>{c.name}</span>
                      </div>
                      <div style={{ padding:'22px 26px', display:'flex', gap:14, alignItems:'flex-start' }}>
                        <ShieldAlert size={16} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0, marginTop:2 }} />
                        <p style={{ margin:0, fontSize:14, lineHeight:1.65, color:'#cfd5dd' }}>
                          <span style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:8 }}>Control a implementar</span>
                          {c.ctrl}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · MR-08</span>
        <div className="nav">
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11, display:'flex', alignItems:'center', gap:6 }}>
            <ArrowRight size={12} strokeWidth={1.75} style={{ transform:'scaleX(-1)' }} /> Inventario de activos
          </span>
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11, display:'flex', alignItems:'center', gap:6 }}>
            BIA Táctico <ArrowRight size={12} strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </>
  );
}
