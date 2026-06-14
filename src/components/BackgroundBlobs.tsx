export default function BackgroundBlobs() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* Cyan blob — top left */}
      <div style={{
        position: 'absolute', top: '5%', left: '6%',
        width: 340, height: 340,
        background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      {/* Purple blob — top right */}
      <div style={{
        position: 'absolute', top: '6%', right: '8%',
        width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        filter: 'blur(45px)',
      }} />
      {/* Pink center blob */}
      <div style={{
        position: 'absolute', top: '28%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 420,
        background: 'radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }} />
      {/* Cyan bottom blob */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '12%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
        filter: 'blur(55px)',
      }} />
    </div>
  );
}
