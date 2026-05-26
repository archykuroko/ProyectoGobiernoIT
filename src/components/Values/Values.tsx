import styles from './Values.module.css';

const VALUES = [
  {
    num: 'V·01',
    icon: '◈',
    title: 'Integridad',
    description:
      'Actuamos con honestidad técnica. Reportamos lo que encontramos, sin minimizar riesgos ni inflar hallazgos para justificar el servicio.',
  },
  {
    num: 'V·02',
    icon: '◎',
    title: 'Precisión',
    description:
      'Validamos manualmente cada hallazgo crítico. No entregamos reportes generados por automatismos sin contexto ni evidencia.',
  },
  {
    num: 'V·03',
    icon: '⌛',
    title: 'Mejora continua',
    description:
      'Iteramos el servicio cada trimestre. Las amenazas evolucionan; nuestra metodología y herramientas también deben hacerlo.',
  },
  {
    num: 'V·04',
    icon: '⊕',
    title: 'Confidencialidad',
    description:
      'La información de nuestros clientes es sagrada. Operamos bajo controles que garantizan compartimentación y trazabilidad.',
  },
  {
    num: 'V·05',
    icon: '⚡',
    title: 'Velocidad',
    description:
      'Cada hora cuenta. Nuestro servicio mide el tiempo entre detección y remediación, y trabaja activamente para reducirlo.',
  },
  {
    num: 'V·06',
    icon: '⊗',
    title: 'Colaboración',
    description:
      'Trabajamos con los equipos del cliente, no contra ellos. La seguridad efectiva se construye sobre confianza compartida.',
  },
];

export default function Values() {
  return (
    <section className="section" id="val">
      <div className="section-head">
        <div>
          <div className="section-num">06 <span>/ 08</span></div>
          <div className="section-kicker">Principios de operación</div>
        </div>
        <div>
          <h2 className="section-title">Valores</h2>
        </div>
      </div>

      <div className={styles.grid}>
        {VALUES.map((v) => (
          <div className={styles.card} key={v.num}>
            <span className={styles.num}>{v.num}</span>
            <span className={styles.icon} aria-hidden="true">{v.icon}</span>
            <h3 className={styles.title}>{v.title}</h3>
            <p className={styles.description}>{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
