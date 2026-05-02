import { useState } from 'react';
import { motion } from 'framer-motion';

const terms = [
  { term: "EVM", definition: "Electronic Voting Machine — a device used in Indian elections to record votes electronically, replacing paper ballots since 1998 to reduce fraud and errors." },
  { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail — a device attached to EVMs that prints a paper slip showing the candidate voted for, allowing voters to verify their vote." },
  { term: "Lok Sabha", definition: "The lower house of India's Parliament (House of the People). Its 543 members are directly elected by citizens for 5-year terms in a General Election." },
  { term: "Rajya Sabha", definition: "The upper house of India's Parliament (Council of States). Members are elected by state legislative assemblies, not directly by the public." },
  { term: "Model Code of Conduct", definition: "A set of guidelines issued by the Election Commission of India to regulate political parties and candidates during elections to ensure free and fair polls." },
  { term: "NOTA", definition: "None of the Above — an option on the EVM ballot that allows voters to reject all candidates contesting from a constituency, introduced in 2013." }
];

const cardColors = [
  { front: '#FF9933', frontBg: '#FFF3E6', back: '#FFFFFF' },
  { front: '#138808', frontBg: '#E8F5E9', back: '#FFFFFF' },
  { front: '#000080', frontBg: '#E8EAF6', back: '#FFFFFF' },
  { front: '#FF9933', frontBg: '#FFF3E6', back: '#FFFFFF' },
  { front: '#138808', frontBg: '#E8F5E9', back: '#FFFFFF' },
  { front: '#000080', frontBg: '#E8EAF6', back: '#FFFFFF' },
];

export default function Flashcards() {
  return (
    <section id="terms" className="section-padding" style={{ background: '#FAFAFA' }}>
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>Key Terms</span>
          <h2 className="section-heading">Election Terminology</h2>
          <p className="section-subheading">
            Click on a card to reveal the definition of key Indian election terms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
          {terms.map((item, index) => (
            <Flashcard
              key={index}
              term={item.term}
              definition={item.definition}
              colors={cardColors[index % cardColors.length]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Flashcard({ term, definition, colors, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
      style={{ height: '220px', perspective: '1000px', cursor: 'pointer' }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard for ${term}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 260, damping: 22 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          background: colors.frontBg,
          borderRadius: '1.25rem',
          border: `2px solid ${colors.front}33`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)'
        }}>
          <div style={{
            width: '48px', height: '4px', borderRadius: '999px',
            background: `linear-gradient(90deg, ${colors.front}, transparent)`,
            marginBottom: '1rem'
          }} />
          <h3 style={{ fontSize: '1.4rem', color: colors.front, fontWeight: 800, margin: 0 }}>{term}</h3>
          <span style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#7A7A8A', fontWeight: 500 }}>
            Tap to flip ↻
          </span>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: colors.back,
          borderRadius: '1.25rem',
          border: `2px solid ${colors.front}33`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '1.5rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)'
        }}>
          <h4 style={{ color: colors.front, marginBottom: '0.6rem', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{term}</h4>
          <p style={{ color: '#3D3D3D', fontSize: '0.88rem', lineHeight: 1.65 }}>{definition}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
