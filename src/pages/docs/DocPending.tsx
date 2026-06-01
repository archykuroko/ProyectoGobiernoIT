import { ScanLine } from 'lucide-react';

export default function DocPending() {
  return (
    <div className="doc-pending">
      <div className="scan">
        <ScanLine size={28} strokeWidth={1.5} />
      </div>
      <div className="ptag">Documento en preparación</div>
      <h2>Contenido en elaboración</h2>
      <p>
        Este documento forma parte del marco de gobierno del servicio y se
        encuentra actualmente en desarrollo. Estará disponible próximamente.
      </p>
      <div className="hint">Estado: PENDING · Última sincronización 2026·05·31</div>
    </div>
  );
}
