import styles from './Introduction.module.css';

const META = [
  { label: 'Autor', value: 'CH Strategy' },
  { label: 'Versión', value: 'v2.4' },
  { label: 'Última rev.', value: '2026·05·12' },
  { label: 'Páginas', value: '07' },
  { label: 'Idioma', value: 'ES-MX' },
  { label: 'Clasificación', value: 'Interno' },
];

export default function Introduction() {
  return (
    <section className="section" id="intro">
      <div className="section-head">
        <div>
          <div className="section-num">03 <span>/ 08</span></div>
          <div className="section-kicker">Marco de referencia</div>
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
            En un panorama digital donde la superficie de ataque crece exponencialmente,
            la gestión de vulnerabilidades dejó de ser una tarea periódica para convertirse
            en una disciplina de negocio. Las organizaciones modernas operan sobre cientos
            de activos interconectados —servidores, contenedores, APIs, dispositivos móviles,
            servicios en la nube— y cada uno de ellos representa un vector potencial. Sin un
            proceso disciplinado, las debilidades se acumulan más rápido de lo que pueden
            remediarse.
          </p>
          <p>
            <strong>CyberHunters</strong> nace como respuesta a esta realidad. Somos una
            organización especializada en construir programas de gestión de vulnerabilidades
            alineados a los objetivos del negocio, con un enfoque que combina automatización,
            inteligencia humana y métricas accionables. No buscamos producir reportes que se
            archivan; buscamos reducir riesgo medible y entregar tiempos de remediación que
            impacten en la postura de seguridad de cada cliente.
          </p>
          <p>
            Nuestro modelo de servicio cubre el ciclo completo: descubrimiento e inventario
            de activos, evaluación continua con herramientas líderes del mercado, validación
            manual por analistas certificados, priorización contextualizada al impacto del
            negocio, acompañamiento en la remediación con los equipos de TI y verificación
            de cierre. Cada etapa se documenta y se mide bajo indicadores que conversan con
            la dirección y con los reguladores.
          </p>
          <p>
            El presente documento sintetiza la propuesta de valor del servicio,
            articulando cómo nuestras metas corporativas se conectan con las metas de TI a
            través de una cascada estratégica explícita. Acompañan al lector el caso de
            negocio, la cédula del servicio, el inventario de activos críticos, la matriz
            de riesgos asociada, los análisis de impacto al negocio en sus dimensiones
            táctica y operacional, y el plan de continuidad que garantiza la operación
            ininterrumpida del servicio.
          </p>
          <p>
            La estrategia se sostiene en tres pilares: <strong>visibilidad</strong> sobre la
            totalidad del entorno, <strong>velocidad</strong> para responder ante la aparición
            de nuevas amenazas y <strong>verificabilidad</strong> de cada acción tomada.
            Estos pilares se traducen en compromisos operativos concretos: SLA por nivel de
            severidad, ventanas de remediación negociadas con las áreas de negocio y reportes
            ejecutivos consumibles por audiencias técnicas y no técnicas.
          </p>
          <p className={styles.dim}>
            En las páginas siguientes detallamos el objetivo del servicio, la descripción
            ampliada de sus componentes, los lineamientos institucionales —misión, visión y
            valores— que rigen nuestra operación, y el acceso al repositorio documental que
            respalda cada decisión arquitectónica y operativa del programa.
          </p>
          <p className={styles.dim}>
            CyberHunters opera bajo principios de mejora continua. Lo que hoy describe este
            documento es la versión vigente del programa; cada trimestre revisamos métricas,
            retroalimentación de clientes y nuevas amenazas para iterar el servicio. La
            seguridad no es un destino, es una práctica disciplinada que evoluciona con cada
            adversario que enfrentamos.
          </p>
        </div>
      </div>
    </section>
  );
}
