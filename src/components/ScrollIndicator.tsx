import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    <div style={{
      position: 'fixed', right: 24, top: '50%',
      transform: 'translateY(-50%)', zIndex: 40,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {[
        { Icon: ChevronUp, dir: -1, label: 'Up' },
        { Icon: ChevronDown, dir: 1, label: 'Down' },
      ].map(({ Icon, dir, label }) => (
        <button
          key={label}
          aria-label={`Scroll ${label}`}
          onClick={() => window.scrollBy({ top: dir * window.innerHeight, behavior: 'smooth' })}
          style={{
            width: 36, height: 36,
            border: '1.5px solid rgba(0,229,255,0.2)',
            borderRadius: 8, background: 'rgba(0,229,255,0.04)',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'rgba(240,240,255,0.4)', transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,229,255,0.1)';
            e.currentTarget.style.color = '#00E5FF';
            e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,229,255,0.04)';
            e.currentTarget.style.color = 'rgba(240,240,255,0.4)';
            e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)';
          }}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
