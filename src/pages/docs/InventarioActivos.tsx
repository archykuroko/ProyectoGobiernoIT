import { ArrowRight, ExternalLink } from 'lucide-react';
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

const SIPOC_REQS = [
  'Visibilidad continua de los activos',
  'Ejecución de escaneos automatizados',
  'Cobertura amplia de la infraestructura',
  'Priorización inteligente de vulnerabilidades',
  'Asignación automática de los hallazgos',
  'Integración con gestores de incidencias',
  'Seguimiento continuo a los planes de acción',
  'Cumplimiento estricto de los SLA',
  'Formalización de correcciones y documentación de riesgos',
];

const SIPOC_CLIENTS = [
  'Responsable de la seguridad de la información',
  'Analistas de ciberseguridad',
  'Ingenieros de infraestructura',
  'QA / Testers',
  'Desarrolladores',
  'Usuarios finales',
  'Colaboradores',
  'Gerencia',
];

const SIPOC_DATA = [
  {
    id: 'VM-PROC1', title: 'Identificación y escaneo de activos', href: '#swim-VM-PROC1',
    input: 'Inventario de activos tecnológicos, repositorios de código y archivos de configuración de infraestructura',
    output: 'Listado crudo de vulnerabilidades y activos con visibilidad de su estado de exposición',
  },
  {
    id: 'VM-PROC2', title: 'Análisis, priorización y direccionamiento automático', href: '#swim-VM-PROC2',
    input: 'Listado de vulnerabilidades detectadas y valor de priorización de vulnerabilidades (VPR)',
    output: 'Reportes con la clasificación y priorización de amenazas y tickets direccionados a los responsables',
  },
  {
    id: 'VM-PROC3', title: 'Remediación y seguimiento de SLA', href: '#swim-VM-PROC3',
    input: 'Tickets de incidencia priorizados y políticas de SLA ya acordadas',
    output: 'Sistemas actualizados con los parches necesarios y reporte de cumplimiento de SLAs',
  },
];

interface Connection { from: number; to: number; }
interface SLCard { step: number; col: number; tag: 'ok' | 'warn'; flag?: string; title: string; desc: string; }
interface SLLane { name: string; sub: string; alt: boolean; cards: SLCard[]; }
interface SLProc { id: string; title: string; desc: string; cols: number; lanes: SLLane[]; connections: Connection[]; output: string; }

