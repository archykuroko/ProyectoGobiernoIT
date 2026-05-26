import styles from './Nav.module.css';

interface NavProps {
  onDocsClick: () => void;
}

export default function Nav({ onDocsClick }: NavProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.nav}>
      <a className={styles.brand} href="#top">
        {/* Replace src with actual logo path when available */}
        <div className={styles.brandLogoPlaceholder}>CH</div>
        <span className={styles.brandName}>
          CYBER<span className={styles.brandDot}>·</span>HUNTERS
        </span>
      </a>

      <div className={styles.links}>
        <a onClick={() => scrollTo('docs')} href="#docs">Documentos</a>
        <a onClick={() => scrollTo('intro')} href="#intro">Introducción</a>
        <a onClick={() => scrollTo('obj')} href="#obj">Objetivo</a>
        <a onClick={() => scrollTo('mv')} href="#mv">Misión</a>
        <a onClick={() => scrollTo('val')} href="#val">Valores</a>
      </div>

      <button className={styles.cta} onClick={onDocsClick}>
        <span className={styles.pulse} />
        SISTEMA OPERATIVO
      </button>
    </nav>
  );
}
