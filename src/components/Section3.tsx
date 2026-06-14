import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Truck } from 'lucide-react';
import ProductGrid from './ProductGrid';

const JELLY = {
  scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
  scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
};

export default function Section3() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const memberRef = useRef(null);
  const memberInView = useInView(memberRef, { once: true });

  const words = ['Your', 'next', 'favourite', 'device.'];

  return (
    <section
      data-section="three"
      ref={ref}
      style={{
        background: '#07070E', minHeight: '100vh',
        padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px)', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Text block */}
      <div style={{ maxWidth: 560, marginBottom: 44, position: 'relative', zIndex: 10 }}>
        <motion.div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: '"Inter Tight", sans-serif',
            fontSize: 11, fontWeight: 600, letterSpacing: '2.5px',
            color: '#00E5FF', marginBottom: 20, opacity: 0.7,
          }}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          animate={inView ? { opacity: 0.7, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span style={{ width: 20, height: 1, background: '#00E5FF', display: 'inline-block' }} />
          TRUSTED BY VAPERS
        </motion.div>

        <h2 style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontSize: 'clamp(40px, 8vw, 78px)', fontWeight: 800, lineHeight: 1.0,
          letterSpacing: '-2.5px', color: '#F0F0FF', margin: 0,
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              style={{
                display: 'inline-block', marginRight: '0.2em',
                color: i === 2 ? '#00E5FF' : '#F0F0FF',
              }}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.07 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>



      {/* Feature pills */}
      <motion.div
        style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { Icon: Zap, label: 'Authentic Products', color: '#00E5FF' },
          { Icon: Shield, label: '2-Year Warranty', color: '#A78BFA' },
          { Icon: Truck, label: 'Free Shipping $50+', color: '#34D399' },
        ].map(({ Icon, label, color }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: `${color}0d`, border: `1px solid ${color}22`,
            borderRadius: 9999, padding: '8px 16px',
            fontFamily: '"Inter Tight", sans-serif',
            fontSize: 13, fontWeight: 600, color,
          }}>
            <Icon size={14} />
            {label}
          </div>
        ))}
      </motion.div>

      {/* Product Grid replacing the Premium Banner */}
      <ProductGrid />

    </section>
  );
}
