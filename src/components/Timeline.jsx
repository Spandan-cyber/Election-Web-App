import { motion } from 'framer-motion';

const timelineEvents = [
  {
    phase: "January – March",
    title: "Election Commission Announcement",
    description: "The Election Commission of India announces the election schedule, including voting dates and model code of conduct enforcement.",
    color: '#FF9933'
  },
  {
    phase: "March – April",
    title: "Candidate Nominations",
    description: "Political parties file nominations for their candidates. Nomination papers are scrutinized and candidates can withdraw within a stipulated period.",
    color: '#138808'
  },
  {
    phase: "April – May",
    title: "Election Campaigning",
    description: "Registered political parties and candidates campaign across constituencies. The Model Code of Conduct is strictly enforced during this period.",
    color: '#000080'
  },
  {
    phase: "Election Day",
    title: "Polling Day",
    description: "Voters across constituencies cast their votes using Electronic Voting Machines (EVMs). VVPAT machines provide a paper trail for verification.",
    color: '#FF9933'
  },
  {
    phase: "Counting Day",
    title: "Vote Counting & Results",
    description: "Votes are counted under strict supervision. Results are declared and winners are announced for each constituency by the Returning Officer.",
    color: '#138808'
  }
];

export default function Timeline() {
  return (
    <section id="timeline" className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-green" style={{ marginBottom: '1rem', display: 'inline-block' }}>Process</span>
          <h2 className="section-heading">The Election Timeline</h2>
          <p className="section-subheading">
            Understanding the sequence of events in the Indian General Election process.
          </p>
        </motion.div>

        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '8px',
            bottom: '8px',
            width: '3px',
            background: 'linear-gradient(180deg, #FF9933, #FFFFFF 50%, #138808)',
            borderRadius: '4px'
          }} />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '1.75rem',
                paddingLeft: '48px',
                position: 'relative'
              }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '10px',
                top: '18px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: event.color,
                border: '3px solid white',
                boxShadow: `0 0 0 3px ${event.color}33`,
                zIndex: 1
              }} />

              <motion.div
                className="card"
                style={{ padding: '1.5rem', flex: 1 }}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
              >
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: event.color,
                  marginBottom: '0.4rem',
                  padding: '0.2rem 0.6rem',
                  background: `${event.color}18`,
                  borderRadius: '999px',
                  border: `1px solid ${event.color}33`
                }}>
                  {event.phase}
                </span>
                <h3 style={{ fontSize: '1.1rem', color: '#1A1A2E', margin: '0.4rem 0 0.6rem' }}>{event.title}</h3>
                <p style={{ color: '#5A5A6A', fontSize: '0.9rem', lineHeight: 1.7 }}>{event.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
