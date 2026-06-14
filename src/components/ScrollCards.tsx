import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

// ─── Product data ─────────────────────────────────────────────────────────────
interface VapeProduct {
  brand: string;
  name: string;
  type: string;
  gradient: string;
  accent: string;
  price: string;
  tag: string;
  image: string;
}

const PRODUCTS: VapeProduct[] = [
  { brand: 'VOOPOO', name: 'Argus P1s', type: 'POD SYSTEM', gradient: 'linear-gradient(145deg,#0f0c29 0%,#24243e 55%,#302b63 100%)', accent: '#00E5FF', price: '$29.99', tag: 'BESTSELLER', image: '/images/VOOPOO Argus P1s.webp' },
  { brand: 'VOOPOO', name: 'Drag X Plus', type: 'BOX MOD', gradient: 'linear-gradient(145deg,#000428 0%,#001952 55%,#004e92 100%)', accent: '#38BDF8', price: '$49.99', tag: 'POWERFUL', image: '/images/VOOPOO Drag X Plus.webp' },
  { brand: 'UWELL', name: 'Caliburn G3', type: 'AIO DEVICE', gradient: 'linear-gradient(145deg,#1a0011 0%,#2d001c 55%,#4a0030 100%)', accent: '#F472B6', price: '$35.99', tag: 'COMPACT', image: '/images/UWELL Caliburn G3.webp' },
  { brand: 'VAPORESSO', name: 'Gen 200', type: 'BOX MOD', gradient: 'linear-gradient(145deg,#0a0a0f 0%,#12122a 55%,#1a1a3e 100%)', accent: '#A78BFA', price: '$64.99', tag: 'FLAGSHIP', image: '/images/VAPORESSO Gen 200 (Ungu).webp' },
  { brand: 'GEEKVAPE', name: 'Aegis L3', type: 'REGULATED MOD', gradient: 'linear-gradient(145deg,#001428 0%,#002447 55%,#003666 100%)', accent: '#60A5FA', price: '$54.99', tag: 'WATERPROOF', image: '/images/GEEKVAPE Aegis L3.webp' },
  { brand: 'VOOPOO', name: 'Vinci Q', type: 'POD DEVICE', gradient: 'linear-gradient(145deg,#0a001a 0%,#150030 55%,#220050 100%)', accent: '#C084FC', price: '$24.99', tag: 'PORTABLE', image: '/images/VOOPOO Vinci Q.webp' },
  { brand: 'GEEKVAPE', name: 'Wenax M1', type: 'STARTER KIT', gradient: 'linear-gradient(145deg,#001a14 0%,#00302a 55%,#004038 100%)', accent: '#34D399', price: '$19.99', tag: 'BEGINNER', image: '/images/GEEKVAPE Wenax M1.webp' },
];

// ─── Vape card visual ─────────────────────────────────────────────────────────
function VapeCardFace({ product }: { product: VapeProduct }) {
  const a = product.accent;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: product.gradient,
      borderRadius: 18, padding: '14px 16px',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
      border: `1px solid ${a}22`,
    }}>
      {/* Top: brand + tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '2.5px', color: a, opacity: 0.9 }}>
          {product.brand}
        </span>
        <span style={{
          fontSize: 7, fontWeight: 700, letterSpacing: '1.5px',
          color: a, background: `${a}18`,
          padding: '3px 7px', borderRadius: 4,
          border: `1px solid ${a}33`,
        }}>
          {product.tag}
        </span>
      </div>

      {/* Center: product image */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative', padding: '10px 0' }}>
        {/* Subtle background glow for the image */}
        <div style={{
          position: 'absolute', width: 100, height: 100,
          background: `radial-gradient(circle, ${a}30 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            maxHeight: '120px', maxWidth: '120px',
            objectFit: 'contain', position: 'relative', zIndex: 2,
            filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.5))`
          }} 
        />
      </div>

      {/* Bottom: name + price */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(240,240,255,0.92)', letterSpacing: '-0.4px', marginBottom: 3 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: a }}>
          {product.price}
        </div>
      </div>

      {/* Corner decoration */}
      <div style={{
        position: 'absolute', top: -24, right: -24,
        width: 80, height: 80, borderRadius: '50%',
        border: `1px solid ${a}18`, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -16, left: -16,
        width: 56, height: 56, borderRadius: '50%',
        border: `1px solid ${a}14`, pointerEvents: 'none',
      }} />
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CARD_SIZE = 220;
const CARD_HALF = CARD_SIZE / 2;
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const hoverEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const FAN_SLOTS = [
  { x: -480, y: 18, rotate: -18, scale: 0.88, z: 1 },
  { x: -310, y: 6, rotate: -10, scale: 0.92, z: 2 },
  { x: -155, y: -2, rotate: -4, scale: 0.96, z: 3 },
  { x: 0, y: -8, rotate: 0, scale: 1.0, z: 4 },
  { x: 160, y: -2, rotate: 5, scale: 0.96, z: 3 },
  { x: 320, y: 6, rotate: 12, scale: 0.92, z: 2 },
  { x: 480, y: 18, rotate: 20, scale: 0.88, z: 1 },
] as const;

const CASCADE = Array.from({ length: 7 }, (_, i) => ({
  top: 300 + i * 70,
  left: 20 + i * 150,
  rotate: -3 + i * 3,
  z: 7 - i,
}));

const introDelay = 0.8;
const introDuration = 0.72;
const travelToRightDuration = 0.6;
const sweepLeftDuration = 1.6;
const totalDuration = introDuration + travelToRightDuration + sweepLeftDuration;
const sweepStart = introDelay + introDuration + travelToRightDuration;

// ─── Bezier helpers ───────────────────────────────────────────────────────────
function bezierX(t: number, x1: number, x2: number) {
  return 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
}
function bezierY(t: number, y1: number, y2: number) {
  return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
}
function getTimeForProgress(progress: number, ease: [number, number, number, number]) {
  const [x1, y1, x2, y2] = ease;
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bezierY(mid, y1, y2) < progress) lo = mid; else hi = mid;
  }
  return bezierX((lo + hi) / 2, x1, x2);
}
function getRevealDelay(si: number) {
  const s = FAN_SLOTS[si], s6 = FAN_SLOTS[6], s0 = FAN_SLOTS[0];
  const p = (s.x - s6.x) / (s0.x - s6.x);
  return sweepStart + getTimeForProgress(p, smoothEase) * sweepLeftDuration;
}
function getRevealDuration(si: number) { return si <= 3 ? 0.06 : 0.18; }

