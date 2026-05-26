import styles from './MissionVision.module.css';

export default function MissionVision() {
  return (
    <section className={`section ${styles.section}`} id="mv">
      <div className="section-head">
        <div>
          <div className="section-num">05 <span>/ 08</span></div>
          <div className="section-kicker">Identidad institucional</div>
        </div>
        <div>
          <h2 className="section-title">
            Misión <em>&</em> visión
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.mark}>// MISIÓN</div>
          <p className={styles.big}>
            Proteger las operaciones digitales de nuestros clientes{' '}
            <em>identificando, priorizando y remediando</em> las vulnerabilidades
            de su infraestructura antes de que sean explotadas.
          </p>
          <p className={styles.body}>
            Combinamos automatización avanzada, inteligencia de amenazas y experiencia de
            analistas certificados para entregar un servicio medible, transparente y alineado
            a las metas estratégicas de cada organización que confía en nosotros.
          </p>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.card}>
          <div className={styles.mark}>// VISIÓN</div>
          <p className={styles.big}>
            Ser el referente regional en{' '}
            <em>gestión proactiva de vulnerabilidades</em>, reconocidos por elevar
            la madurez ciberseguridad de las organizaciones que confían en nosotros.
          </p>
          <p className={styles.body}>
            Aspiramos a que cada cliente CyberHunters cuente con visibilidad total de su
            superficie de ataque, tiempos de remediación de clase mundial y un programa
            certificable bajo estándares internacionales en un horizonte de tres años.
          </p>
        </div>
      </div>
    </section>
  );
}
