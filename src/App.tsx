import { Suspense, useCallback } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Documents from './components/Documents/Documents';
import Introduction from './components/Introduction/Introduction';
import Objective from './components/Objective/Objective';
import MissionVision from './components/MissionVision/MissionVision';
import Values from './components/Values/Values';
import Footer from './components/Footer/Footer';
import DocLayout from './pages/docs/DocLayout';
import { DOCUMENTS } from './data/documents';
import { DOC_REGISTRY } from './data/docRegistry';

/* ---- Landing page ---- */
function LandingPage() {
  const scrollToDocs = useCallback(() => {
    document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Nav onDocsClick={scrollToDocs} />
      <main>
        <Hero onDocsClick={scrollToDocs} />
        <Documents />
        <Introduction />
        <Objective />
        <MissionVision />
        <Values />
      </main>
      <Footer />
    </>
  );
}

/* ---- Document page route ---- */
function DocPageRoute() {
  const { docId } = useParams<{ docId: string }>();
  const doc = DOCUMENTS.find((d) => d.id.toLowerCase() === docId?.toLowerCase());

  if (!doc) return <Navigate to="/" replace />;

  const DocPage = DOC_REGISTRY[doc.id];

  return (
    <DocLayout doc={doc}>
      <Suspense fallback={
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'60vh', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted)', gap:12 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--acc)', boxShadow:'0 0 8px var(--acc)', animation:'pulse 1.2s infinite' }} />
          Cargando documento…
        </div>
      }>
        <DocPage />
      </Suspense>
    </DocLayout>
  );
}

/* ---- Router ---- */
export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<LandingPage />} />
      <Route path="/docs/:docId" element={<DocPageRoute />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  );
}
