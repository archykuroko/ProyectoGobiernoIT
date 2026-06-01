import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Download } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Document } from '../../data/documents';
import { PDF_LINKS } from '../../data/pdfLinks';
import styles from './DocLayout.module.css';

interface DocLayoutProps {
  doc: Document;
  children: ReactNode;
}

export default function DocLayout({ doc, children }: DocLayoutProps) {
  const pdfUrl = PDF_LINKS[doc.id] ?? '';

  useEffect(() => {
    const prev = document.title;
    document.title = `${doc.title} · CyberHunters`;
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, [doc.title]);

  return (
    <div className={styles.root}>
      {/* ── Top bar ── */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Link to="/#docs" className={styles.back}>
            <ArrowLeft size={13} strokeWidth={1.75} /> Índice
          </Link>
          <Link to="/" className={styles.brand}>
            <div className={styles.brandLogoPlaceholder}>CH</div>
            <span className={styles.brandName}>
              CYBER<span className={styles.brandDot}>·</span>HUNTERS
            </span>
          </Link>
        </div>
        <div className={styles.topbarRight}>
          <span>DOC <span className={styles.docCode}>{doc.id}</span></span>
          <span className={styles.sep}>·</span>
          <span>{doc.date}</span>
        </div>
      </header>

      {/* ── Disclaimer notice ── */}
      <div className={styles.notice}>
        <div className={styles.noticeInner}>
          <AlertTriangle size={15} strokeWidth={1.75} className={styles.noticeIcon} />
          <p className={styles.noticeText}>
            <strong>Aviso:</strong> Este documento es una adaptación web de su versión original.
            Los contenidos pueden haberse modificado o presentarse de forma parcial con el fin
            de su adaptación al formato web.{' '}
            {pdfUrl
              ? 'Descargue el PDF para consultar el documento completo y verificar la información.'
              : 'El documento original estará disponible próximamente.'}
          </p>
          {pdfUrl && (
            <a
              className={styles.noticeDownload}
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={11} strokeWidth={2} /> Descargar PDF
            </a>
          )}
        </div>
      </div>

      {/* ── Document content ── */}
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
