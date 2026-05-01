import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E8E8E8',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      {/* Tricolor stripe at top */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
        borderBottom: '1px solid #E8E8E8'
      }} />

      <div className="container flex items-center justify-between" style={{ height: '68px' }}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="ElectIndia Logo"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(255,153,51,0.35)'
            }}
          />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A2E' }}>
            Elect<span style={{ color: '#FF9933' }}>India</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'none' }} className="md:flex gap-8 items-center">
          {[['Guide', '#guide'], ['Timeline', '#timeline'], ['Terms', '#terms'], ['Quiz', '#quiz'], ['News', '#news']].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                fontWeight: 500,
                color: '#3D3D3D',
                fontSize: '0.95rem',
                transition: 'color 0.2s',
                padding: '0.25rem 0',
                borderBottom: '2px solid transparent'
              }}
              onMouseEnter={e => { e.target.style.color = '#FF9933'; e.target.style.borderBottomColor = '#FF9933'; }}
              onMouseLeave={e => { e.target.style.color = '#3D3D3D'; e.target.style.borderBottomColor = 'transparent'; }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#guide" className="btn-primary" style={{ fontSize: '0.875rem' }}>
          Get Started
        </a>
      </div>
    </motion.header>
  );
}
