

function HexLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        fill="none"
        stroke="#00E5FF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points="16,6 24,11 24,21 16,26 8,21 8,11"
        fill="rgba(0,229,255,0.08)"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <text
        x="16" y="20.5"
        textAnchor="middle"
        fill="#00E5FF"
        fontSize="9"
        fontWeight="800"
        fontFamily="Inter Tight, sans-serif"
        letterSpacing="1"
      >
        EV
      </text>
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '18px clamp(16px, 5vw, 40px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(7,7,14,0.6)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Empty Left Spacer */}
      <div className="mobile-hide-spacer" style={{ flex: 1 }} />

      {/* Center: Absolute Logo + Wordmark */}
      <div className="mobile-logo-left" style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <HexLogo />
        <span style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontSize: 17, color: '#F0F0FF',
        }}>
          <span style={{ fontWeight: 300 }}>evev</span>
          <span style={{ fontWeight: 800 }}>digital</span>
        </span>
      </div>

      {/* Right: CTA */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
        <a 
          href="https://wa.me/000000000000" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            marginLeft: 8,
            background: 'linear-gradient(135deg, #00E5FF, #7C3AED)',
            color: '#07070E', fontSize: 13, fontWeight: 700,
            fontFamily: '"Inter Tight", sans-serif',
            padding: '9px clamp(12px, 3vw, 22px)', borderRadius: 9999, border: 'none', cursor: 'pointer',
            letterSpacing: '0.3px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
