import { useRef } from 'react';
import BackgroundBlobs from './components/BackgroundBlobs';
import Navbar from './components/Navbar';
import ScrollCards from './components/ScrollCards';
import Section1Hero from './components/Section1Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Footer from './components/Footer';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ backgroundColor: '#07070E', position: 'relative' }}>
      <BackgroundBlobs />
      <Navbar />
      <ScrollCards containerRef={containerRef} />
      <Section1Hero />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
}
