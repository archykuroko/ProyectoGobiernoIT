import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/DocContent/Reveal';

interface StratCard { code: string; title: string; items: string[]; }
interface Scenario {
  code: string; title: string;
  rto?: string; rpo?: string;
  desc: string; impact: string[]; steps: string[];
  responsible: string;
}
interface MaintCard { freq: string; label: string; }
interface CommRow { event: string; resp: string; time: string; }

const STRATS: StratCard[] = [
  { code:'EST·01', title:'Respaldo de información', items:[
    'Copias de seguridad diarias de bases de datos.',
    'Respaldo histórico de reportes de cumplimiento.',
    'Almacenamiento de respaldos en ubicación alterna.',
  ]},
  { code:'EST·02', title:'Redundancia tecnológica', items:[
    'Uso de infraestructura cloud con capacidad de recuperación.',
    'Replicación de configuraciones críticas.',
    'Disponibilidad de snapshots para recuperación rápida.',
  ]},
  { code:'EST·03', title:'Gestión de personal crítico', items:[
    'Capacitación cruzada entre analistas.',
    'Documentación de procedimientos operativos.',
    'Transferencia formal de conocimiento.',
  ]},
  { code:'EST·04', title:'Gestión de accesos', items:[
    'Aplicación del principio de mínimo privilegio.',
    'Revisión periódica de permisos.',
    'Uso de cuentas de emergencia controladas.',
  ]},
  { code:'EST·05', title:'Gestión de proveedores', items:[
    'Monitoreo de disponibilidad de servicios externos.',
    'Acuerdos de nivel de servicio (SLA).',
    'Procedimientos alternos en caso de indisponibilidad.',
  ]},
];

const SCENARIOS: Scenario[] = [
  {
    code:'ESC·01', title:'Indisponibilidad de la infraestructura Cloud',
    rto:'8 horas',
    desc:'Interrupción de servicios causada por fallas del proveedor cloud, errores de configuración o compromiso de cuentas privilegiadas.',
    impact:['Interrupción de los escaneos.','Pérdida de acceso a información crítica.','Incumplimiento de SLA.'],
    steps:['Restaurar configuraciones respaldadas.','Recuperar políticas IAM validadas.','Activar región secundaria de operación.','Utilizar cuentas de emergencia para recuperación.'],
    responsible:'Ingeniero de Infraestructura y CISO',
  },
  {
    code:'ESC·02', title:'Compromiso de la base de datos de hallazgos',
    rto:'8 horas', rpo:'24 horas',
    desc:'Acceso no autorizado, modificación o extracción de información relacionada con vulnerabilidades detectadas.',
    impact:['Pérdida de integridad de la información.','Exposición de información sensible.','Riesgo reputacional.'],
    steps:['Restaurar la última copia de seguridad válida.','Revisar registros de auditoría.','Bloquear accesos comprometidos.','Notificar al responsable de seguridad.'],
    responsible:'Analista de Ciberseguridad y Administrador de Base de Datos',
  },
  {
    code:'ESC·03', title:'Ausencia del personal analista',
    rto:'< 24 horas',
    desc:'Indisponibilidad del analista por renuncia, incapacidad médica o desvinculación.',
    impact:['Retraso en clasificación de vulnerabilidades.','Aumento de la ventana de exposición.','Afectación en la operación diaria.'],
    steps:['Activar esquema de sustitución.','Utilizar documentación operativa.','Transferir responsabilidades al analista de respaldo.','Ejecutar capacitación acelerada si es necesario.'],
    responsible:'CISO',
  },
  {
    code:'ESC·04', title:'Exposición de credenciales en repositorios',
    rto:'< 4 horas',
    desc:'Publicación accidental de API Keys, tokens o credenciales dentro de repositorios de código.',
    impact:['Acceso no autorizado.','Compromiso de servicios.','Escalamiento de privilegios.'],
    steps:['Revocación inmediata de credenciales.','Rotación de secretos.','Escaneo completo de repositorios.','Validación de accesos posteriores.'],
    responsible:'QA, DevOps y Analista de Seguridad',
  },
  {
    code:'ESC·05', title:'Pérdida del sistema de tickets',
    rto:'8 horas', rpo:'24 horas',
    desc:'Corrupción de datos o falla del sistema utilizado para la gestión de incidencias.',
    impact:['Pérdida de trazabilidad.','Incumplimiento de acuerdos de servicio.','Retrasos en remediación.'],
    steps:['Restaurar respaldo de la base de datos.','Activar procedimiento manual temporal.','Recuperar historial de incidencias.'],
    responsible:'Ingeniero de Infraestructura',
  },
];

