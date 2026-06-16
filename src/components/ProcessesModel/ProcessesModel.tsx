import { ArrowRight } from 'lucide-react';

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
    id: 'VM-PROC1',
    title: 'Identificación y escaneo de activos',
    input: 'Inventario de activos tecnológicos, repositorios de código y archivos de configuración de infraestructura',
    output: 'Listado crudo de vulnerabilidades y activos con visibilidad de su estado de exposición',
  },
  {
    id: 'VM-PROC2',
    title: 'Análisis, priorización y direccionamiento automático',
    input: 'Listado de vulnerabilidades detectadas y valor de priorización de vulnerabilidades (VPR)',
    output: 'Reportes con la clasificación y priorización de amenazas y tickets direccionados a los responsables',
  },
  {
    id: 'VM-PROC3',
    title: 'Remediación y seguimiento de SLA',
    input: 'Tickets de incidencia priorizados y políticas de SLA ya acordadas',
    output: 'Sistemas actualizados con los parches necesarios y reporte de cumplimiento de SLAs',
  },
];

export default function ProcessesModel() {
  return (
    <section className="section" id="proc-model" style={{ paddingBottom: 96 }}>
      <div className="section-head">
        <div>
          <div className="section-num">07 <span>/ 08</span></div>
          <div className="section-kicker">SIPOC · Suppliers · Inputs · Process · Outputs · Customers</div>
        </div>
        <div>
          <h2 className="section-title">Modelo de procesos <em>nivel 1</em></h2>
        </div>
      </div>

      <p style={{ fontSize:15, lineHeight:1.7, color:'var(--muted)', maxWidth:'64ch', marginBottom:40 }}>
        El modelo SIPOC describe, a alto nivel, los insumos que alimentan cada macroproceso del servicio de gestión de vulnerabilidades y las salidas que generan, junto con los requerimientos del cliente que los guían.
      </p>

      <div style={{ overflowX:'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr 36px 180px 36px 1fr 200px',
          minWidth: 960,
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          background: 'var(--line)',
          gap: 1,
        }}>
          {/* Header row */}
          {(['Requerimientos del cliente','Insumos','','Procesos clave','','Salidas','Clientes'] as string[]).map((label, i) => (
            <div
              key={`h-${i}`}
              style={{
                gridColumn: i + 1,
                gridRow: 1,
                background: (i === 0 || i === 6) ? 'var(--bg-3)' : 'var(--bg-2)',
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--acc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: (i === 2 || i === 4) ? 'center' : undefined,
              }}
            >
              {label}
            </div>
          ))}

          {/* Requirements column */}
          <div style={{ gridColumn: 1, gridRow: '2 / 5', background: 'var(--bg-3)', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {SIPOC_REQS.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--acc)', flexShrink: 0, paddingTop: 1 }}>{(i + 1).toString().padStart(2, '0')}</span>
                <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--muted)' }}>{r}</span>
              </div>
            ))}
          </div>

          {/* Process rows */}
          {SIPOC_DATA.map((sp, i) => [
            <div key={`in-${i}`} style={{ gridColumn: 2, gridRow: i + 2, background: 'var(--bg-0)', padding: '16px 14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 6 }}>Insumo {i + 1}</div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>{sp.input}</p>
            </div>,
            <div key={`arr1-${i}`} style={{ gridColumn: 3, gridRow: i + 2, background: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--acc)' }}>
              <ArrowRight size={14} strokeWidth={2} />
            </div>,
            <div key={`proc-${i}`} style={{ gridColumn: 4, gridRow: i + 2, background: 'var(--acc-soft)', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--acc)', letterSpacing: '.1em', border: '1px solid var(--acc-dim)', padding: '2px 7px', borderRadius: 50, alignSelf: 'flex-start' }}>{sp.id}</span>
              <p style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{sp.title}</p>
            </div>,
            <div key={`arr2-${i}`} style={{ gridColumn: 5, gridRow: i + 2, background: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--acc)' }}>
              <ArrowRight size={14} strokeWidth={2} />
            </div>,
            <div key={`out-${i}`} style={{ gridColumn: 6, gridRow: i + 2, background: 'var(--bg-0)', padding: '16px 14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 6 }}>Salida {i + 1}</div>
              <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>{sp.output}</p>
            </div>,
          ])}

          {/* Clients column */}
          <div style={{ gridColumn: 7, gridRow: '2 / 5', background: 'var(--bg-3)', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {SIPOC_CLIENTS.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--acc)', flexShrink: 0, paddingTop: 1 }}>{(i + 1).toString().padStart(2, '0')}</span>
                <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--muted)' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
