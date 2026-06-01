import { useState, useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Shield, Zap, Scale, RefreshCw, Award, Info, AlertTriangle, Target } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

const TOC = [
  { href: '#info',         label: 'Información del servicio' },
  { href: '#antecedentes', label: 'Antecedentes' },
  { href: '#tecnica',      label: 'Justificación técnica' },
  { href: '#alcance',      label: 'Alcance' },
  { href: '#objetivo',     label: 'Objetivo' },
  { href: '#riesgos',      label: 'Riesgos clave' },
  { href: '#beneficios',   label: 'Beneficios esperados' },
  { href: '#planeacion',   label: 'Planeación · Personal' },
  { href: '#economica',    label: 'Justificación económica' },
  { href: '#glosario',     label: 'Glosario técnico' },
  { href: '#referencias',  label: 'Referencias' },
];

function useTocActive(ids: string[]) {
  const [active, setActive] = useState(ids[0] || '');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const RISKS = [
  { id:'RK·01', title:'Falsos positivos',                     desc:'Las herramientas automatizadas pueden generar un alto volumen de falsos positivos, saturando a los analistas de ciberseguridad y retrasando la atención de amenazas reales.' },
  { id:'RK·02', title:'Ataques por vulnerabilidades no mitigadas', desc:'Que una vulnerabilidad crítica pase desapercibida o no se mitigue a tiempo, permitiendo ataques que comprometan la información u operación del cliente.' },
  { id:'RK·03', title:'Puntos ciegos por limitación del alcance', desc:'Como el servicio se limita a la detección automatizada y excluye pruebas de penetración manuales, existe el riesgo de no identificar vulnerabilidades lógicas complejas.' },
  { id:'RK·04', title:'Incumplimiento de los SLA de remediación', desc:'Que el equipo encargado de la remediación no solucione los fallos dentro de los niveles de acuerdo establecidos, manteniendo una ventana de exposición prolongada.' },
  { id:'RK·05', title:'Activos no identificados',               desc:'Que se implementen nuevos activos por otras áreas sin notificar al equipo de seguridad. Al no estar en el inventario oficial, las herramientas no los evaluarán.' },
];

interface Benefit { Icon: LucideIcon; title: string; desc: string; }

const BENEFITS: Benefit[] = [
  { Icon: ShieldCheck, title: 'Reducción de riesgos de seguridad', desc: 'Identificar y corregir fallas antes de que puedan ser explotadas, reduciendo significativamente el riesgo de incidentes.' },
  { Icon: Shield,      title: 'Protección de la información',     desc: 'Al detectar debilidades en aplicaciones, redes y sistemas se protege la confidencialidad, integridad y disponibilidad de la información crítica.' },
  { Icon: Zap,         title: 'Prevención de incidentes y ataques', desc: 'La detección temprana permite aplicar medidas correctivas antes de que escalen, evitando ataques o accesos no autorizados.' },
  { Icon: Scale,       title: 'Cumplimiento de normativas',       desc: 'Facilita el cumplimiento de buenas prácticas y estándares internacionales de gobierno de TI y seguridad de la información.' },
  { Icon: RefreshCw,   title: 'Mejora continua de la infraestructura', desc: 'El monitoreo constante mantiene los sistemas actualizados con los últimos parches, reduciendo la superficie de ataque.' },
  { Icon: Award,       title: 'Mayor confianza en los servicios', desc: 'Una gestión adecuada incrementa la confianza de usuarios, clientes y colaboradores en los sistemas digitales de la organización.' },
];

const GLOSSARY = [
  ['Vulnerabilidad', 'Debilidad en la lógica computacional (software o hardware) que, al ser explotada, impacta negativamente en la seguridad.'],
  ['Vector de ataque', 'Vía o método por el cual un actor malicioso obtiene acceso a un sistema o red para explotar una vulnerabilidad.'],
  ['Superficie de ataque', 'Conjunto total de puntos de entrada (activos, configuraciones, puertos) que pueden ser expuestos a posibles ataques.'],
  ['Tríada de la seguridad', 'Los tres pilares fundamentales: confidencialidad, integridad y disponibilidad.'],
  ['Falso positivo', 'Resultado de una herramienta que identifica erróneamente una amenaza o vulnerabilidad inexistente.'],
  ['Gestión de vulnerabilidades', 'Ciclo de vida que incluye la identificación, priorización y remediación de fallos en sistemas y aplicaciones.'],
  ['VPR (Vulnerability Priority Rating)', 'Valor de priorización utilizado para filtrar fallos según el rol del activo en la empresa.'],
  ['SLA (Service Level Agreement)', 'Niveles de acuerdo que establecen tiempos y responsabilidades para la remediación.'],
  ['Remediación', 'Proceso de corrección o mitigación de las vulnerabilidades encontradas en los sistemas.'],
  ['Pruebas de penetración', 'Evaluaciones manuales y sistemáticas para encontrar fallos lógicos complejos, excluidas de la detección automatizada.'],
  ['Activo tecnológico', 'Cualquier componente de hardware o software que forma parte de la infraestructura de la empresa.'],
  ['Cloud Agents', 'Agentes ligeros basados en la nube que reportan información de activos en tiempo real.'],
];

export default function CasoNegocio() {
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
          <div className="eyebrow"><span className="bar" /><span className="num">05</span> · Justificación · Business Case</div>
          <h1>Caso de <em>negocio</em></h1>
          <p className="lede">La justificación técnica y económica del servicio de gestión de vulnerabilidades: por qué es necesario, qué cubre, qué riesgos atiende y cómo se compara frente a las alternativas del mercado.</p>
          <div className="meta">
            <div className="m"><div className="k">Servicio</div><div className="v">Gestión de vulnerabilidades</div></div>
            <div className="m"><div className="k">Clave</div><div className="v">GV-1</div></div>
            <div className="m"><div className="k">Periodo</div><div className="v">04 feb – 12 jun 2026</div></div>
            <div className="m"><div className="k">Administrador</div><div className="v">Irmin Hernández J.</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap" style={{ paddingTop:56, paddingBottom:56 }} ref={scrollRef}>
        <div className="doc-withtoc">
          {/* TOC */}
          <nav className="doc-toc">
            <div className="tl">Contenido</div>
            {TOC.map(t => (
              <a key={t.href} href={t.href} className={active === t.href.slice(1) ? 'active' : ''} onClick={(e) => scrollTo(t.href.slice(1), e)}>
                {t.label}
              </a>
            ))}
          </nav>

          {/* Content */}
          <main>
            {/* 5.1 */}
            <section id="info" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.1</span><h2>Información del servicio</h2><span className="rule" /></div></Reveal>
              <Reveal>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden' }}>
                  {[['Servicio','Gestión de vulnerabilidades'],['Clave','GV-1'],['Inicio','04 feb 2026'],['Fin','12 jun 2026'],['Administrador','Irmin Hernández J.']].map(([k,v]) => (
                    <div key={k} style={{ background:'var(--bg-0)', padding:'20px 18px' }}>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted-2)', letterSpacing:'.12em', textTransform:'uppercase' }}>{k}</div>
                      <div style={{ fontSize:14, fontWeight:500, marginTop:8, lineHeight:1.3, color: k==='Clave' ? 'var(--acc)' : 'var(--text)', fontFamily: k==='Clave' ? 'var(--font-mono)' : 'inherit' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* 5.2 */}
            <section id="antecedentes" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.2</span><h2>Antecedentes</h2><span className="rule" /></div></Reveal>
              <Reveal className="doc-prose">
                <p>En el ámbito de las Tecnologías de la Información, una <strong>vulnerabilidad</strong> se define como una debilidad en la lógica computacional —por ejemplo, el código— que se encuentra en los componentes de software y hardware y que, cuando se explota, tiene un impacto negativo en la confidencialidad, la integridad o la disponibilidad.</p>
                <p>Estas brechas pueden existir a nivel de configuración de infraestructura, en fallos de diseño de red o directamente en el código fuente de las aplicaciones, actuando como vectores de entrada que exponen los activos de información.</p>
                <p>La criticidad de identificar y gestionar estas debilidades radica en el dinámico panorama de amenazas actual. Cuando una vulnerabilidad no es mitigada a tiempo, crea el escenario propicio para ser explotada por actores maliciosos, comprometiendo directamente la <strong>tríada fundamental</strong> de la seguridad: confidencialidad, integridad y disponibilidad.</p>
                <p className="dim">La ausencia de evaluaciones sistemáticas y periódicas genera puntos ciegos en la superficie de ataque de la organización.</p>
              </Reveal>
            </section>

            {/* 5.3 */}
            <section id="tecnica" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.3</span><h2>Justificación técnica</h2><span className="rule" /></div></Reveal>
              <Reveal className="doc-prose"><p>En las empresas muchas veces es necesario abordar de buena forma las vulnerabilidades que se presenten, pues al estar en continuo desarrollo tecnológico, muchas tecnologías presentan distintas vulnerabilidades que podrían tener un impacto crítico si se mantiene una ventana de exposición demasiado prolongada.</p></Reveal>
              <Reveal style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginTop:16 }}>
                {[
                  ['RAZÓN 01','Visibilidad de activos','Escanear continuamente los activos tecnológicos expuestos, manteniendo un registro apropiado de todo lo utilizado dentro de la empresa.'],
                  ['RAZÓN 02','Priorización inteligente','Utilizar el Valor de Priorización de Vulnerabilidades (VPR) para filtrar de forma más inteligente según el rol del activo en la empresa.'],
                  ['RAZÓN 03','Reducir superficie de ataque','Enfoque preventivo mediante inspecciones periódicas de código, configuraciones, software y puertos abiertos innecesarios.'],
                ].map(([rn,h,p]) => (
                  <div key={rn} style={{ padding:24, border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.12em', marginBottom:12 }}>{rn}</div>
                    <h4 style={{ fontSize:17, fontWeight:500, margin:'0 0 10px' }}>{h}</h4>
                    <p style={{ fontSize:13.5, lineHeight:1.6, color:'var(--muted)', margin:0 }}>{p}</p>
                  </div>
                ))}
              </Reveal>
              <Reveal><div className="doc-callout" style={{ marginTop:20 }}><Info size={18} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0 }} /><p>Una gestión continua permite que los ataques se presenten con menor frecuencia, y con un plan previo si llegan a presentarse, a diferencia de un enfoque puramente reactivo.</p></div></Reveal>
            </section>

            {/* 5.4 */}
            <section id="alcance" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.4</span><h2>Alcance</h2><span className="rule" /></div></Reveal>
              <Reveal className="doc-prose"><p>El servicio brinda gestión de vulnerabilidades sobre: infraestructura física de red, infraestructura física de servidores, estaciones de trabajo, máquinas virtuales, código desarrollado por la empresa y configuraciones de la nube. La gestión se realiza de forma <strong>automatizada</strong> mediante escaneos periódicos, con seguimiento continuo y SLAs por nivel de criticidad.</p></Reveal>
              <Reveal><div className="doc-callout warn"><AlertTriangle size={18} strokeWidth={1.5} style={{ color:'var(--warn)', flexShrink:0 }} /><p>El servicio se limita a las vulnerabilidades detectadas de forma automatizada. <strong>No</strong> realiza pruebas de penetración manuales.</p></div></Reveal>
            </section>

            {/* 5.5 */}
            <section id="objetivo" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.5</span><h2>Objetivo</h2><span className="rule" /></div></Reveal>
              <Reveal><div className="doc-callout" style={{ borderLeftColor:'var(--acc)', background:'linear-gradient(180deg,var(--acc-soft),transparent)' }}><Target size={18} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0 }} /><p style={{ fontSize:16, color:'var(--text)' }}>Implementar un servicio de gestión de vulnerabilidades que integre el escaneo de activos, código e infraestructura física y virtual, generando reportes y direccionamiento automático con el equipo de remediación, e implementando procesos para la corrección de vulnerabilidades o la asunción de riesgos relacionados.</p></div></Reveal>
            </section>

            {/* 5.6 */}
            <section id="riesgos" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.6</span><h2>Riesgos clave</h2><span className="rule" /></div></Reveal>
              {RISKS.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.05}>
                  <div style={{ display:'flex', gap:16, padding:'18px 20px', border:'1px solid var(--line)', borderLeft:'3px solid var(--danger)', borderRadius:'var(--radius)', background:'var(--bg-2)', marginBottom:10 }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--danger)', flexShrink:0, paddingTop:2, width:44 }}>{r.id}</div>
                    <div><p style={{ fontSize:15, fontWeight:600, color:'var(--text)', margin:'0 0 6px' }}>{r.title}</p><p style={{ fontSize:13.5, lineHeight:1.6, color:'var(--muted)', margin:0 }}>{r.desc}</p></div>
                  </div>
                </Reveal>
              ))}
            </section>

            {/* 5.7 */}
            <section id="beneficios" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.7</span><h2>Beneficios esperados</h2><span className="rule" /></div></Reveal>
              <Reveal style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {BENEFITS.map((b) => (
                  <div key={b.title} style={{ padding:22, border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-0)' }}>
                    <div style={{ width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--acc)', border:'1px solid var(--acc-dim)', background:'var(--acc-soft)', marginBottom:12 }}>
                      <b.Icon size={16} strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontSize:15, fontWeight:600, margin:'0 0 7px' }}>{b.title}</h4>
                    <p style={{ fontSize:13.5, lineHeight:1.6, color:'var(--muted)', margin:0 }}>{b.desc}</p>
                  </div>
                ))}
              </Reveal>
            </section>

            {/* 5.8 */}
            <section id="planeacion" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.8</span><h2>Planeación a alto nivel · Personal</h2><span className="rule" /></div></Reveal>
              <Reveal>
                <table className="doc-tbl">
                  <thead><tr><th>Perfil</th><th className="center">Número</th><th>Tipo de contrato</th></tr></thead>
                  <tbody>
                    {[['Responsable de Seguridad de la Información (CISO / Security Manager)','1'],['Analista de Ciberseguridad / Vulnerability Analyst','2'],['Ingeniero de Infraestructura / Sistemas','2'],['QA / Tester de Software','2']].map(([r,n]) => (
                      <tr key={r}><td className="em">{r}</td><td className="center mono">{n}</td><td>Tiempo completo</td></tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </section>

            {/* 5.9 */}
            <section id="economica" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.9</span><h2>Justificación económica · Estudio de mercado</h2><span className="rule" /></div></Reveal>
              {[
                { name:'Tenable One', badge:'Plataforma de exposición', pros:'Visión integral de las vulnerabilidades en software; unifica Nessus, Tenable.io y Tenable.ad, analizando rutas de ataque, identidades y activos en la nube para un puntaje de exposición más preciso.', cons:'Alto costo al integrar muchas herramientas; puede ser difícil de manejar y sus capacidades de seguimiento a la remediación son menos maduras que las de detección.' },
                { name:'Qualys', badge:'Cloud / TruRisk', pros:'Escala masivamente sin perder precisión usando cloud agents que reportan casi en tiempo real. Su motor TruRisk prioriza muy bien según las necesidades del negocio.', cons:'Se siente como un sistema heredado, lento en redes con muchos activos; sin sus agentes los escaneos masivos son lentos, y no es muy abierto a integraciones externas.' },
                { name:'Rapid7', badge:'InsightVM + Metasploit', pros:'Excelente integración y generación de reportes para que seguridad y TI trabajen sobre el mismo camino, con integración nativa con Metasploit.', cons:'Alto costo y un gran número de falsos positivos que deben ser analizados.' },
              ].map((t) => (
                <Reveal key={t.name} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', overflow:'hidden', marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:'1px solid var(--line)' }}>
                    <h4 style={{ fontSize:19, fontWeight:600, margin:0 }}>{t.name}</h4>
                    <span className="doc-badge info"><span className="dot" />{t.badge}</span>
                  </div>
                  <div style={{ padding:'18px 22px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
                    <div><div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--acc)', marginBottom:8 }}>Fortalezas</div><p style={{ fontSize:13.5, lineHeight:1.65, color:'var(--muted)', margin:0 }}>{t.pros}</p></div>
                    <div><div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--warn)', marginBottom:8 }}>Limitantes</div><p style={{ fontSize:13.5, lineHeight:1.65, color:'var(--muted)', margin:0 }}>{t.cons}</p></div>
                  </div>
                </Reveal>
              ))}
              <Reveal><div className="doc-callout"><Info size={18} strokeWidth={1.5} style={{ color:'var(--acc)', flexShrink:0 }} /><p>La propuesta va más allá de implementar una de estas herramientas: si bien son potentes para la detección, la remediación sigue en manos de un equipo humano alineado a las prioridades del negocio. El servicio las <strong>integra de forma inteligente</strong> añadiendo un proceso formal de remediación.</p></div></Reveal>
            </section>

            {/* 5.10 */}
            <section id="glosario" style={{ scrollMarginTop:16, marginBottom:56 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.10</span><h2>Glosario técnico</h2><span className="rule" /></div></Reveal>
              <Reveal>
                <dl style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden' }}>
                  {GLOSSARY.map(([term, def]) => (
                    <div key={term} style={{ background:'var(--bg-0)', padding:'18px 20px' }}>
                      <dt style={{ fontSize:14, fontWeight:600, color:'var(--acc)', marginBottom:6 }}>{term}</dt>
                      <dd style={{ margin:0, fontSize:13, lineHeight:1.6, color:'var(--muted)' }}>{def}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </section>

            {/* 5.11 */}
            <section id="referencias" style={{ scrollMarginTop:16 }}>
              <Reveal><div className="doc-sec-h"><span className="idx">5.11</span><h2>Referencias</h2><span className="rule" /></div></Reveal>
              <Reveal>
                <ol style={{ listStyle:'none', padding:0, margin:0, counterReset:'r' }}>
                  {['NIST, «National Vulnerability Database», NIST, 3 ago 2023. nvd.nist.gov/vuln','IBM, «¿Qué es la gestión de vulnerabilidades?», Think. ibm.com/mx-es/think/topics/vulnerability-management','Tenable Inc., «Tenable One». tenable.com/products/tenable-one','Qualys Inc., «Enterprise Cyber Risk and Security». qualys.com','Rapid7, «Rapid7 Managed Cybersecurity». rapid7.com'].map((ref, i) => (
                    <li key={i} style={{ counterIncrement:'r', display:'flex', gap:14, padding:'12px 0', borderBottom:'1px solid var(--line)', fontSize:13.5, color:'var(--muted)', lineHeight:1.5 }}>
                      <span style={{ fontFamily:'var(--font-mono)', color:'var(--acc)', flexShrink:0 }}>[{i+1}]</span>
                      {ref}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>
          </main>
        </div>
      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · CN-05</span>
        <div className="nav">
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11 }}>← Mapa estratégico</span>
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11 }}>Cédula de servicio →</span>
        </div>
      </div>
    </>
  );
}
