import { motion } from 'framer-motion';
import { ExternalLink, Clock, Tag } from 'lucide-react';

const newsItems = [
  {
    category: "Election Commission",
    tag: "Official",
    tagColor: "#FF9933",
    tagBg: "rgba(255,153,51,0.1)",
    title: "ECI Launches New Voter Registration Drive for First-Time Voters",
    summary: "The Election Commission of India has launched a nationwide campaign to enroll 18–19 year-old first-time voters ahead of the upcoming state elections. The drive targets over 2 crore new eligible voters.",
    time: "2 hours ago",
    source: "Election Commission of India",
    link: "https://eci.gov.in",
    accent: "#FF9933"
  },
  {
    category: "Technology",
    tag: "Update",
    tagColor: "#000080",
    tagBg: "rgba(0,0,128,0.08)",
    title: "VVPAT Machines to Be Deployed in All Polling Booths Across India",
    summary: "The Supreme Court's directive has been fully implemented — Voter Verifiable Paper Audit Trail (VVPAT) machines will now be present at every polling booth, strengthening voter confidence in the electoral process.",
    time: "5 hours ago",
    source: "The Hindu",
    link: "https://thehindu.com",
    accent: "#000080"
  },
  {
    category: "Voter Awareness",
    tag: "Campaign",
    tagColor: "#138808",
    tagBg: "rgba(19,136,8,0.08)",
    title: "'Every Vote Counts' Campaign Reaches Remote Constituencies",
    summary: "Under the SVEEP (Systematic Voters' Education and Electoral Participation) programme, ECI has reached over 500 remote villages to raise voter awareness and increase turnout among marginalized communities.",
    time: "1 day ago",
    source: "Press Information Bureau",
    link: "https://pib.gov.in",
    accent: "#138808"
  },
  {
    category: "Model Code",
    tag: "Enforcement",
    tagColor: "#FF9933",
    tagBg: "rgba(255,153,51,0.1)",
    title: "Model Code of Conduct: Key Rules Every Voter Should Know",
    summary: "With election season approaching, the Election Commission has released a comprehensive guide on the Model Code of Conduct — covering campaign regulations, use of government resources, and polling day rules.",
    time: "2 days ago",
    source: "Election Commission of India",
    link: "https://eci.gov.in",
    accent: "#FF9933"
  },
  {
    category: "Digital India",
    tag: "Tech",
    tagColor: "#000080",
    tagBg: "rgba(0,0,128,0.08)",
    title: "Voter Helpline 1950 Receives Over 10 Lakh Calls This Season",
    summary: "The national voter helpline number 1950 has logged over 10 lakh calls this election season, helping citizens check voter lists, locate polling booths, and file complaints about code violations.",
    time: "3 days ago",
    source: "ECI Press Release",
    link: "https://eci.gov.in",
    accent: "#000080"
  },
  {
    category: "Inclusivity",
    tag: "Initiative",
    tagColor: "#138808",
    tagBg: "rgba(19,136,8,0.08)",
    title: "ECI Introduces Braille Ballots and Wheelchair Access at All Booths",
    summary: "In a landmark accessibility initiative, the Election Commission mandates Braille-enabled EVMs and fully wheelchair-accessible polling booths across all constituencies for the upcoming elections.",
    time: "4 days ago",
    source: "Hindustan Times",
    link: "https://hindustantimes.com",
    accent: "#138808"
  }
];

export default function News() {
  return (
    <section id="news" className="section-padding" style={{ background: '#F8F8F8' }}>
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-saffron" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            📰 Latest Updates
          </span>
          <h2 className="section-heading">Election News & Updates</h2>
          <p className="section-subheading">
            Stay informed with the latest news from India's electoral landscape.
          </p>
        </motion.div>

        {/* Featured top story */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            background: '#FFFFFF',
            borderRadius: '1.25rem',
            border: '1px solid #E8E8E8',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            overflow: 'hidden',
            marginBottom: '2rem',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s'
          }}
        >
          {/* Left colored panel */}
          <div style={{
            background: 'linear-gradient(135deg, #FF9933 0%, #E8821A 60%, #138808 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem 2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '180px', height: '180px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)'
            }} />
            <span style={{
              display: 'inline-block',
              padding: '0.3rem 0.8rem',
              background: 'rgba(255,255,255,0.25)',
              color: 'white', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              marginBottom: '1rem', width: 'fit-content'
            }}>
              🔥 Top Story
            </span>
            <h3 style={{ color: 'white', fontSize: '1.5rem', lineHeight: 1.3, fontWeight: 800 }}>
              India's 2024 General Elections: The World's Largest Democratic Exercise
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '1rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Over 96 crore registered voters participated in 7 phases of polling — making it the largest single democratic event in human history.
            </p>
          </div>

          {/* Right content */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Clock size={14} color="#7A7A8A" />
                <span style={{ fontSize: '0.8rem', color: '#7A7A8A' }}>Featured Article</span>
              </div>
              <p style={{ color: '#3D3D3D', lineHeight: 1.75, fontSize: '0.95rem' }}>
                The 2024 Indian General Election set multiple records — highest voter turnout in urban areas, first time EVMs used in all 543 constituencies simultaneously, and record female voter participation at 48.3%. The election saw over 8,000 candidates contest across all seats.
              </p>
              <ul style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['96 crore+ registered voters', '7-phase election process', 'Record female voter turnout'].map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#3D3D3D', fontSize: '0.88rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: i % 2 === 0 ? '#FF9933' : '#138808', flexShrink: 0 }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://eci.gov.in"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: 600,
                color: '#FF9933'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8821A'}
              onMouseLeave={e => e.currentTarget.style.color = '#FF9933'}
            >
              Read Full Story <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>

        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {newsItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
              style={{
                display: 'block',
                background: '#FFFFFF',
                borderRadius: '1rem',
                border: '1px solid #EBEBEB',
                padding: '1.5rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                textDecoration: 'none',
                transition: 'transform 0.25s, box-shadow 0.25s',
                borderLeft: `4px solid ${item.accent}`,
                cursor: 'pointer'
              }}
            >
              {/* Tags row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{
                  padding: '0.2rem 0.65rem',
                  background: item.tagBg,
                  color: item.tagColor,
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  <Tag size={10} style={{ marginRight: '3px', display: 'inline', verticalAlign: 'middle' }} />
                  {item.tag}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#7A7A8A' }}>
                  <Clock size={12} /> {item.time}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1.45, marginBottom: '0.65rem' }}>
                {item.title}
              </h3>

              {/* Summary */}
              <p style={{ fontSize: '0.85rem', color: '#5A5A6A', lineHeight: 1.65, marginBottom: '1rem' }}>
                {item.summary}
              </p>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: '#7A7A8A', fontWeight: 500 }}>
                  {item.source}
                </span>
                <span style={{ fontSize: '0.78rem', color: item.accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  Read more <ExternalLink size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All link */}
        <motion.div
          className="text-center"
          style={{ marginTop: '2.5rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="https://eci.gov.in/media-explainers/"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ fontSize: '0.9rem', padding: '0.85rem 2rem' }}
          >
            View All News & Updates <ExternalLink size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