// ─── Card component ───────────────────────────────────────────────────────────
interface CardProps {
  slotIndex: number;
  clamped: MotionValue<number>;
  lockProgress: number;
  vp: { w: number; h: number };
  introDone: boolean;
  isLead: boolean;
  revealDelay: number;
  revealDuration: number;
  onIntroDone?: () => void;
}

function Card({ slotIndex, clamped, scrollYProgress, lockProgress, vp, introDone, isLead, revealDelay, revealDuration, onIntroDone, targetRects, scrollableHeight, heroRowY }: CardProps & { targetRects: any[], scrollableHeight: number, scrollYProgress: MotionValue<number>, heroRowY: number }) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const product = PRODUCTS[slotIndex];
  const slot = FAN_SLOTS[slotIndex];
  const cas = CASCADE[slotIndex];

  const isMobile = vp.w < 768;
  const spreadScale = isMobile ? vp.w / 1000 : 1;
  const sizeScale = isMobile ? 0.75 : 1;

  const lp = Math.max(lockProgress, 0.05);
  const p1 = lp * 0.15;
  const p2 = lp * 0.35;
  const p3 = lp * 0.65;
  
  const s1Cx = vp.w / 2 + slot.x * spreadScale;
  const s1Cy = heroRowY + slot.y * spreadScale;
  const stackCx = vp.w / 2, stackCy = vp.h / 2;
  
  const s2Cx = (isMobile ? vp.w * 0.1 : vp.w * 0.4) + cas.left * spreadScale + CARD_HALF;
  const s2Cy = cas.top + CARD_HALF;

  const s3Cx = targetRects && targetRects[slotIndex] ? targetRects[slotIndex].cx : s2Cx;
  const s3Cy = targetRects && targetRects[slotIndex] ? targetRects[slotIndex].cy - lockProgress * scrollableHeight : s2Cy;
  const targetRot = targetRects && targetRects[slotIndex] ? 0 : cas.rotate;
  const targetOpacity = targetRects && targetRects[slotIndex] ? 0 : 1;

  const x = useTransform(clamped, [0, p1, p2, p3, lp], [s1Cx, stackCx, s2Cx, s2Cx, s3Cx]);
  const y = useTransform(clamped, [0, p1, p2, p3, lp], [s1Cy, stackCy, s2Cy, s2Cy, s3Cy]);
  const rotate = useTransform(clamped, [0, p1, p2, p3, lp], [slot.rotate, 0, cas.rotate, cas.rotate, targetRot]);
  const scale = useTransform(clamped, [0, p1, p2, lp], [slot.scale * sizeScale, 1 * sizeScale, 1 * sizeScale, 1 * sizeScale]);
  
  // Opacity fades out AFTER the card has fully landed (after lockProgress)
  const opacity = useTransform(scrollYProgress, [0, lp, lp + 0.03], [1, 1, targetOpacity]);

  const base: any = {
    position: 'absolute', top: 0, left: 0,
    width: CARD_SIZE, height: CARD_SIZE,
    borderRadius: 18, overflow: 'hidden',
    boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 30px ${product.accent}18`,
    zIndex: hovered ? 30 : 7 - slotIndex,
    translateX: '-50%', translateY: '-50%',
    cursor: 'pointer',
    textDecoration: 'none',
    pointerEvents: 'auto',
  };

  const content = <VapeCardFace product={product} />;

  if (introDone) {
    return (
      <motion.div
        style={{ ...base, x, y, rotate, scale, opacity } as any}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: hoverEase } }}
      >
        {content}
      </motion.div>
    );
  }

  if (isLead) {
    const t1 = introDuration / totalDuration;
    const t2 = (introDuration + travelToRightDuration) / totalDuration;
    return (
      <motion.div
        style={base as any}
        initial={{ x: vp.w / 2, y: vp.h / 2 + 180, rotate: 0, scale: 0.3, opacity: 0 }}
        animate={{
          x: [vp.w / 2, vp.w / 2, vp.w / 2 + FAN_SLOTS[6].x * spreadScale, vp.w / 2 + FAN_SLOTS[0].x * spreadScale],
          y: [vp.h / 2 + 180, heroRowY, heroRowY + FAN_SLOTS[6].y * spreadScale, heroRowY + FAN_SLOTS[0].y * spreadScale],
          rotate: [0, 0, FAN_SLOTS[6].rotate, FAN_SLOTS[0].rotate],
          scale: [0.3 * sizeScale, 1 * sizeScale, FAN_SLOTS[6].scale * sizeScale, FAN_SLOTS[0].scale * sizeScale],
          opacity: [0, 1, 1, 1],
        }}
        transition={{ duration: totalDuration, delay: introDelay, times: [0, t1, t2, 1], ease: [smoothEase, smoothEase, smoothEase] }}
        onAnimationComplete={() => onIntroDone?.()}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ ...base, x: s1Cx, y: s1Cy, rotate: slot.rotate, scale: slot.scale * sizeScale, opacity } as any}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: revealed ? 0.25 : revealDuration,
        delay: revealed ? 0 : revealDelay,
        ease: revealed ? hoverEase : 'easeOut',
      }}
      onAnimationComplete={() => setRevealed(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: hoverEase } }}
    >
      {content}
    </motion.div>
  );
}

// ─── ScrollCards ──────────────────────────────────────────────────────────────
interface ScrollCardsProps { containerRef: RefObject<HTMLDivElement>; }

export default function ScrollCards({ containerRef: _ref }: ScrollCardsProps) {
  const [introDone, setIntroDone] = useState(false);
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [lockProgress, setLockProgress] = useState(0.5);
  const [scrollableHeight, setScrollableHeight] = useState(2000);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [heroRowY, setHeroRowY] = useState(() => Math.min(window.innerHeight * 0.5, 380));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrentProgress(v));
  const clamped = useTransform(scrollYProgress, (v) => Math.min(v, lockProgress));

  const [targetRects, setTargetRects] = useState<any[] | null>(null);

  const measure = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      
      const productsSection = document.getElementById('products-section');
      if (!productsSection) return;
      
      const sectionTop = productsSection.getBoundingClientRect().top + window.scrollY;
      
      // Lock when the products section is reasonably visible
      const newLockProgress = Math.max(0.05, Math.min(0.99, (sectionTop - window.innerHeight * 0.25) / scrollH));
      setLockProgress(newLockProgress);
      setScrollableHeight(scrollH);

      const rects = PRODUCTS.map(p => {
        const id = p.name.replace(/\s+/g, '-').toLowerCase();
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            cx: rect.left + rect.width / 2,
            cy: rect.top + window.scrollY + rect.height / 2,
          };
        }
        return null;
      });
      setTargetRects(rects);

    }, 300);
  }, []);

  useEffect(() => {
    // Immediate measurement for the placeholder to avoid any mobile layout bugs
    const placeholder = document.getElementById('hero-cards-placeholder');
    if (placeholder) {
      const rect = placeholder.getBoundingClientRect();
      const idealY = rect.top + window.scrollY + rect.height / 2;
      // Guarantee the cards are NEVER cut off at the bottom of the screen
      const sizeScale = window.innerWidth < 768 ? 0.75 : 1;
      const maxY = window.innerHeight - (CARD_HALF * sizeScale + 30);
      setHeroRowY(Math.min(idealY, maxY));
    }

    measure();
    const onResize = () => { setVp({ w: window.innerWidth, h: window.innerHeight }); measure(); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); if (timerRef.current) clearTimeout(timerRef.current); };
  }, [measure]);

  const isLocked = introDone && currentProgress >= lockProgress;
  const wrapperStyle: React.CSSProperties = isLocked
    ? { position: 'absolute', top: lockProgress * scrollableHeight, left: 0, width: '100%', height: vp.h, zIndex: 5, pointerEvents: 'none' }
    : { position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' };

  return (
    <div style={wrapperStyle}>
      {Array.from({ length: 7 }, (_, i) => (
        <Card
          key={`vape-card-${i}`}
          slotIndex={i}
          clamped={clamped}
          scrollYProgress={scrollYProgress}
          lockProgress={lockProgress}
          vp={vp}
          introDone={introDone}
          isLead={i === 0}
          revealDelay={i === 0 ? 0 : getRevealDelay(i)}
          revealDuration={i === 0 ? 0 : getRevealDuration(i)}
          onIntroDone={i === 0 ? () => setIntroDone(true) : undefined}
          targetRects={targetRects || []}
          scrollableHeight={scrollableHeight}
          heroRowY={heroRowY}
        />
      ))}
    </div>
  );
}
