import { Reveal } from '../../components/DocContent/Reveal';

const PROCESSES = [
  {
    id: 'VM-PROC1',
    title: 'Identificación y escaneo de activos',
    desc: ['Descubrimiento: escaneo continuo de la red para mapear infraestructura física, servidores, VMs y nube.','Registro e inventario para evitar puntos ciegos.','Integración directa con repositorios de código.','Ejecución de escaneos periódicos (puertos, software).'],
    crit: ['Descubrimiento e inventario exhaustivo de activos de cómputo.','Integración fluida de los repositorios al ecosistema de escaneo.'],
    succ: ['Visibilidad continua y cobertura amplia.','Automatización temprana de los escaneos.','Repositorios y configuraciones actualizados.'],
  },
  {
    id: 'VM-PROC2',
    title: 'Análisis, priorización y direccionamiento',
    desc: ['Ingesta de los resultados brutos del escaneo.','Filtrado algorítmico de falsos positivos.','Cálculo del valor VPR según el rol del activo.','Análisis de impacto sobre la tríada CIA.','Clasificación por criticidad (motores como TruRisk).','Direccionamiento automático al equipo responsable.'],
    crit: ['Filtrado efectivo de falsos positivos.','Cálculo del VPR y clasificación contextualizada.','Enrutamiento automatizado inmediato.'],
    succ: ['Automatizaciones que depuren alertas irrelevantes.','Priorización basada en criticidad real.','Reportes claros y asignación sin retrasos.'],
  },
  {
    id: 'VM-PROC3',
    title: 'Remediación y seguimiento de SLA',
    desc: ['Recepción de incidencias y asignación preconfigurada.','Activación de SLAs con tiempos límite por ticket.','Ejecución de remediación o asunción formal del riesgo.','Monitoreo y escalamiento automático ante vencimientos.','Validación de cierre del vector de ataque.','Reporte de cumplimiento normativo.'],
    crit: ['Bifurcación correcta entre remediación y asunción de riesgos.','Escalamiento preventivo antes del vencimiento.','Validación rigurosa del cierre.'],
    succ: ['Celeridad y rigor en los SLAs.','Gobernanza sólida del CISO para absorber riesgos.','Evidencia de reducción de la superficie de ataque.'],
  },
];

interface Asset {
  proc: string; id: string; name: string; desc: string;
  crit: boolean; rel: string[]; resp: string;
}

const ASSETS: Asset[] = [
  { proc:'VM-PROC1', id:'CH_VULNS', name:'Escáneres de vulnerabilidades', desc:'Herramientas automatizadas (Tenable, Upwind, GitHub).', crit:true,  rel:['CH_SER','CH_NET','CH_CLD'], resp:'Irmin Hernández Jiménez' },
  { proc:'VM-PROC1', id:'CH_SER',   name:'Servidores y VMs',               desc:'Infraestructura física y virtual monitoreada.',         crit:true,  rel:['CH_NET','CH_VULNS'],          resp:'Cesar A. Mariano Reyes' },
  { proc:'VM-PROC1', id:'CH_NET',   name:'Dispositivos de red',             desc:'Routers, switches y firewalls.',                       crit:true,  rel:['CH_SER','CH_VULNS'],          resp:'Cesar A. Mariano Reyes' },
  { proc:'VM-PROC2', id:'CH_CLD',   name:'Infraestructura cloud',           desc:'Configuraciones y activos en la nube.',                crit:true,  rel:['CH_VULNS'],                   resp:'Cesar A. Mariano Reyes' },
  { proc:'VM-PROC2', id:'CH_DB',    name:'Base de datos de hallazgos',      desc:'Depósito donde se almacenan las alertas.',             crit:true,  rel:['CH_VULNS','CH_TICK'],         resp:'Irmin Hernández Jiménez' },
  { proc:'VM-PROC2', id:'CH_PERS',  name:'Personal analista',               desc:'Analistas encargados del filtrado de datos.',          crit:false, rel:['CH_TICK'],                    resp:'Steven A. Escárcega H.' },
  { proc:'VM-PROC3', id:'CH_CODE',  name:'Repositorios de código',          desc:'Código fuente analizado para remediación.',            crit:true,  rel:['CH_DB','CH_TICK'],            resp:'Irmin Hernández Jiménez' },
  { proc:'VM-PROC3', id:'CH_TICK',  name:'Sistema de tickets',              desc:'Plataforma para el seguimiento de remediación.',       crit:true,  rel:['CH_DB','CH_CODE','CH_VULNS'], resp:'Steven A. Escárcega H.' },
  { proc:'VM-PROC3', id:'CH_MAN',   name:'Manuales de remediación',         desc:'Documentación técnica para parches.',                  crit:false, rel:[],                            resp:'Steven A. Escárcega H.' },
];

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('');
}

const PROCS = ['VM-PROC1', 'VM-PROC2', 'VM-PROC3'];

