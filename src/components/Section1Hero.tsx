import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/images/hero_vape_1.png',
  '/images/hero_vape_2.png',
  '/images/hero_vape_3.png'
];

function AnimatedWords({ text, startIndex, color = '#F0F0FF' }: { text: string; startIndex: number; color?: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.22em', color }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: (startIndex + i) * 0.08 }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function Section1Hero() {
  const line1 = 'Premium Devices,';
  const l1w = line1.split(' ').length;
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative', zIndex: 1, padding: '0 24px' }}>
      
      {/* Background Slideshow (Behind Text) */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 900,
        height: '60vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Subtle Glow Behind Image */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }} />
        
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={IMAGES[currentIndex]}
            alt={`Premium Vape Device Background ${currentIndex + 1}`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              position: 'absolute',
              zIndex: 1,
              opacity: 0.4, // Reduced opacity so text is readable
              filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.5))' 
            }}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 0.4, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Main Content (Centered Text) */}
      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingTop: 'clamp(100px, 15vw, 148px)',
        position: 'relative',
        zIndex: 10 // Above the background
      }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: '"Inter Tight", sans-serif',
            fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, letterSpacing: '2.5px',
            color: 'rgba(240,240,255,0.35)',
            marginBottom: 28,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 24, height: 1, background: '#00E5FF', opacity: 0.6, display: 'inline-block' }} />
          The Future of Vaping
          <span style={{ width: 24, height: 1, background: '#00E5FF', opacity: 0.6, display: 'inline-block' }} />
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontSize: 'clamp(44px, 8vw, 94px)', fontWeight: 800,
          lineHeight: 1.0, letterSpacing: '-3px',
          maxWidth: 1100, textAlign: 'center', margin: 0,
          textShadow: '0 4px 20px rgba(0,0,0,0.8)' // ensure text stands out against bg
        }}>
          <div><AnimatedWords text={line1} startIndex={0} /></div>
          <div>
            <AnimatedWords text="Elevated" startIndex={l1w} color="#00E5FF" />
            <AnimatedWords text="Experience." startIndex={l1w + 1} />
          </div>
        </h1>

        {/* Dots Indicator (Moved up below the text) */}
        <div style={{
          marginTop: 40,
          display: 'flex',
          gap: 12,
          zIndex: 10
        }}>
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: currentIndex === idx ? '#00E5FF' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Space for ScrollCards to animate into */}
        <div id="hero-cards-placeholder" style={{ width: '100%', height: 260, marginTop: 40, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        </div>

      </main>
    </section>
  );
}