const SWIM_DATA: SLProc[] = [
  {
    id: 'VM-PROC1', title: 'Identificación y escaneo de activos',
    desc: 'Descubrimiento continuo, registro e integración de repositorios de código fuente',
    cols: 7,
    output: 'Listado crudo de vulnerabilidades y activos con estado de exposición visible',
    connections: [
      { from:1, to:2 }, { from:2, to:3 }, { from:3, to:4 },
      { from:4, to:5 }, { from:5, to:6 }, { from:6, to:7 },
    ],
    lanes: [
      { name:'Plataforma de GV / Automatización', sub:'Tenable · Upwind · Escáner', alt:false, cards:[
        { step:1, col:1, tag:'ok', title:'Descubrimiento de activos tecnológicos', desc:'Escaneo continuo de la red: infraestructura física, servidores, VMs, nube y configuraciones cloud.' },
        { step:4, col:4, tag:'ok', title:'Ejecución de escaneos automatizados', desc:'Inspecciones periódicas de configuraciones erróneas, software desactualizado y puertos abiertos.' },
        { step:5, col:5, tag:'ok', title:'Identificación de vectores de entrada', desc:'Detecta debilidades que actúan como vectores de entrada y exponen la tríada CIA.' },
        { step:7, col:7, tag:'ok', flag:'Salida', title:'Traspaso al macroproceso de análisis', desc:'El listado crudo se envía al proceso de análisis para su priorización inteligente.' },
      ]},
      { name:'Analista de Ciberseguridad', sub:'Vulnerability Analyst', alt:true, cards:[
        { step:2, col:2, tag:'ok', title:'Registro e inventario de activos', desc:'Mantiene un registro actualizado de todos los activos tecnológicos para evitar puntos ciegos.' },
        { step:6, col:6, tag:'ok', title:'Consolidación de hallazgos crudos', desc:'Recopila las vulnerabilidades detectadas y los hallazgos de consultoría externa o seguridad ofensiva.' },
      ]},
      { name:'QA / Tester de Software', sub:'Integración de código fuente', alt:false, cards:[
        { step:3, col:3, tag:'ok', title:'Integración de repositorios de código', desc:'Configura los módulos de escaneo para integrar repositorios y revisar fallos de diseño y debilidades lógicas.' },
      ]},
    ],
  },
  {
    id: 'VM-PROC2', title: 'Análisis, priorización y direccionamiento automático',
    desc: 'Filtrado de falsos positivos, cálculo VPR, clasificación y asignación automática',
    cols: 8,
    output: 'Reportes de clasificación y tickets direccionados al equipo de remediación',
    connections: [
      { from:1, to:2 }, { from:2, to:3 }, { from:3, to:4 },
      { from:4, to:5 }, { from:5, to:7 }, { from:7, to:8 }, { from:8, to:9 },
    ],
    lanes: [
      { name:'Plataforma de GV', sub:'TruRisk · Motor de priorización', alt:false, cards:[
        { step:1, col:1, tag:'ok', title:'Ingesta de datos del escaneo', desc:'Recibe los resultados brutos del PROC1: infraestructura, nube y código fuente.' },
        { step:3, col:3, tag:'ok', title:'Cálculo del valor VPR', desc:'Asigna a cada vulnerabilidad un VPR para filtrar los fallos según el rol del activo en la empresa.' },
        { step:9, col:8, tag:'ok', flag:'Salida', title:'Direccionamiento automático de incidencias', desc:'Asigna las tareas al equipo responsable (Infraestructura o QA) según el tipo y SLA preconfigurado.' },
      ]},
      { name:'Analista de Ciberseguridad', sub:'Vulnerability Analyst', alt:true, cards:[
        { step:2, col:2, tag:'ok', title:'Filtrado de falsos positivos', desc:'Aplica algoritmos de limpieza para descartar alertas inexistentes y evitar saturar al equipo.' },
        { step:4, col:4, tag:'ok', title:'Análisis de impacto en el negocio', desc:'Evalúa cómo la explotación afectaría la tríada CIA y la operación del cliente.' },
        { step:5, col:5, tag:'ok', title:'Clasificación por criticidad', desc:'Agrupa las vulnerabilidades por nivel de riesgo y urgencia usando el motor TruRisk.' },
        { step:7, col:6, tag:'ok', title:'Registro de hallazgos de pentesting', desc:'Incorpora vulnerabilidades detectadas por consultoría externa o equipo ofensivo interno.' },
        { step:8, col:7, tag:'ok', title:'Generación de reportes de diagnóstico', desc:'Consolida los resultados en reportes con el puntaje de exposición y las rutas de ataque identificadas.' },
      ]},
    ],
  },
  {
    id: 'VM-PROC3', title: 'Remediación y seguimiento de SLA',
    desc: 'Corrección del vector de ataque o asunción formal del riesgo con evidencia de cumplimiento',
    cols: 6,
    output: 'Sistemas actualizados con parches y reporte de cumplimiento de SLAs',
    connections: [
      { from:1, to:2 }, { from:2, to:3 }, { from:2, to:4 },
      { from:3, to:5 }, { from:4, to:5 }, { from:5, to:6 }, { from:6, to:7 },
    ],
    lanes: [
      { name:'Plataforma de GV', sub:'SLA Timer · Escalamiento automático', alt:false, cards:[
        { step:1, col:1, tag:'ok', title:'Direccionamiento automático', desc:'Recibe vulnerabilidades priorizadas y asigna las incidencias al equipo correspondiente según el tipo.' },
        { step:2, col:2, tag:'ok', title:'Activación de SLAs', desc:'Vincula los SLA a cada ticket, estableciendo los tiempos límite para corregir el fallo.' },
        { step:5, col:4, tag:'ok', title:'Monitoreo y escalamiento', desc:'Supervisa el cumplimiento de tiempos y escala automáticamente si el plazo está por vencerse.' },
      ]},
      { name:'Ingeniero de Infraestructura', sub:'Ruta principal · Remediador técnico', alt:true, cards:[
        { step:3, col:3, tag:'ok', title:'Ejecución de remediación', desc:'Aplica medidas correctivas o actualizaciones de seguridad para eliminar la debilidad identificada.' },
      ]},
      { name:'CISO / Security Manager', sub:'Ruta alterna · Asunción de riesgos', alt:false, cards:[
        { step:4, col:3, tag:'warn', flag:'Ruta alterna', title:'Asunción formal del riesgo', desc:'Documenta y acepta formalmente el riesgo si la remediación no es posible, implementando mitigaciones.' },
      ]},
      { name:'Analista de Ciberseguridad', sub:'Validación y reporte', alt:true, cards:[
        { step:6, col:5, tag:'ok', title:'Validación de cierre', desc:'Verifica que la vulnerabilidad fue mitigada y que el vector de ataque ha sido cerrado efectivamente.' },
        { step:7, col:6, tag:'ok', flag:'Salida', title:'Reporte de cumplimiento', desc:'Genera evidencia documental de adherencia a normativas, estándares y marcos de gobierno de TI.' },
      ]},
    ],
  },
];