const COMM: CommRow[] = [
  { event:'Detección de incidente crítico', resp:'Analista',         time:'Inmediato (< 30 min)' },
  { event:'Activación del plan',            resp:'CISO',             time:'Dentro de la primera hora' },
  { event:'Actualización de estatus',       resp:'Equipo técnico',   time:'Cada 2 horas' },
  { event:'Recuperación del servicio',      resp:'Responsable técnico', time:'Al concluir la recuperación' },
  { event:'Informe post-incidente',         resp:'CISO',             time:'Dentro de las siguientes 24 h' },
];

const MAINT: MaintCard[] = [
  { freq:'Semestral',    label:'Simulacros de recuperación.' },
  { freq:'Trimestral',   label:'Pruebas de restauración de respaldos.' },
  { freq:'Anual',        label:'Revisión integral del plan.' },
  { freq:'Ante cambios', label:'Actualización ante cambios significativos en la infraestructura o procesos.' },
];

const CHIPS = [
  'Escáneres de vulnerabilidades',
  'Servidores y máquinas virtuales',
  'Dispositivos de red',
  'Infraestructura cloud',
  'Base de datos de hallazgos',
  'Repositorios de código',
];

const RESOURCES = [
  'Infraestructura Cloud',
  'Base de Datos de Hallazgos',
  'Personal Analista',
  'Repositorios',
  'Sistema de Tickets',
];

const ROLES = [
  { role:'CISO', resp:'Autorizar la activación del plan y supervisar la recuperación.' },
  { role:'Analista de Ciberseguridad', resp:'Evaluar el incidente y coordinar acciones técnicas.' },
  { role:'Ingeniero de Infraestructura', resp:'Ejecutar la recuperación tecnológica.' },
  { role:'QA / Tester', resp:'Validar la correcta operación posterior a la recuperación.' },
  { role:'Dirección', resp:'Aprobar decisiones extraordinarias y gestionar comunicaciones externas.' },
];

