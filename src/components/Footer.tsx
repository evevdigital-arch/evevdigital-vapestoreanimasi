import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Youtube, Mail, X as XIcon } from 'lucide-react';

const XLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const SOCIAL_LINKS = [
  { Icon: Facebook, url: 'https://facebook.com/evevdigital' },
  { Icon: XLogo, url: 'https://x.com/evevdigital' },
  { Icon: Instagram, url: 'https://instagram.com/evevdigital' },
  { Icon: Youtube, url: 'https://youtube.com/@evevdigital' }
];

const SUPPORT_CONTENT: Record<string, { title: string, body: string }> = {
  'Contact Us': {
    title: 'Contact Us',
    body: 'We are here to help! Reach out to our support team at support@evevdigital.com or call us at 1-800-VAPE-NOW.\n\nOur business hours are Monday through Friday, 9:00 AM to 6:00 PM EST.'
  },
  'FAQs': {
    title: 'Frequently Asked Questions',
    body: 'Q: Do you ship internationally?\nA: Yes, we ship worldwide. Shipping costs apply.\n\nQ: How do I track my order?\nA: A tracking link will be sent to your email once the order is dispatched.'
  },
  'Shipping & Returns': {
    title: 'Shipping & Returns',
    body: 'Enjoy free standard shipping on all orders over $50!\n\nIf you are not completely satisfied with your purchase, you can return unopened and unused items within 30 days for a full refund.'
  },
  'Warranty': {
    title: 'Warranty Policy',
    body: 'All our devices come with a 6-month manufacturer warranty covering internal defects.\n\nPlease note that physical damage, water damage, or issues caused by improper use are not covered.'
  },
  'Age Verification': {
    title: 'Age Verification',
    body: 'WARNING: You must be 21 years of age or older to purchase products from evevdigital.\n\nWe use a strict third-party age verification system at checkout to ensure compliance with federal and state laws.'
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    body: 'We respect your privacy. All personal information collected is used solely for order processing and improving our services.\n\nWe strictly protect your data and do not sell your information to third parties.'
  },
  'Terms of Service': {
    title: 'Terms of Service',
    body: 'By accessing or using evevdigital, you agree to be bound by our terms and conditions.\n\nThese terms govern your use of our website and services, including product purchases and liability limitations.'
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <footer style={{
        background: '#040408',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px) clamp(20px, 5vw, 40px)',
        fontFamily: '"Inter Tight", sans-serif',
        color: 'rgba(240,240,255,0.6)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 60,
          marginBottom: 60
        }}>
          {/* Brand Section */}
          <div>
            <h2 style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#F0F0FF',
              letterSpacing: '-1px',
              marginBottom: 20
            }}>evevdigital</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 280 }}>
              Premium vape products and accessories. Elevate your vaping experience with our curated selection of top-tier devices.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {SOCIAL_LINKS.map(({ Icon, url }, i) => (
                <motion.a 
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#00E5FF' }}
                  style={{ color: 'rgba(240,240,255,0.6)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F0FF', marginBottom: 20 }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Shop Devices', 'E-Liquids', 'Accessories', 'New Arrivals', 'Best Sellers'].map(link => (
                <li key={link}>
                  <a 
                    href="#products-section" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('filter-category', { detail: link }));
                      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ color: 'inherit', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} 
                    onMouseOver={(e) => e.currentTarget.style.color = '#00E5FF'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F0FF', marginBottom: 20 }}>Support</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.keys(SUPPORT_CONTENT).map(link => (
                <li key={link}>
                  <button 
                    onClick={() => setActiveModal(link)}
                    style={{ 
                      background: 'none', border: 'none', padding: 0, 
                      cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', 
                      fontSize: 14, transition: 'color 0.2s', textAlign: 'left' 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#00E5FF'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F0FF', marginBottom: 20 }}>Stay Updated</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <div style={{ display: 'flex', position: 'relative' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  color: '#FFF',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  outline: 'none'
                }} 
              />
              <button style={{
                position: 'absolute',
                right: 4,
                top: 4,
                bottom: 4,
                background: '#00E5FF',
                border: 'none',
                borderRadius: 6,
                padding: '0 16px',
                color: '#000',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: 13
        }}>
          <div>&copy; {currentYear} evevdigital. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service'].map(link => (
            <button 
              key={link}
              onClick={() => setActiveModal(link)}
              style={{ 
                background: 'none', border: 'none', padding: 0, 
                cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', 
                fontSize: 13, transition: 'color 0.2s' 
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#00E5FF'}
              onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>
              {link}
            </button>
          ))}
        </div>
        </div>
      </footer>

      {/* Support Modal Popup */}
      <AnimatePresence>
        {activeModal && SUPPORT_CONTENT[activeModal] && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20
          }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)'
              }}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                position: 'relative',
                background: '#07070E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24,
                padding: '40px',
                maxWidth: 500,
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                color: '#F0F0FF'
              }}
            >
              <button 
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'rgba(255,255,255,0.05)', border: 'none',
                  borderRadius: '50%', width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(240,240,255,0.6)', cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#FFF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(240,240,255,0.6)'; }}
              >
                <XIcon size={18} />
              </button>
              
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#00E5FF', fontFamily: '"Inter Tight", sans-serif' }}>
                {SUPPORT_CONTENT[activeModal].title}
              </h2>
              <div style={{ 
                fontSize: 15, lineHeight: 1.7, color: 'rgba(240,240,255,0.8)', 
                whiteSpace: 'pre-wrap', fontFamily: '"Inter Tight", sans-serif' 
              }}>
                {SUPPORT_CONTENT[activeModal].body}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
