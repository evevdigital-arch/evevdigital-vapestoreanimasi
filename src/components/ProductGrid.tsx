import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  brand: string;
  name: string;
  type: string;
  category: 'Shop Devices' | 'E-Liquids' | 'Accessories' | 'New Arrivals' | 'Best Sellers';
  price: string;
  image: string;
  accent: string;
}

const PRODUCTS: Product[] = [
  { id: '1', brand: 'VOOPOO', name: 'Argus P1s', type: 'POD SYSTEM', category: 'Shop Devices', price: '$29.99', image: '/images/VOOPOO Argus P1s.webp', accent: '#00E5FF' },
  { id: '2', brand: 'VOOPOO', name: 'Drag X Plus', type: 'BOX MOD', category: 'Best Sellers', price: '$49.99', image: '/images/VOOPOO Drag X Plus.webp', accent: '#38BDF8' },
  { id: '3', brand: 'UWELL', name: 'Caliburn G3', type: 'AIO DEVICE', category: 'New Arrivals', price: '$35.99', image: '/images/UWELL Caliburn G3.webp', accent: '#F472B6' },
  { id: '4', brand: 'VAPORESSO', name: 'Gen 200', type: 'BOX MOD', category: 'Shop Devices', price: '$64.99', image: '/images/VAPORESSO Gen 200 (Ungu).webp', accent: '#A78BFA' },
  { id: '5', brand: 'GEEKVAPE', name: 'Aegis L3', type: 'REGULATED MOD', category: 'New Arrivals', price: '$54.99', image: '/images/GEEKVAPE Aegis L3.webp', accent: '#60A5FA' },
  { id: '6', brand: 'VOOPOO', name: 'Vinci Q', type: 'POD DEVICE', category: 'Best Sellers', price: '$24.99', image: '/images/VOOPOO Vinci Q.webp', accent: '#C084FC' },
  { id: '7', brand: 'NAKED 100', name: 'Lava Flow', type: 'FREEBASE 60ML', category: 'E-Liquids', price: '$19.99', image: '/images/Naked 100 Lava Flow.webp', accent: '#FCA5A5' },
  { id: '8', brand: 'VAMPIRE VAPE', name: 'Heisenberg', type: 'SALT NIC 30ML', category: 'E-Liquids', price: '$15.99', image: '/images/Vampire Vape Heisenberg.webp', accent: '#93C5FD' },
  { id: '9', brand: 'GEEKVAPE', name: 'Zeus RDA', type: 'REBUILDABLE', category: 'Shop Devices', price: '$29.99', image: '/images/GeekVape Zeus RDA.webp', accent: '#FCD34D' },
  { id: '10', brand: 'HELLVAPE', name: 'Dead Rabbit 3', type: 'REBUILDABLE', category: 'New Arrivals', price: '$34.99', image: '/images/Hellvape Dead Rabbit 3.webp', accent: '#EF4444' },
  { id: '11', brand: 'NITECORE', name: 'i2 Charger', type: 'BATTERY CHARGER', category: 'Accessories', price: '$14.99', image: '/images/Nitecore i2 Charger.webp', accent: '#FDE047' },
  { id: '12', brand: 'COTTON BACON', name: 'Prime', type: 'WICKING COTTON', category: 'Accessories', price: '$5.99', image: '/images/Cotton Bacon Prime.webp', accent: '#F3F4F6' },
];

const CATEGORIES = ['All', 'Shop Devices', 'E-Liquids', 'Accessories', 'New Arrivals', 'Best Sellers'];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const handleCategoryEvent = (e: any) => {
      if (CATEGORIES.includes(e.detail)) {
        setActiveCategory(e.detail);
      }
    };
    window.addEventListener('filter-category', handleCategoryEvent);
    return () => window.removeEventListener('filter-category', handleCategoryEvent);
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div id="products-section" style={{ marginTop: 20, paddingTop: 80, scrollMarginTop: 80 }}>
      {/* Category Filter */}
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        marginBottom: 40, 
        overflowX: 'auto',
        paddingBottom: 12,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? '#F0F0FF' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat ? '#07070E' : 'rgba(240,240,255,0.6)',
              border: activeCategory === cat ? '1px solid #F0F0FF' : '1px solid rgba(255,255,255,0.1)',
              padding: '10px 24px',
              borderRadius: 9999,
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px',
        width: '100%' 
      }}>
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.a
              layout
              key={product.id}
              id={product.name.replace(/\s+/g, '-').toLowerCase()}
              href={`#${product.name.replace(/\s+/g, '-').toLowerCase()}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              {/* Glow backdrop */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 150,
                height: 150,
                background: `radial-gradient(circle, ${product.accent}25 0%, transparent 70%)`,
                pointerEvents: 'none',
                zIndex: 0
              }} />

              {/* Product Image */}
              <div style={{ 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 20,
                zIndex: 1
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))'
                  }} 
                />
              </div>

              {/* Product Details */}
              <div style={{ zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ 
                    fontFamily: '"Inter Tight", sans-serif', 
                    fontSize: 10, 
                    fontWeight: 700, 
                    letterSpacing: '1px', 
                    color: product.accent 
                  }}>
                    {product.brand}
                  </span>
                  <span style={{ 
                    fontFamily: '"Inter Tight", sans-serif', 
                    fontSize: 10, 
                    color: 'rgba(255,255,255,0.5)' 
                  }}>
                    {product.type}
                  </span>
                </div>
                <h3 style={{ 
                  fontFamily: '"Inter Tight", sans-serif', 
                  fontSize: 20, 
                  fontWeight: 700, 
                  color: '#F0F0FF',
                  margin: '0 0 16px 0'
                }}>
                  {product.name}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: 'auto' 
                }}>
                  <div style={{ 
                    fontFamily: '"Inter Tight", sans-serif', 
                    fontSize: 18, 
                    fontWeight: 600, 
                    color: '#F0F0FF' 
                  }}>
                    {product.price}
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: product.accent, color: '#000' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <ShoppingCart size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
