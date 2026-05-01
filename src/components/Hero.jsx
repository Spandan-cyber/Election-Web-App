import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 50%, #F0FDF4 100%)',
      padding: '6rem 0',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative saffron blob */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,153,51,0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      {/* Decorative green blob */}
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(19,136,8,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge-saffron" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
            🇮🇳 Demystifying the Democratic Process
          </span>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#1A1A2E'
          }}>
            Your Guide to <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF9933 0%, #E8821A 50%, #138808 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Understanding Elections
            </span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#5A5A6A',
            maxWidth: '580px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8
          }}>
            Navigate the complexities of the Indian election cycle with our interactive assistant. Learn how to register, understand key terms, and track the timeline to election day.
          </p>

          <div className="flex justify-center items-center gap-4" style={{ flexWrap: 'wrap' }}>
            <a href="#guide" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Start Learning <ChevronRight size={18} />
            </a>
            <a href="#quiz" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Take the Quiz
            </a>
          </div>
        </motion.div>

        {/* Tricolor divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
            borderRadius: '999px',
            maxWidth: '200px',
            margin: '3rem auto 0',
            border: '1px solid #E8E8E8'
          }}
        />
      </div>
    </section>
  );
}
