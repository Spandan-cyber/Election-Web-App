import { motion } from 'framer-motion';
import { ClipboardList, MapPin, Vote, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: "Register to Vote",
    description: "Check if you're registered on the Electoral Roll at voters.eci.gov.in. If not, apply through Form 6 online or at your local BLO office.",
    color: '#FF9933',
    bg: '#FFF7ED',
    border: 'rgba(255,153,51,0.2)'
  },
  {
    icon: MapPin,
    title: "Find Your Polling Booth",
    description: "Use the ECI Voter Portal to find your assigned polling booth. Ensure you carry your Voter ID or any approved alternate ID document.",
    color: '#138808',
    bg: '#F0FDF4',
    border: 'rgba(19,136,8,0.2)'
  },
  {
    icon: Vote,
    title: "Cast Your Vote",
    description: "Visit your booth on Election Day. After verification, press the blue button next to your candidate's name on the EVM (Electronic Voting Machine).",
    color: '#000080',
    bg: '#EEF0FF',
    border: 'rgba(0,0,128,0.15)'
  },
  {
    icon: CheckCircle,
    title: "Verify & Track",
    description: "After voting, collect your VVPAT slip for verification. Track election results live on the ECI official website on counting day.",
    color: '#FF9933',
    bg: '#FFF7ED',
    border: 'rgba(255,153,51,0.2)'
  }
];

export default function VotingSteps() {
  return (
    <section id="guide" className="section-padding" style={{ background: '#FAFAFA' }}>
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>Step by Step</span>
          <h2 className="section-heading">How to Participate</h2>
          <p className="section-subheading">
            Voting is a fundamental right. Follow these simple steps to ensure your ballot is counted.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="card text-center"
                style={{ padding: '2rem 1.5rem' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.10)' }}
              >
                <div style={{
                  width: '60px', height: '60px',
                  borderRadius: '16px',
                  background: step.bg,
                  border: `1.5px solid ${step.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <Icon size={26} color={step.color} />
                </div>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: step.color, color: 'white',
                  fontSize: '0.75rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  {index + 1}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1A1A2E' }}>{step.title}</h3>
                <p style={{ color: '#5A5A6A', fontSize: '0.9rem', lineHeight: 1.7 }}>{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
