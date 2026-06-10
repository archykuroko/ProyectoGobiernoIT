import styles from './Footer.module.css';

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.brand}>
            <div className={styles.brandLogoPlaceholder}>CH</div>
            <span className={styles.brandName}>CYBERHUNTERS</span>
          </div>
          <p className={styles.desc}>
            Gestión de vulnerabilidades end-to-end. Detección continua, priorización con
            contexto de negocio y remediación asistida por analistas certificados.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Servicio</h4>
          <a onClick={() => scrollTo('obj')} href="#obj">Objetivo</a>
          <a onClick={() => scrollTo('mv')} href="#mv">Misión</a>
          <a onClick={() => scrollTo('val')} href="#val">Valores</a>
        </div>

        <div className={styles.col}>
          <h4>Documentos</h4>
          <a onClick={() => scrollTo('docs')} href="#docs">Estratégicos</a>
          <a onClick={() => scrollTo('docs')} href="#docs">Operativos</a>
          <a onClick={() => scrollTo('docs')} href="#docs">Continuidad</a>
        </div>

        <div className={styles.col}>
          <h4>Contacto</h4>
          <a href="mailto:support@cyberhunters.com">support@cyberhunters.com</a>
          <a href="tel:+525500000000">01 800 CYBERHUNTERS</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 CyberHunters. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
