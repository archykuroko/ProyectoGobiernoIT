import styles from './Introduction.module.css';

const META = [
  { label: 'Autor', value: 'CyberHunters' },
  { label: 'Versión', value: 'v1.0' },
  { label: 'Semestre', value: '2026-2' },
  { label: 'UA', value: 'Gobierno de TI' },
  { label: 'Idioma', value: 'Español' },
  { label: 'Clasificación', value: 'Público' },
];

export default function Introduction() {
  return (
    <section className="section" id="intro">
      <div className="section-head">
        <div>
          <div className="section-num">03 <span>/ 08</span></div>
          <div className="section-kicker">Acerca de</div>
        </div>
        <div>
          <h2 className="section-title">Introducción</h2>
        </div>
      </div>

      <div className={styles.body}>
        <aside className={styles.side}>
          {META.map(({ label, value }) => (
            <div className={styles.sideRow} key={label}>
              <span>{label}</span>
              <span className={styles.sideVal}>{value}</span>
            </div>
          ))}
        </aside>

        <div className={styles.text}>
          <p>
            En un panorama digital donde la superficie de ataque crece de forma acelerada,
            la gestión de vulnerabilidades se volvió en una necesidad crítica. 
            Las organizaciones modernas operan sobre cientos
            de activos interconectados: servidores, contenedores, APIs, dispositivos móviles,
            servicios en la nube. Cada uno de ellos representa un vector potencial. Sin un
            proceso bien definido, las vulnerabilidades se acumulan más rápido de lo que pueden
            remediarse.
          </p>
          <p>
            <strong>CyberHunters</strong> fue fundada como respuesta a esta realidad. Somos una
            organización especializada en construir servicios de gestión de vulnerabilidades
            alineados a los objetivos del negocio, con un enfoque que combina automatización,
            inteligencia humana y métricas accionables. No buscamos producir reportes sin valor
            para el negocio; buscamos reducir riesgo medible y entregar tiempos de remediación 
            alineados con la seguridad de cada cliente.
          </p>
          <p>
            Nuestro servicio cubre el ciclo completo: descubrimiento e inventario
            de activos, evaluación continua con herramientas líderes del mercado, validación
            manual por analistas certificados, priorización contextualizada al impacto del
            negocio, acompañamiento en la remediación con los equipos de TI y verificación
            de cierre. Cada etapa se documenta y se mide bajo indicadores que conversan con
            la dirección y con los reguladores.
          </p>
          <p>
            El presente trabajo sintetiza la propuesta de valor del servicio,
            mostrando cómo nuestras metas corporativas se conectan con las metas de TI a
            través de una cascada estratégica explícita. Acompañan a potenciales clientes el caso de
            negocio, la cédula del servicio, el inventario de activos críticos, la matriz
            de riesgos asociada, los análisis de impacto al negocio en sus dimensiones
            táctica y operacional, y el plan de continuidad que garantiza la operación
            ininterrumpida del servicio.
          </p>
          <p>
            La estrategia se sostiene en tres pilares: visibilidad sobre la
            totalidad del entorno, velocidad para responder ante la aparición
            de nuevas amenazas y verificabilidad de cada acción tomada.
            Estos pilares se traducen en compromisos operativos concretos: SLA por nivel de
            severidad, ventanas de remediación negociadas con las áreas de negocio y reportes
            ejecutivos consumibles por audiencias técnicas y no técnicas.
          </p>
          <p className={styles.dim}>
            En las páginas siguientes detallamos el objetivo del servicio, la descripción
            ampliada de sus componentes, la misión, visión y
            valores de la empresa que rigen nuestra operación, y el acceso al repositorio documental 
            que justifica cada decisión del servicio.
          </p>
        </div>
      </div>
    </section>
  );
}
