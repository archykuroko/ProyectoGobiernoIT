import { useState, useCallback } from 'react';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Documents from './components/Documents/Documents';
import Introduction from './components/Introduction/Introduction';
import Objective from './components/Objective/Objective';
import MissionVision from './components/MissionVision/MissionVision';
import Values from './components/Values/Values';
import Footer from './components/Footer/Footer';
import DocViewer from './components/DocViewer/DocViewer';
import type { Document } from './data/documents';

function App() {
  const [activeDoc, setActiveDoc] = useState<Document | null>(null);

  const openDoc = useCallback((doc: Document) => setActiveDoc(doc), []);
  const closeDoc = useCallback(() => setActiveDoc(null), []);

  const scrollToDocs = useCallback(() => {
    document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Nav onDocsClick={scrollToDocs} />
      <main>
        <Hero onDocsClick={scrollToDocs} />
        <Documents onSelect={openDoc} />
        <Introduction />
        <Objective />
        <MissionVision />
        <Values />
      </main>
      <Footer />
      <DocViewer doc={activeDoc} onClose={closeDoc} />
    </>
  );
}

export default App;
