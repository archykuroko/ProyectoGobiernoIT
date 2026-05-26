import { DOCUMENTS } from '../../data/documents';
import type { Document } from '../../data/documents';
import styles from './Documents.module.css';

interface DocumentsProps {
  onSelect: (doc: Document) => void;
}

export default function Documents({ onSelect }: DocumentsProps) {
  return (
    <section className={`section ${styles.section}`} id="docs">
      <div className="section-head">
        <div>
          <div className="section-num">02 <span>/ 08</span></div>
          <div className="section-kicker">Índice / Repositorio</div>
        </div>
        <div>
          <h2 className="section-title">
            Documentos<br /><em>del programa</em>
          </h2>
          <p className={styles.description}>
            Selecciona un documento para abrirlo en el visor integrado.
            Cada archivo forma parte del marco de gobierno y operación del servicio.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {DOCUMENTS.map((doc, i) => (
          <button
            key={doc.id}
            className={styles.card}
            onClick={() => onSelect(doc)}
            aria-label={`Abrir ${doc.title}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardIndex}>
                {String(i + 1).padStart(2, '0')} · {doc.code}
              </span>
              <span className={styles.arrow}>↗</span>
            </div>
            <span className={styles.cardType}>{doc.type}</span>
            <span className={styles.cardTitle}>{doc.title}</span>
            <div className={styles.cardMeta}>
              <span>{doc.pages} pp.</span>
              <span>{doc.date}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
