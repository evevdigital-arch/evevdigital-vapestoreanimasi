import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Section2() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const tagsRef = useRef(null);
  const tagsInView = useInView(tagsRef, { once: true, amount: 0.9 });

  const lines: Array<{ text: string; color: string }> = [
    { text: 'Top-tier mods,', color: '#F0F0FF' },
    { text: 'handpicked for', color: '#00E5FF' },
    { text: 'enthusiasts.', color: '#F0F0FF' },
  ];
  let wi = 0;

  return (
    <section
      data-section="two"
      ref={ref}
      style={{
        background: '#07070E',
        minHeight: 'calc(100vh - 30px)',
        padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px) 0',
        display: 'flex', alignItems: 'flex-start',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div ref={tagsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Left column */}
      <div style={{ width: '100%', maxWidth: 520, paddingTop: 32, position: 'relative', zIndex: 10 }}>
        {/* Eyebrow */}
        <motion.div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: '"Inter Tight", sans-serif',
            fontSize: 'clamp(10px, 2vw, 11px)', fontWeight: 600, letterSpacing: '2.5px',
            color: '#00E5FF', marginBottom: 20, opacity: 0.7,
            textTransform: 'uppercase'
          }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
          animate={inView ? { opacity: 0.7, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={{ width: 20, height: 1, background: '#00E5FF', display: 'inline-block' }} />
          FEATURED DEVICES
        </motion.div>

        {/* Headline */}
        <h2 style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800,
          lineHeight: 1.05, letterSpacing: '-1.5px', margin: 0,
        }}>
          {lines.map((line, li) => (
            <div key={li}>
              {line.text.split(' ').map((word) => {
                const idx = wi++;
                return (
                  <motion.span
                    key={idx}
                    style={{ display: 'inline-block', marginRight: '0.25em', color: line.color }}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                    animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.07 }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </h2>

        {/* Body */}
        <motion.p
          style={{
            fontFamily: '"Inter Tight", sans-serif',
            marginTop: 28, fontSize: 'clamp(14px, 3vw, 15px)', fontWeight: 400,
            color: 'rgba(240,240,255,0.4)', lineHeight: 1.7, maxWidth: 340,
          }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          From regulated box mods to ultra-portable pod systems — every device is
          curated for performance, design, and reliability. Only the best make it here.
        </motion.p>

        {/* Stats row */}
        <motion.div
          style={{ display: 'flex', gap: 'clamp(16px, 4vw, 32px)', marginTop: 36, flexWrap: 'wrap' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { n: '200+', label: 'Products' },
            { n: '50+', label: 'Brands' },
            { n: '4.9★', label: 'Rating' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#F0F0FF', letterSpacing: '-1px' }}>{n}</div>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 12, fontWeight: 500, color: 'rgba(240,240,255,0.35)', letterSpacing: '1px', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </motion.div>


      </div>

    </section>
  );
}
