import styles from './Objective.module.css';

export default function Objective() {
  return (
    <section className="section" id="obj">
      <div className="section-head">
        <div>
          <div className="section-num">04 <span>/ 08</span></div>
          <div className="section-kicker">Propósito y alcance</div>
        </div>
        <div>
          <h2 className="section-title">
            Objetivo<br /><em>y descripción</em>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.cell}>
          <p className={styles.cellLabel}>// OBJETIVO</p>
          <p className={styles.cellBig}>
            Reducir de forma medible la exposición al riesgo cibernético de nuestros clientes
            mediante un servicio gestionado de vulnerabilidades que priorice según impacto
            de negocio.
          </p>
          <p className={styles.cellBody}>
            Buscamos llevar a las organizaciones desde un estado reactivo —donde las
            vulnerabilidades se descubren tras un incidente— hasta un modelo proactivo en
            el que cada hallazgo cuenta con un plan de remediación, un responsable asignado
            y una fecha verificable de cierre.
          </p>
          <div className={styles.chips}>
            <span className={`${styles.chip} ${styles.chipOn}`}>Reducción de MTTR</span>
            <span className={`${styles.chip} ${styles.chipOn}`}>Cobertura 100% activos</span>
            <span className={styles.chip}>SLA por severidad</span>
          </div>
        </div>

        <div className={styles.cell}>
          <p className={styles.cellLabel}>// DESCRIPCIÓN DEL SERVICIO</p>
          <p className={styles.cellBig}>
            Servicio gestionado end-to-end de descubrimiento, evaluación, priorización y
            seguimiento de vulnerabilidades sobre activos tecnológicos.
          </p>
          <p className={styles.cellBody}>
            CyberHunters opera un ciclo continuo de escaneo autenticado y no autenticado,
            validación manual de hallazgos críticos, enriquecimiento con inteligencia de
            amenazas, priorización con base en contexto de negocio y acompañamiento técnico
            durante la remediación.
          </p>
          <div className={styles.chips}>
            <span className={styles.chip}>Escaneo continuo</span>
            <span className={styles.chip}>Validación manual</span>
            <span className={`${styles.chip} ${styles.chipOn}`}>Threat Intel</span>
            <span className={styles.chip}>Remediación asistida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
