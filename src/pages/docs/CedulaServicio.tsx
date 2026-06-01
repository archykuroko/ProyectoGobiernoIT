import { Reveal } from '../../components/DocContent/Reveal';

const ROLES = ['CISO', 'Analista', 'Ing. Infra', 'QA/Tester'];
type RaciVal = 'A' | 'R' | 'C' | 'I' | '-';
const RACI: [string, RaciVal, RaciVal, RaciVal, RaciVal][] = [
  ['Definición de políticas y SLAs','A','R','I','I'],
  ['Configuración y despliegue de escaneadores','A','C','R','-'],
  ['Inventario y descubrimiento de activos','I','A','R','-'],
  ['Desarrollo de scripts (Python)','I','A','R','C'],
  ['Configuración de APIs (Nessus / Jira)','I','A','R','C'],
  ['Análisis y filtrado de falsos positivos','A','R','C','C'],
  ['Monitoreo de cumplimiento de SLAs','A','R','C','C'],
  ['Integración de lógica de riesgo VPR','A','R','C','I'],
  ['Pruebas de estrés y validación','A','C','I','R'],
  ['Despliegue en infraestructura (AWS / Cloud)','A','I','R','I'],
  ['Sincronización de inventario','A','R','C','I'],
  ['Filtrado de falsos positivos','I','R','I','A'],
  ['Asignación automática de tickets','A','R','I','I'],
  ['Aprobación de asunción de riesgos','A','R','I','I'],
  ['Ejecución de remediación (parcheo)','A','C','R','I'],
  ['Generación de reportes ejecutivos','A','R','I','I'],
  ['Seguimiento y escalamiento','A','R','C','I'],
  ['Validación de solución y cierre','A','C','I','R'],
];