export default function PlanContinuidad() {
  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">11</span> · Continuidad · BCM</div>
          <h1>Plan de <em>continuidad</em></h1>
          <p className="lede">Estrategias, responsabilidades y procedimientos para mantener la operación y recuperar los servicios esenciales de Gestión de Vulnerabilidades de CyberHunters ante incidentes que comprometan su disponibilidad, integridad o confidencialidad.</p>
          <div className="meta">
            <div className="m"><div className="k">Recursos críticos</div><div className="v">05</div></div>
            <div className="m"><div className="k">Escenarios de recuperación</div><div className="v">05</div></div>
            <div className="m"><div className="k">RTO máximo</div><div className="v">8 horas</div></div>
            <div className="m"><div className="k">Propietario</div><div className="v">CISO · BCM</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap">

        {/* ── 11.1 Introducción ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.1</span><h2>Introducción</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1.55fr 1fr', gap:54, alignItems:'start' }}>
              <div className="doc-prose">
                <p>La continuidad de los servicios de ciberseguridad es de gran importancia para garantizar la protección de los activos de información y la reducción de riesgos en las tecnologías de la información. Debido a que las organizaciones dependen cada vez más de plataformas digitales, infraestructuras en la nube y procesos automatizados, una interrupción en los servicios de gestión de vulnerabilidades puede generar afectaciones <strong>operativas, económicas y reputacionales</strong> significativas.</p>
                <p>CyberHunters proporciona servicios especializados de gestión de vulnerabilidades mediante actividades de descubrimiento de activos, análisis de exposiciones, priorización de riesgos y seguimiento de remediaciones. Como resultado del <strong>Análisis de Impacto al Negocio (BIA)</strong>, la identificación de activos críticos y el análisis de riesgos realizados previamente, se determinó la necesidad de establecer un Plan de Continuidad del Negocio que permita mantener la operación y recuperar los servicios esenciales ante incidentes que comprometan su disponibilidad.</p>
                <p className="dim">El presente documento define las estrategias, responsabilidades y procedimientos que deberán seguirse para asegurar la continuidad de los servicios de CyberHunters y minimizar el impacto de eventos que afecten los procesos críticos del negocio.</p>
              </div>
              <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'30px 28px', position:'sticky', top:90 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--acc)', marginBottom:16, display:'flex', alignItems:'center', gap:9 }}>
                  <span style={{ width:18, height:1, background:'var(--acc)' }} />
                  Objetivo
                </div>
                <p style={{ fontSize:15, lineHeight:1.72, color:'#cfd5dd', margin:0 }}>Establecer las estrategias, procedimientos y responsabilidades necesarias para garantizar la continuidad operativa del servicio de Gestión de Vulnerabilidades, permitiendo la recuperación oportuna de los recursos críticos identificados durante el análisis de riesgos y los estudios BIA, reduciendo el impacto de incidentes que comprometan la disponibilidad, integridad o confidencialidad de la información.</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── 11.2 Alcance ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.2</span><h2>Alcance</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div className="doc-prose" style={{ marginBottom:30 }}>
              <p className="dim">El presente plan aplica a los procesos y recursos asociados al servicio de Gestión de Vulnerabilidades de CyberHunters.</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              {/* In scope */}
              <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-0)', padding:'26px 26px 28px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:20 }}>
                  <span style={{ width:30, height:30, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:14, border:'1px solid var(--acc-dim)', background:'var(--acc-soft)', color:'var(--acc)', fontWeight:600 }}>+</span>
                  <span style={{ fontSize:16, fontWeight:600 }}>Dentro del alcance</span>
                </div>
                <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                  {['Descubrimiento de activos tecnológicos.','Escaneo automatizado de vulnerabilidades.','Análisis y priorización de hallazgos.','Remediación de vulnerabilidades.','Seguimiento de niveles de servicio (SLA).','Gestión de la infraestructura tecnológica que soporta el servicio.'].map((item) => (
                    <li key={item} style={{ fontSize:14, lineHeight:1.5, color:'#cfd5dd', padding:'9px 0 9px 20px', position:'relative', borderTop:'1px solid var(--line)' }}>
                      <span style={{ position:'absolute', left:0, color:'var(--acc)', fontWeight:600 }}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Out of scope */}
              <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-1)', padding:'26px 26px 28px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:20 }}>
                  <span style={{ width:30, height:30, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:14, border:'1px solid var(--line-2)', color:'var(--muted-2)' }}>−</span>
                  <span style={{ fontSize:16, fontWeight:600 }}>Fuera del alcance</span>
                </div>
                <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                  {['Procesos administrativos que no intervienen directamente en la operación del servicio.','Procesos financieros ajenos a la operación técnica.','Procesos comerciales que no afectan la prestación del servicio.'].map((item) => (
                    <li key={item} style={{ fontSize:14, lineHeight:1.5, color:'var(--muted)', padding:'9px 0 9px 20px', position:'relative', borderTop:'1px solid var(--line)' }}>
                      <span style={{ position:'absolute', left:0, color:'var(--muted-2)', fontWeight:600 }}>−</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── 11.3 Recursos críticos ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.3</span><h2>Recursos críticos identificados</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div className="doc-prose" style={{ marginBottom:28 }}>
              <p className="dim">Con base en la <strong>matriz CID</strong>, el análisis de vulnerabilidades y la matriz de infraestructura crítica, se identificaron los siguientes recursos prioritarios.</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>
              <table className="doc-tbl">
                <thead>
                  <tr><th>Recurso</th><th className="center">Criticidad</th></tr>
                </thead>
                <tbody>
                  {RESOURCES.map((r) => (
                    <tr key={r}>
                      <td className="em">{r}</td>
                      <td className="center"><span className="doc-badge crit" style={{ fontWeight:700, letterSpacing:'.06em' }}>IV</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:14 }}>Activos de alta criticidad</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
                  {CHIPS.map((ch) => (
                    <span key={ch} style={{ fontFamily:'var(--font-mono)', fontSize:12, padding:'8px 13px', border:'1px solid var(--line-2)', borderRadius:50, color:'#cfd5dd', display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--warn)', flexShrink:0 }} />
                      {ch}
                    </span>
                  ))}
                </div>
                <div className="doc-callout warn" style={{ marginTop:26 }}>
                  <span className="ic">!</span>
                  <p>La criticidad <strong>IV</strong> representa el nivel más alto de la matriz CID: su indisponibilidad compromete directamente la prestación del servicio y el cumplimiento de los SLA.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── 11.4 Estrategias generales ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.4</span><h2>Estrategias generales de continuidad</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div className="doc-prose" style={{ marginBottom:30 }}>
              <p className="dim">CyberHunters implementará las siguientes estrategias para asegurar la continuidad de sus operaciones.</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
              {STRATS.map((s) => (
                <div key={s.code} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'24px 22px', display:'flex', flexDirection:'column' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.06em', marginBottom:13 }}>{s.code}</div>
                  <h3 style={{ fontSize:17, fontWeight:600, margin:'0 0 16px', lineHeight:1.25 }}>{s.title}</h3>
                  <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ fontSize:13, lineHeight:1.5, color:'#cfd5dd', paddingLeft:16, position:'relative', marginBottom:9 }}>
                        <span style={{ position:'absolute', left:0, color:'var(--acc)' }}>›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── 11.5 Escenarios ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.5</span><h2>Escenarios de continuidad y recuperación</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div className="doc-prose" style={{ marginBottom:30 }}>
              <p className="dim">Para cada escenario crítico se define su descripción, el impacto esperado, la estrategia de recuperación, el responsable de ejecutarla y los tiempos objetivo <strong>RTO</strong> (recuperación) y <strong>RPO</strong> (pérdida máxima de datos).</p>
            </div>
          </Reveal>

          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            {SCENARIOS.map((sc) => (
              <Reveal key={sc.code}>
                <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-1)', overflow:'hidden' }}>
                  {/* Header */}
                  <div style={{ display:'flex', alignItems:'center', gap:16, padding:'20px 26px', background:'var(--bg-0)', borderBottom:'1px solid var(--line)', flexWrap:'wrap' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.1em', border:'1px solid var(--acc-dim)', padding:'6px 12px', borderRadius:50, flexShrink:0 }}>{sc.code}</span>
                    <h3 style={{ fontSize:19, fontWeight:600, margin:0, lineHeight:1.2, flex:1, minWidth:240 }}>{sc.title}</h3>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {sc.rto && (
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.04em', padding:'6px 11px', borderRadius:4, display:'flex', alignItems:'center', gap:7, border:'1px solid oklch(0.82 0.18 70 / 0.3)', background:'oklch(0.82 0.18 70 / 0.08)', color:'var(--warn)' }}>
                          <strong style={{ fontWeight:600 }}>RTO</strong> {sc.rto}
                        </span>
                      )}
                      {sc.rpo && (
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.04em', padding:'6px 11px', borderRadius:4, display:'flex', alignItems:'center', gap:7, border:'1px solid oklch(0.74 0.13 230 / 0.3)', background:'oklch(0.74 0.13 230 / 0.08)', color:'oklch(0.74 0.13 230)' }}>
                          <strong style={{ fontWeight:600 }}>RPO</strong> {sc.rpo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
                    <div style={{ padding:'24px 26px' }}>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:11, display:'flex', alignItems:'center', gap:9 }}>
                        <span style={{ width:14, height:1, background:'var(--muted-2)' }} />Descripción
                      </div>
                      <p style={{ fontSize:14, lineHeight:1.65, color:'#cfd5dd', margin:'0 0 24px' }}>{sc.desc}</p>

                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:11, display:'flex', alignItems:'center', gap:9 }}>
                        <span style={{ width:14, height:1, background:'var(--muted-2)' }} />Impacto
                      </div>
                      <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                        {sc.impact.map((item) => (
                          <li key={item} style={{ fontSize:13.5, lineHeight:1.5, color:'#cfd5dd', paddingLeft:18, position:'relative', marginBottom:9 }}>
                            <span style={{ position:'absolute', left:0, color:'var(--danger)', fontSize:11, top:2 }}>▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ padding:'24px 26px', borderLeft:'1px solid var(--line)' }}>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:11, display:'flex', alignItems:'center', gap:9 }}>
                        <span style={{ width:14, height:1, background:'var(--muted-2)' }} />Estrategia de recuperación
                      </div>
                      <ol style={{ listStyle:'none', margin:0, padding:0, counterReset:'step' }}>
                        {sc.steps.map((step, i) => (
                          <li key={step} style={{ fontSize:13.5, lineHeight:1.5, color:'#cfd5dd', paddingLeft:26, position:'relative', marginBottom:9 }}>
                            <span style={{ position:'absolute', left:0, color:'var(--acc)', fontFamily:'var(--font-mono)', fontSize:10, top:3 }}>{String(i+1).padStart(2,'0')}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 26px', borderTop:'1px solid var(--line)', background:'var(--bg-0)', flexWrap:'wrap' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)' }}>Responsable</span>
                    <span style={{ fontSize:13.5, color:'var(--text)', fontWeight:500 }}>{sc.responsible}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── 11.6 Roles y responsabilidades ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.6</span><h2>Roles y responsabilidades</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <table className="doc-tbl">
              <thead>
                <tr><th style={{ width:'32%' }}>Rol</th><th>Responsabilidad</th></tr>
              </thead>
              <tbody>
                {ROLES.map((r) => (
                  <tr key={r.role}>
                    <td className="em">{r.role}</td>
                    <td>{r.resp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        {/* ── 11.7 Plan de comunicación ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.7</span><h2>Plan de comunicación</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <table className="doc-tbl">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th style={{ width:'26%' }}>Responsable</th>
                  <th style={{ width:'30%' }}>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {COMM.map((row) => (
                  <tr key={row.event}>
                    <td className="em">{row.event}</td>
                    <td>{row.resp}</td>
                    <td><span className="mono">{row.time}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        {/* ── 11.8 Pruebas y mantenimiento ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.8</span><h2>Pruebas y mantenimiento del plan</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div className="doc-prose" style={{ marginBottom:28 }}>
              <p className="dim">Para asegurar la efectividad del presente plan se realizarán las siguientes actividades.</p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
              {MAINT.map((m) => (
                <div key={m.freq} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'24px 22px' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.08em', border:'1px solid var(--acc-dim)', background:'var(--acc-soft)', padding:'4px 10px', borderRadius:50, display:'inline-block', marginBottom:16 }}>{m.freq}</span>
                  <div style={{ fontSize:15, lineHeight:1.45, color:'#e8ebef', fontWeight:500 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── 11.9 Conclusiones ── */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">11.9</span><h2>Conclusiones</h2><span className="rule" /></div></Reveal>

          <Reveal>
            <div className="doc-prose" style={{ maxWidth:'78ch' }}>
              <p>La implementación del presente Plan de Continuidad del Negocio permite a CyberHunters responder de manera estructurada ante incidentes que afecten sus activos críticos y procesos operativos.</p>
              <p>Mediante la definición de estrategias de recuperación, responsables y tiempos objetivo, la organización <strong>fortalece su resiliencia operativa</strong>, reduce la probabilidad de interrupciones prolongadas y garantiza la continuidad de los servicios de gestión de vulnerabilidades ofrecidos a sus clientes.</p>
            </div>
          </Reveal>
        </div>

      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · PC-11</span>
        <div className="nav">
          <a href="/docs/BO-10">
            <ArrowRight size={12} strokeWidth={1.75} style={{ transform:'scaleX(-1)' }} /> BIA Operacional
          </a>
        </div>
      </div>
    </>
  );
}
