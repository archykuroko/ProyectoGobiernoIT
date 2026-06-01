import { Suspense, useEffect } from 'react';
import { Diamond, X } from 'lucide-react';
import type { Document } from '../../data/documents';
import { DOC_REGISTRY } from '../../data/docRegistry';
import { PDF_LINKS } from '../../data/pdfLinks';
import styles from './DocViewer.module.css';

interface DocViewerProps {
  doc: Document | null;
  onClose: () => void;
}

export default function DocViewer({ doc, onClose }: DocViewerProps) {
  const isOpen = doc !== null;
  const pdfUrl = doc ? (PDF_LINKS[doc.id] ?? '') : '';
  const DocPage = doc ? DOC_REGISTRY[doc.id] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
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
            <Diamond size={11} className={styles.headAcc} />
            <span>CH-DOC-{doc?.id ?? '—'}</span>
            <span>/</span>
            <span className={styles.headTitle}>{doc?.title ?? '—'}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarGroup}>
            <span>{doc?.pages ? `${doc.pages} páginas` : '—'}</span>
            <span style={{ color: 'var(--muted-2)' }}>·</span>
            <span>{doc?.author ?? '—'}</span>
          </div>
          <div className={styles.toolbarGroup}>
            {pdfUrl ? (
              <a
                className={styles.toolbarBtn}
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↓ Descargar PDF
              </a>
            ) : (
              <span className={styles.toolbarMuted}>PDF no disponible</span>
            )}
          </div>
        </div>

        <div className={styles.body}>
          {isOpen && DocPage ? (
            <Suspense fallback={
              <div className={styles.loading}>
                <span className={styles.loadingDot} />
                Cargando documento…
              </div>
            }>
              <DocPage />
            </Suspense>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyCode}>{doc?.code ?? '—'}</div>
              <div className={styles.emptyLabel}>Documento no disponible</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