const CARD_W = 175, GAP = 16, LABEL_W = 192, ROW_H = 170;

function computeArrows(proc: SLProc): string[] {
  const map = new Map<number, { col: number; row: number }>();
  proc.lanes.forEach((lane, li) => lane.cards.forEach(c => map.set(c.step, { col: c.col, row: li + 1 })));
  const rE = (c: number) => LABEL_W + GAP + (c - 1) * (CARD_W + GAP) + CARD_W;
  const lE = (c: number) => LABEL_W + GAP + (c - 1) * (CARD_W + GAP);
  const yC = (r: number) => (r - 1) * ROW_H + ROW_H / 2;
  return proc.connections.flatMap(({ from, to }) => {
    const s = map.get(from); const t = map.get(to);
    if (!s || !t) return [];
    const x1 = rE(s.col), y1 = yC(s.row), x2 = lE(t.col), y2 = yC(t.row);
    if (s.row === t.row) return [`M ${x1},${y1} L ${x2},${y2}`];
    const mx = (x1 + x2) / 2;
    return [`M ${x1},${y1} C ${mx},${y1} ${mx},${y2} ${x2},${y2}`];
  });
}

function SwimBlock({ proc }: { proc: SLProc }) {
  const totalW = LABEL_W + GAP + proc.cols * (CARD_W + GAP);
  const totalH = proc.lanes.length * ROW_H;
  const arrows = computeArrows(proc);
  return (
    <div id={`swim-${proc.id}`} style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', marginBottom:22 }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 22px', background:'var(--bg-0)', borderBottom:'1px solid var(--line)', flexWrap:'wrap' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.1em', border:'1px solid var(--acc-dim)', padding:'4px 10px', borderRadius:50 }}>{proc.id}</span>
        <div style={{ flex:1, minWidth:200 }}>
          <h3 style={{ fontSize:17, fontWeight:600, margin:0, lineHeight:1.2 }}>{proc.title}</h3>
          <p style={{ fontSize:12, color:'var(--muted)', margin:'3px 0 0' }}>{proc.desc}</p>
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted-2)' }}>{proc.lanes.length} actores · {proc.cols} pasos</span>
      </div>
      <div style={{ overflowX:'auto' }}>
        <div style={{ position:'relative', minWidth:totalW, height:totalH }}>
          {proc.lanes.map((lane, li) => (
            <div key={li} style={{ position:'absolute', top:li*ROW_H, left:0, right:0, height:ROW_H, display:'flex', borderBottom:li < proc.lanes.length-1 ? '1px solid var(--line)' : 'none', background:lane.alt ? 'var(--bg-2)' : 'var(--bg-1)' }}>
              <div style={{ width:LABEL_W, flexShrink:0, display:'flex', flexDirection:'column', gap:5, padding:'12px 16px', background:'var(--bg-3)', borderRight:'1px solid var(--line-2)', justifyContent:'center', zIndex:2 }}>
                <div style={{ width:22, height:22, borderRadius:6, border:'1px solid var(--line-2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--acc)', fontFamily:'var(--font-mono)', fontSize:10, marginBottom:4 }}>{li+1}</div>
                <div style={{ fontSize:12, fontWeight:600, lineHeight:1.25 }}>{lane.name}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted-2)', lineHeight:1.3 }}>{lane.sub}</div>
              </div>
              <div style={{ flex:1, display:'grid', gridTemplateColumns:`repeat(${proc.cols}, ${CARD_W}px)`, gap:GAP, padding:GAP, alignContent:'center' }}>
                {lane.cards.map((card) => (
                  <div key={card.step} style={{ gridColumn:card.col, border:`1px solid ${card.tag==='warn'?'oklch(0.82 0.18 70/0.3)':'var(--line-2)'}`, borderRadius:'var(--radius)', background:card.tag==='warn'?'oklch(0.82 0.18 70/0.05)':'var(--bg-0)', padding:'11px 13px', display:'flex', flexDirection:'column', gap:6 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ width:18, height:18, borderRadius:'50%', background:'var(--acc-soft)', border:'1px solid var(--acc-dim)', color:'var(--acc)', fontFamily:'var(--font-mono)', fontSize:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{card.step}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:8.5, letterSpacing:'.06em', textTransform:'uppercase', padding:'2px 6px', borderRadius:50, border:'1px solid', color:card.tag==='ok'?'var(--acc)':'var(--warn)', borderColor:card.tag==='ok'?'var(--acc-dim)':'oklch(0.82 0.18 70/0.4)', background:card.tag==='ok'?'var(--acc-soft)':'oklch(0.82 0.18 70/0.1)' }}>{card.tag==='ok'?'Proceso':'Decisión'}</span>
                      {card.flag&&<span style={{ marginLeft:'auto', fontFamily:'var(--font-mono)', fontSize:8.5, letterSpacing:'.06em', textTransform:'uppercase', color:card.tag==='warn'?'var(--warn)':'var(--acc)' }}>{card.flag}</span>}
                    </div>
                    <div style={{ fontSize:12, fontWeight:600, lineHeight:1.25 }}>{card.title}</div>
                    <div style={{ fontSize:11, lineHeight:1.5, color:'var(--muted)' }}>{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <svg style={{ position:'absolute', top:0, left:0, width:totalW, height:totalH, pointerEvents:'none', overflow:'visible', zIndex:5 }} viewBox={`0 0 ${totalW} ${totalH}`}>
            <defs>
              <marker id={`arr-${proc.id}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" style={{ fill:'var(--acc)' }} opacity={0.65} />
              </marker>
            </defs>
            {arrows.map((d, i) => (
              <path key={i} d={d} style={{ stroke:'var(--acc)' }} strokeWidth={1.6} fill="none" opacity={0.65} markerEnd={`url(#arr-${proc.id})`} />
            ))}
          </svg>
        </div>
      </div>
      <div style={{ padding:'10px 22px', borderTop:'1px solid var(--line)', background:'linear-gradient(90deg, var(--acc-soft), transparent 55%)', display:'flex', gap:10, alignItems:'center' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--acc)', flexShrink:0 }}>SALIDA</span>
        <ArrowRight size={11} strokeWidth={2} style={{ color:'var(--acc)', flexShrink:0 }} />
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted)' }}>{proc.output}</span>
      </div>
    </div>
  );
}

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

        {/* 7.2 SIPOC */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">7.2</span><h2>Modelo de procesos de nivel 1</h2><span className="rule" /></div></Reveal>
          <Reveal className="doc-prose"><p>El modelo SIPOC (<em>Suppliers-Inputs-Process-Outputs-Customers</em>) describe, a alto nivel, los insumos y clientes de cada macroproceso del servicio. Los procesos enlazados dirigen a los diagramas de actividad por actor en la sección 7.3.</p></Reveal>
          <Reveal>
            <div style={{ overflowX:'auto', marginTop:18 }}>
              <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 36px 180px 36px 1fr 200px', minWidth:960, border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', background:'var(--line)', gap:1 }}>
                {/* Header row */}
                {['Requerimientos del cliente','Insumos','','Procesos clave','','Salidas','Clientes'].map((label, i) => (
                  <div key={`h-${i}`} style={{ gridColumn:i+1, gridRow:1, background:(i===0||i===6) ? 'var(--bg-3)' : 'var(--bg-2)', padding:'11px 14px', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--acc)', display:'flex', alignItems:'center', justifyContent:(i===2||i===4) ? 'center' : undefined }}>
                    {label}
                  </div>
                ))}
                {/* Left rail */}
                <div style={{ gridColumn:1, gridRow:'2 / 5', background:'var(--bg-3)', padding:'16px 14px', display:'flex', flexDirection:'column', gap:9 }}>
                  {SIPOC_REQS.map((r, i) => (
                    <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--acc)', flexShrink:0, paddingTop:1 }}>{(i+1).toString().padStart(2,'0')}</span>
                      <span style={{ fontSize:12, lineHeight:1.45, color:'var(--muted)' }}>{r}</span>
                    </div>
                  ))}
                </div>
                {/* Process rows */}
                {SIPOC_DATA.map((sp, i) => [
                  <div key={`in-${i}`} style={{ gridColumn:2, gridRow:i+2, background:'var(--bg-0)', padding:'16px 14px' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:6 }}>Insumo {i+1}</div>
                    <p style={{ fontSize:12, lineHeight:1.55, color:'var(--muted)', margin:0 }}>{sp.input}</p>
                  </div>,
                  <div key={`arr1-${i}`} style={{ gridColumn:3, gridRow:i+2, background:'var(--bg-0)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--acc)' }}>
                    <ArrowRight size={14} strokeWidth={2} />
                  </div>,
                  <div key={`proc-${i}`} style={{ gridColumn:4, gridRow:i+2, background:'var(--acc-soft)', padding:'14px 12px', display:'flex', flexDirection:'column', gap:8 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--acc)', letterSpacing:'.1em', border:'1px solid var(--acc-dim)', padding:'2px 7px', borderRadius:50, alignSelf:'flex-start' }}>{sp.id}</span>
                    <p style={{ fontSize:12, fontWeight:600, lineHeight:1.3, margin:0 }}>{sp.title}</p>
                    <a href={sp.href} style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--acc)', textDecoration:'none', alignSelf:'flex-start' }}>Ver diagrama →</a>
                  </div>,
                  <div key={`arr2-${i}`} style={{ gridColumn:5, gridRow:i+2, background:'var(--bg-0)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--acc)' }}>
                    <ArrowRight size={14} strokeWidth={2} />
                  </div>,
                  <div key={`out-${i}`} style={{ gridColumn:6, gridRow:i+2, background:'var(--bg-0)', padding:'16px 14px' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:6 }}>Salida {i+1}</div>
                    <p style={{ fontSize:12, lineHeight:1.55, color:'var(--muted)', margin:0 }}>{sp.output}</p>
                  </div>,
                ])}
                {/* Right rail */}
                <div style={{ gridColumn:7, gridRow:'2 / 5', background:'var(--bg-3)', padding:'16px 14px', display:'flex', flexDirection:'column', gap:9 }}>
                  {SIPOC_CLIENTS.map((c, i) => (
                    <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--acc)', flexShrink:0, paddingTop:1 }}>{(i+1).toString().padStart(2,'0')}</span>
                      <span style={{ fontSize:12, lineHeight:1.45, color:'var(--muted)' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 7.3 Diagramas por actor */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">7.3</span><h2>Diagramas de proceso por actor</h2><span className="rule" /></div></Reveal>
          <Reveal className="doc-prose"><p>Cada diagrama muestra el flujo de actividades de un macroproceso organizado por actor (carril). Las tarjetas de <em>Decisión</em> indican bifurcaciones, como la asunción formal del riesgo en VM-PROC3.</p></Reveal>
          <Reveal>
            <div className="doc-callout" style={{ display:'flex', alignItems:'flex-start', gap:12, marginTop:10 }}>
              <ExternalLink size={15} strokeWidth={2} style={{ color:'var(--acc)', flexShrink:0, marginTop:2 }} />
              <p style={{ margin:0, fontSize:13, lineHeight:1.6 }}>
                Para consultar la documentación completa de los procesos —incluyendo políticas, estándares y procedimientos de soporte—, puede acceder al{' '}
                <a href="https://drive.google.com/file/d/1fovMrtjeQ-XXHi2gaY1yC8XeYNBpPmjp/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style={{ color:'var(--acc)', textDecoration:'none', borderBottom:'1px solid var(--acc-dim)' }}>
                  documento oficial de modelo de procesos
                </a>
                {' '}alojado en Google Drive.
              </p>
            </div>
          </Reveal>
          <div style={{ marginTop:18 }}>
            {SWIM_DATA.map((proc) => (
              <Reveal key={proc.id}>
                <SwimBlock proc={proc} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* 7.4 Catálogo */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">7.4</span><h2>Catálogo de activos de información</h2><span className="rule" /></div></Reveal>

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