function RaciCell({ v }: { v: RaciVal }) {
  if (v === '-') return <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)' }}>·</span>;
  const colors: Record<RaciVal, { bg: string; color: string; border?: string }> = {
    A: { bg:'var(--acc)', color:'#000' },
    R: { bg:'oklch(0.78 0.13 230)', color:'#001018' },
    C: { bg:'transparent', color:'var(--warn)', border:'1px solid var(--warn)' },
    I: { bg:'transparent', color:'var(--muted)', border:'1px solid var(--line-2)' },
    '-': { bg:'transparent', color:'var(--muted-2)' },
  };
  const s = colors[v];
  return (
    <div style={{ width:32, height:32, borderRadius:7, display:'inline-flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontWeight:600, fontSize:14, background:s.bg, color:s.color, border:s.border, margin:'auto' }}>
      {v}
    </div>
  );
}

const SLA_ITEMS = [
  ['Disponibilidad', 'Garantizar el servicio de monitoreo y gestión las 24 horas del día durante todo el año.'],
  ['Soporte remoto y presencial', 'Soporte remoto para incidentes y atención presencial programada cuando se requiera intervención directa.'],
  ['Confidencialidad', 'Proteger la información obtenida durante escaneos mediante controles de acceso y cifrado seguro.'],
  ['Seguridad', 'Mantener autenticación segura, monitoreo continuo y actualización periódica de herramientas y plataformas.'],
  ['Tiempo de respuesta', 'Atender incidentes críticos en un máximo de 2 horas posteriores a su detección o reporte.'],
  ['Gestión de incidentes', 'Registrar, clasificar, priorizar y dar seguimiento a los hallazgos hasta su remediación o aceptación de riesgo.'],
  ['Escalamiento', 'Escalar vulnerabilidades críticas a los responsables cuando representen un riesgo alto para la operación.'],
  ['Generación de reportes', 'Emitir reportes ejecutivos y técnicos periódicos sobre hallazgos, estado de remediación y cumplimiento.'],
  ['Actualización del servicio', 'Mantener actualizadas las firmas, plugins, reglas de detección y herramientas de análisis.'],
  ['Continuidad del servicio', 'Garantizar respaldos y mecanismos de recuperación para mantener la operación ante contingencias.'],
];

const OLA_ROWS: [string, string, string][] = [
  ['APP','Capacidad','Escaneo continuo y simultáneo de toda la infraestructura física, virtual y repositorios del alcance, sin degradación del rendimiento.'],
  ['APP','Disponibilidad','Plataforma y consolas de administración operativas el 99% del tiempo mensual.'],
  ['APP','Seguridad','Clasificación de alertas en menos de 1 hora y actualización de firmas cada 72 horas en activos no críticos.'],
  ['APP','Respaldos','Copias diarias de la base de datos de hallazgos, con RTO no mayor a 4 horas.'],
  ['APP','Mantenimiento','Notificación de ventanas con 7 días de anticipación; intervenciones de máximo 3 horas en horario laboral.'],
  ['APP','Mantenibilidad','Parches y actualizaciones de versión de forma trimestral o ante vulnerabilidades críticas de día cero.'],
  ['APP','Soporte al cliente','Atención inmediata a incidentes críticos con respuesta técnica de máximo 60 minutos.'],
  ['INFRA','Capacidad','Almacenamiento masivo de logs y gestión de hasta 5,000 Cloud Agents simultáneos en tiempo real.'],
  ['INFRA','Disponibilidad','Acceso garantizado a dashboards y reportes durante el horario de operación (9:00 – 18:00).'],
  ['INFRA','Seguridad','Control de acceso basado en roles (RBAC) y auditoría de cambios resuelta en máximo 8 horas hábiles.'],
  ['INFRA','Respaldos','Resguardo de reportes históricos de cumplimiento de SLAs por un periodo mínimo de 12 meses.'],
  ['INFRA','Mantenibilidad','Sincronización automática diaria con bases de datos externas (NVD, CVE) para mantener la detección actualizada.'],
];

export default function CedulaServicio() {
  return (
    <>
      <div className="dochero">
        <div className="inner">
          <div className="eyebrow"><span className="bar" /><span className="num">06</span> · Operación · Service Spec</div>
          <h1>Cédula de <em>servicio</em></h1>
          <p className="lede">La ficha técnica completa del servicio de gestión de vulnerabilidades: alcance, responsables, requisitos, arquitectura de componentes y los niveles de servicio acordados (SLA y OLA).</p>
          <div className="meta">
            <div className="m"><div className="k">Empresa</div><div className="v">CyberHunters S.A. de C.V.</div></div>
            <div className="m"><div className="k">Departamento</div><div className="v">Seguridad de la información</div></div>
            <div className="m"><div className="k">Tipo</div><div className="v">Servicio nuevo</div></div>
            <div className="m"><div className="k">Demanda</div><div className="v">Media</div></div>
          </div>
        </div>
      </div>

      <div className="doc-wrap">

        {/* 6.1 Información general */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.1</span><h2>Información general</h2><span className="rule" /></div></Reveal>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden' }}>
              {[
                ['Nombre del servicio','Gestión de Vulnerabilidades',false,false],
                ['Objetivo del servicio','Integrar de manera eficiente el escaneo de activos, el análisis de código y la revisión de infraestructura física y virtual.',false,false],
                ['Variantes del alcance',['Infraestructura física y de red','Estaciones de trabajo','Entornos virtualizados','Código de aplicaciones'],true,false],
                ['Subservicios ofrecidos',['Visibilidad y descubrimiento de activos','Priorización de riesgos','Gestión operativa de remediación','Integración de seguridad interna y externa'],true,false],
                ['Descripción y alcance','Gestión integral y automatizada del ciclo de vida de las vulnerabilidades. La cobertura se extiende a infraestructura física de red y servidores, estaciones de trabajo, máquinas virtuales, configuraciones de seguridad en la nube y código fuente interno.',false,false],
                ['Usuarios del servicio',['Desarrolladores','Ingenieros de TI','Analistas de ciberseguridad','Liderazgo'],true,false],
              ].map(([k, v, isPills, isFullCol]) => (
                <div key={k as string} style={{ background:'var(--bg-0)', padding:'18px 20px', gridColumn: (isFullCol || k==='Descripción y alcance' || k==='Subservicios ofrecidos' || k==='Variantes del alcance' || k==='Usuarios del servicio') ? '1 / -1' : undefined }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted-2)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:8 }}>{k as string}</div>
                  {isPills ? (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {(v as string[]).map((p) => <span key={p} style={{ fontFamily:'var(--font-mono)', fontSize:12, padding:'5px 10px', border:'1px solid var(--line-2)', borderRadius:50, color:'var(--muted)' }}>{p}</span>)}
                    </div>
                  ) : (
                    <div style={{ fontSize:14, lineHeight:1.6, color:'#d4d9e0' }}>{v as string}</div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 6.2 RACI */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.2</span><h2>Responsables del servicio · Matriz RACI</h2><span className="rule" /></div></Reveal>
          <Reveal style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden', overflowX:'auto' }}>
            <table className="doc-tbl" style={{ minWidth:620 }}>
              <thead>
                <tr>
                  <th style={{ width:'42%', textAlign:'left' }}>Actividad</th>
                  {ROLES.map(r => <th key={r} className="center">{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {RACI.map(([act, ...vals]) => (
                  <tr key={act}>
                    <td style={{ fontSize:13 }}>{act}</td>
                    {vals.map((v, i) => <td key={i} className="center"><RaciCell v={v as RaciVal} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal style={{ display:'flex', flexWrap:'wrap', gap:18, marginTop:18, fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted)' }}>
            {(['A','R','C','I'] as const).map(v => (
              <div key={v} style={{ display:'flex', alignItems:'center', gap:9 }}>
                <RaciCell v={v} />
                {{ A:'Aprobador (Accountable)', R:'Responsable (Responsible)', C:'Consultado', I:'Informado' }[v]}
              </div>
            ))}
          </Reveal>
        </div>

        {/* 6.3 Directorio */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.3</span><h2>Directorio de responsables</h2><span className="rule" /></div></Reveal>
          <Reveal>
            <table className="doc-tbl">
              <thead><tr><th>Rol</th><th>Nombre</th><th>Correo</th><th className="center">Extensión</th><th className="center">Horario</th></tr></thead>
              <tbody>
                {[
                  ['CISO / Security Manager','Juan López','jlopez@cyberhunters.mx','123','9:00 – 18:00'],
                  ['Analista de Ciberseguridad','Ana García','agarcia@cyberhunters.mx','456','9:00 – 18:00'],
                  ['Ing. Infraestructura','Alberto Valencia','avalencia@cyberhunters.mx','789','9:00 – 14:00'],
                  ['QA / Tester de Software','Alejandro Vargas','avargas@cyberhunters.mx','101','10:00 – 21:00'],
                ].map(([rol,n,email,ext,h]) => (
                  <tr key={n}><td className="em">{rol}</td><td>{n}</td><td className="mono">{email}</td><td className="center mono">{ext}</td><td className="center">{h}</td></tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        {/* 6.4 Requisitos */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.4</span><h2>Condiciones y requisitos</h2><span className="rule" /></div></Reveal>
          <Reveal style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--line)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden' }}>
            <div style={{ background:'var(--bg-0)', padding:28 }}>
              <div className="doc-badge ok" style={{ marginBottom:14 }}><span className="dot" />Infraestructura y acceso</div>
              {[['Visibilidad de activos','Contar con inventario o capacidad de escanear continuamente los activos para evitar puntos ciegos.'],['Integración con repositorios','Acceso y permisos de lectura en los repositorios de código fuente.'],['Conectividad para agentes','Capacidad de desplegar Cloud Agents para escalado masivo y reportes en tiempo real.']].map(([k,v]) => (
                <p key={k} style={{ fontSize:13.5, lineHeight:1.65, color:'var(--muted)', margin:'0 0 12px' }}><strong style={{ color:'var(--text)' }}>{k}:</strong> {v}</p>
              ))}
            </div>
            <div style={{ background:'var(--bg-0)', padding:28 }}>
              <div className="doc-badge warn" style={{ marginBottom:14 }}><span className="dot" />Operación y alcance</div>
              {[['Personal especializado','CISO, analistas, ingenieros de infraestructura y QA/testing.'],['Automatización como base','No sustituye las pruebas de penetración manuales para fallos lógicos complejos.'],['Notificación de nuevos activos','Las áreas deben avisar al equipo de seguridad para evitar puntos ciegos.'],['Aceptación de riesgo','Formalizar tanto la corrección técnica como la aceptación de riesgos no mitigables.']].map(([k,v]) => (
                <p key={k} style={{ fontSize:13.5, lineHeight:1.65, color:'var(--muted)', margin:'0 0 12px' }}><strong style={{ color:'var(--text)' }}>{k}:</strong> {v}</p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 6.5 Componentes */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.5</span><h2>Componentes de infraestructura</h2><span className="rule" /></div></Reveal>
          <Reveal style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { step:'CAPA 01', title:'Activos monitoreados', nodes:['Red física','Servidores','Máquinas virtuales','Estaciones de trabajo','Infraestructura cloud'] },
              { step:'CAPA 02', title:'Escaneo automatizado', nodes:['Scanner de red · red + servidores','Scanner de hosts · VMs + estaciones','Scanner cloud · nube'] },
              { step:'CAPA 03', title:'Gestión central', nodes:['Inventario de activos','Motor VPR · priorización','Dashboard ejecutivo','Generación de tickets'] },
            ].map((layer, i) => (
              <div key={layer.step}>
                {i > 0 && <div style={{ display:'flex', justifyContent:'center', color:'var(--acc)', fontSize:18, margin:'0 0 14px' }}>↓</div>}
                <div style={{ border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--bg-2)', padding:'20px 22px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--acc)', letterSpacing:'.12em', border:'1px solid var(--acc-dim)', padding:'4px 9px', borderRadius:50 }}>{layer.step}</span>
                    <h4 style={{ fontSize:16, fontWeight:500, margin:0 }}>{layer.title}</h4>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                    {layer.nodes.map((n) => <div key={n} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'var(--bg-0)', border:'1px solid var(--line)', borderRadius:8, fontSize:13, color:'#d4d9e0' }}>{n}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* 6.6 SLA */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.6</span><h2>Niveles de servicio · SLA</h2><span className="rule" /></div></Reveal>
          <Reveal style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {SLA_ITEMS.map(([title, desc]) => (
              <div key={title} style={{ padding:'18px 20px', border:'1px solid var(--line)', borderTop:'2px solid var(--acc)', borderRadius:'var(--radius)', background:'var(--bg-0)' }}>
                <h4 style={{ fontSize:14, fontWeight:600, margin:'0 0 7px', display:'flex', alignItems:'center', gap:9 }}><span style={{ width:7, height:7, borderRadius:'50%', background:'var(--acc)', display:'inline-block' }} />{title}</h4>
                <p style={{ fontSize:13, lineHeight:1.6, color:'var(--muted)', margin:0 }}>{desc}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* 6.7 OLA */}
        <div className="doc-block">
          <Reveal><div className="doc-sec-h"><span className="idx">6.7</span><h2>Acuerdos operativos · OLA</h2><span className="rule" /></div></Reveal>
          <Reveal>
            <table className="doc-tbl">
              <thead><tr><th>Elemento</th><th>Nivel</th><th>Compromiso</th></tr></thead>
              <tbody>
                {OLA_ROWS.map(([el,niv,comp]) => (
                  <tr key={niv+comp}><td className="mono">{el}</td><td className="em">{niv}</td><td>{comp}</td></tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

      </div>

      <div className="doc-foot">
        <span>© 2026 CyberHunters · Documento interno · CS-06</span>
        <div className="nav">
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11 }}>← Caso de negocio</span>
          <span style={{ color:'var(--muted-2)', fontFamily:'var(--font-mono)', fontSize:11 }}>Inventario de activos →</span>
        </div>
      </div>
    </>
  );
}
