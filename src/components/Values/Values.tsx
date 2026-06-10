import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Crosshair, RefreshCw, Lock, Zap, Handshake } from 'lucide-react';
import styles from './Values.module.css';

interface Value {
  num: string;
  Icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    num: 'V·01',
    Icon: ShieldCheck,
    title: 'Integridad',
    description:
      'Actuamos con honestidad técnica. Reportamos lo que encontramos, sin minimizar riesgos ni inflar hallazgos para justificar el servicio.',
  },
  {
    num: 'V·02',
    Icon: Crosshair,
    title: 'Precisión',
    description:
      'Validamos manualmente cada hallazgo crítico. No entregamos reportes generados por automatizaciones sin contexto ni evidencia.',
  },
  {
    num: 'V·03',
    Icon: RefreshCw,
    title: 'Mejora continua',
    description:
      'Iteramos el servicio constantemente. Las amenazas evolucionan; nuestra metodología y herramientas también deben hacerlo.',
  },
  {
    num: 'V·04',
    Icon: Lock,
    title: 'Confidencialidad',
    description:
      'La información de nuestros clientes es sagrada. Operamos bajo controles que garantizan compartimentación y trazabilidad.',
  },
  {
    num: 'V·05',
    Icon: Zap,
    title: 'Velocidad',
    description:
      'Cada hora cuenta. Nuestro servicio mide el tiempo entre detección y remediación, y trabaja activamente para reducirlo.',
  },
  {
    num: 'V·06',
    Icon: Handshake,
    title: 'Colaboración',
    description:
      'Trabajamos con los equipos del cliente, no contra ellos. La seguridad efectiva se construye sobre confianza compartida.',
  },
];

export default function Values() {
  return (
    <section className="section" id="val">
      <div className="section-head">
        <div>
          <div className="section-num">06 <span>/ 08</span></div>
          <div className="section-kicker">Principios de operación</div>
        </div>
        <div>
          <h2 className="section-title">Valores</h2>
        </div>
      </div>

      <div className={styles.grid}>
        {VALUES.map((v) => (
          <div className={styles.card} key={v.num}>
            <span className={styles.num}>{v.num}</span>
            <span className={styles.icon} aria-hidden="true">
              <v.Icon size={18} strokeWidth={1.5} />
            </span>
            <h3 className={styles.title}>{v.title}</h3>
            <p className={styles.description}>{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
