import { useMemo } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  onDocsClick: () => void;
}

export default function Hero({ onDocsClick }: HeroProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const ticks = useMemo(() => {
    const N = 60;
    return Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * 360;
      const major = i % 5 === 0;
      const len = major ? 10 : 5;
      const opacity = major ? 0.8 : 0.3;
      const rad = (angle * Math.PI) / 180;
      const r = 50; // % radius
      const cx = 50 + r * Math.sin(rad);
      const cy = 50 - r * Math.cos(rad);
      return { angle, len, opacity, cx, cy };
    });
  }, []);

  return (
    <header className={styles.hero} id="top">
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.hudTag}>
          <span className={styles.hudBar} />
          <span>CH·OPS / v.2026.05 ·</span>
          <span className={styles.hudLive}>LIVE</span>
        </div>

        <h1 className={styles.title}>
          Cazamos <em className={styles.accent}>vulnerabilidades</em>,<br />
          <span className={styles.strike}>no parches</span>.
        </h1>

        <p className={styles.tagline}>
          <strong>CyberHunters</strong> es un servicio especializado en{' '}
          <strong>gestión de vulnerabilidades</strong> de extremo a extremo.
          Identificamos, priorizamos y remediamos las debilidades de tu infraestructura
          antes de que se conviertan en una brecha. Detección continua, contexto de negocio
          y métricas que importan a la dirección.
        </p>

        <div className={styles.cta}>
          <button className={styles.btnPrimary} onClick={onDocsClick}>
            VER DOCUMENTACIÓN <span>↗</span>
          </button>
          <button className={styles.btnGhost} onClick={() => scrollTo('intro')}>
            Conocer el servicio
          </button>
        </div>

        <div className={styles.stats}>
          <div>
            <div className={styles.statNum}>11</div>
            <div className={styles.statLabel}>Documentos de gobierno</div>
          </div>
          <div>
            <div className={styles.statNum}>24/7</div>
            <div className={styles.statLabel}>Monitoreo continuo</div>
          </div>
          <div>
            <div className={styles.statNum}>ISO·27001</div>
            <div className={styles.statLabel}>Marco de referencia</div>
          </div>
        </div>
      </div>

      {/* RIGHT — SCOPE */}
      <div className={styles.scopeWrap}>
        <div className={styles.scope}>
          <div className={`${styles.coord} ${styles.tl}`}>
            LAT  19.4326°N<br /><span className={styles.coordVal}>TARGET LOCK</span>
          </div>
          <div className={`${styles.coord} ${styles.tr}`}>
            LON 099.1332°W<br /><span className={styles.coordVal}>ACQUIRED</span>
          </div>
          <div className={`${styles.coord} ${styles.bl}`}>
            CVE-2026-0042<br /><span className={styles.coordVal}>SEV: HIGH</span>
          </div>
          <div className={`${styles.coord} ${styles.br}`}>
            RTT 12.4ms<br /><span className={styles.coordVal}>CH-NODE-07</span>
          </div>

          <div className={styles.scopeRing} />
          <div className={`${styles.scopeRing} ${styles.r2}`} />
          <div className={`${styles.scopeRing} ${styles.r3}`} />
          <div className={`${styles.scopeRing} ${styles.r4}`} />
          <div className={styles.scopeCross} />

          {/* SVG ticks around the ring */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            viewBox="0 0 100 100"
          >
            {ticks.map(({ angle, len, opacity, cx, cy }, i) => {
              const rad = (angle * Math.PI) / 180;
              const inR = 50 - len * 0.09;
              const x1 = 50 + inR * Math.sin(rad);
              const y1 = 50 - inR * Math.cos(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={cx}
                  y2={cy}
                  stroke="white"
                  strokeWidth="0.3"
                  opacity={opacity}
                />
              );
            })}
          </svg>

          <div className={styles.scanLine} />

          <div className={styles.scopeTarget}>
            {/* Replace with <img src="/assets/logo.png" className={styles.scopeTargetLogo} /> when logo is available */}
            <div className={styles.scopeTargetPlaceholder}>CH</div>
          </div>

          <div className={styles.readout}>
            <span className={styles.readoutDot} />
            SCANNING · NMAP-LIKE PROBE · 487 ports / 12 hosts
          </div>
        </div>
      </div>
    </header>
  );
}
