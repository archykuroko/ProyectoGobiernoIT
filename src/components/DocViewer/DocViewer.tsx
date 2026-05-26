import { useEffect } from 'react';
import type { Document } from '../../data/documents';
import styles from './DocViewer.module.css';

interface DocViewerProps {
  doc: Document | null;
  onClose: () => void;
}

export default function DocViewer({ doc, onClose }: DocViewerProps) {
  const isOpen = doc !== null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={doc ? `Documento: ${doc.title}` : 'Visor de documentos'}
      >
        <div className={styles.head}>
          <div className={styles.headMeta}>
            <span className={styles.headAcc}>◈</span>
            <span>CH-DOC-{doc?.id ?? '—'}</span>
            <span>/</span>
            <span className={styles.headTitle}>{doc?.title ?? '—'}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarGroup}>
            <span>
              {doc?.pages ? `${doc.pages} páginas` : '—'}
            </span>
            <span style={{ color: 'var(--muted-2)' }}>·</span>
            <span>{doc?.author ?? '—'}</span>
          </div>
          <div className={styles.toolbarGroup}>
            {doc?.pdfUrl && (
              <a
                className={styles.toolbarBtn}
                href={doc.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗ Abrir en nueva pestaña
              </a>
            )}
          </div>
        </div>

        <div className={styles.body}>
          {doc?.pdfUrl ? (
            <iframe
              className={styles.pdfFrame}
              src={doc.pdfUrl}
              title={doc.title}
            />
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyCode}>{doc?.code ?? '—'}</div>
              <div className={styles.emptyLabel}>PDF no disponible aún</div>
              <p>El documento será enlazado próximamente.<br />
                Asigna la URL en <code>src/data/documents.ts</code> → campo <code>pdfUrl</code>.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
