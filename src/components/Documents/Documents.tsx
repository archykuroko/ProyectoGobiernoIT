import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DOCUMENTS } from '../../data/documents';
import styles from './Documents.module.css';

export default function Documents() {
  return (
    <section className={`section ${styles.section}`} id="docs">
      <div className="section-head">
        <div>
          <div className="section-num">02 <span>/ 08</span></div>
          <div className="section-kicker">Índice</div>
        </div>
        <div>
          <h2 className="section-title">
            Documentos<br /><em>del servicio</em>
          </h2>
          <p className={styles.description}>
            Selecciona un documento para consultarlo en su página dedicada.
            Cada archivo forma parte de la dodcumentación del gobierno de TI de CyberHunters y de sus operaciones.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {DOCUMENTS.map((doc, i) => (
          <Link
            key={doc.id}
            to={`/docs/${doc.id.toLowerCase()}`}
            className={`${styles.card} ${!doc.ready ? styles.cardDimmed : ''}`}
            aria-label={`Ver ${doc.title}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardIndex}>
                {String(i + 1).padStart(2, '0')} · {doc.code}
              </span>
              <span className={styles.arrow}><ArrowUpRight size={14} strokeWidth={1.5} /></span>
            </div>
            <span className={styles.cardType}>{doc.type}</span>
            <span className={styles.cardTitle}>{doc.title}</span>
            <div className={`${styles.cardStatus} ${doc.ready ? styles.statusReady : styles.statusSoon}`}>
              <span className={styles.statusDot} />
              {doc.ready ? 'Disponible' : 'En preparación'}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