export default function InventarioActivos() {
  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">07</span> · Operación · Asset Inventory</div>
          <h1>Inventario de <em>activos</em></h1>
          <p className="lede">El catálogo de activos de información que sostienen el servicio, organizados a lo largo de los tres macroprocesos del ciclo de vida de la vulnerabilidad, con su clasificación de criticidad, relaciones y responsables.</p>
          <div className="meta">
            <div className="m"><div className="k">Macroprocesos</div><div className="v">03</div></div>
            <div className="m"><div className="k">Activos catalogados</div><div className="v">09</div></div>
            <div className="m"><div className="k">Activos críticos</div><div className="v">07</div></div>
            <div className="m"><div className="k">Propietario</div><div className="v">Asset Management</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap">

        {/* 7.1 Procesos */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">7.1</span><h2>Relación de procesos</h2><span className="rule" /></div></Reveal>
          <Reveal style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
            {PROCESSES.map((p) => (
              <div key={p.id} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'24px 22px' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.1em', border:'1px solid var(--acc-dim)', padding:'4px 9px', borderRadius:50, display:'inline-block', marginBottom:14 }}>{p.id}</span>
                <h3 style={{ fontSize:18, fontWeight:600, margin:'0 0 14px', lineHeight:1.2 }}>{p.title}</h3>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:8 }}>Descripción</div>
                  <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                    {p.desc.map((d,i) => <li key={i} style={{ fontSize:13, lineHeight:1.5, color:'#cfd5dd', paddingLeft:16, position:'relative', marginBottom:6 }}><span style={{ position:'absolute', left:0, color:'var(--acc)' }}>›</span>{d}</li>)}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:8 }}>Factores de éxito</div>
                  <ul style={{ listStyle:'none', padding:0, margin:0 }}>
                    {p.succ.map((s,i) => <li key={i} style={{ fontSize:13, lineHeight:1.5, color:'#cfd5dd', paddingLeft:16, position:'relative', marginBottom:6 }}><span style={{ position:'absolute', left:0, color:'var(--warn)', fontSize:11 }}>◆</span>{s}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* 7.2 Catálogo */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">7.2</span><h2>Catálogo de activos de información</h2><span className="rule" /></div></Reveal>

          <Reveal style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:24 }}>
            {[['09','Activos totales'],['07','Críticos'],['02','No críticos'],['03','Responsables']].map(([n,k]) => (
              <div key={k} style={{ background:'var(--bg-0)', padding:'22px' }}>
                <div style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:500, letterSpacing:'-.03em', lineHeight:1, color:'var(--acc)', fontFamily:'var(--font-sans)' }}>{n}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', marginTop:8 }}>{k}</div>
              </div>
            ))}
          </Reveal>

          {PROCS.map((proc) => {
            const items = ASSETS.filter((a) => a.proc === proc);
            return (
              <div key={proc}>
                <Reveal style={{ display:'flex', alignItems:'center', gap:14, margin:'28px 0 14px', fontFamily:'var(--font-mono)', fontSize:12 }}>
                  <span style={{ color:'var(--acc)', letterSpacing:'.08em' }}>{proc}</span>
                  <span style={{ flex:1, height:1, background:'var(--line)' }} />
                  <span style={{ color:'var(--muted)' }}>{items.length} activos</span>
                </Reveal>
                <Reveal style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:8 }}>
                  {items.map((a) => (
                    <div key={a.id} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-0)', padding:20, display:'flex', flexDirection:'column', gap:11 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--acc)', fontWeight:600 }}>{a.id}</span>
                        <span className={`doc-badge ${a.crit ? 'crit' : ''}`}><span className="dot" />{a.crit ? 'Crítico' : 'No crítico'}</span>
                      </div>
                      <div style={{ fontSize:15, fontWeight:600, lineHeight:1.25 }}>{a.name}</div>
                      <p style={{ fontSize:13, lineHeight:1.55, color:'var(--muted)', margin:0 }}>{a.desc}</p>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                        {a.rel.length ? a.rel.map(r => <span key={r} style={{ fontFamily:'var(--font-mono)', fontSize:10.5, padding:'3px 8px', border:'1px solid var(--line-2)', borderRadius:4, color:'var(--muted)' }}>→ {r}</span>) : <span style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--muted-2)' }}>sin relación</span>}
                      </div>
                      <div style={{ fontSize:12, color:'var(--muted-2)', fontFamily:'var(--font-mono)', display:'flex', alignItems:'center', gap:7, paddingTop:10, borderTop:'1px solid var(--line)' }}>
                        <span style={{ width:20, height:20, borderRadius:'50%', background:'var(--bg-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'var(--acc)', flexShrink:0 }}>{initials(a.resp)}</span>
                        {a.resp}
                      </div>
                    </div>
                  ))}
                </Reveal>
              </div>
            );
          })}
        </div>

      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · IA-07</span>
        <div className="nav">
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11 }}>← Cédula de servicio</span>
        </div>
      </div>
    </>
  );
}
