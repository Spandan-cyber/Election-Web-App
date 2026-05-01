import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Sparkles } from 'lucide-react';

const predefinedQA = [
  { q: "How do I register to vote?", a: "To register as a voter in India, visit voters.eci.gov.in and fill out **Form 6** online. You can also visit your local Booth Level Officer (BLO). Requirements: at least 18 years old, Indian citizen, resident of the constituency. After submission, you'll receive your Voter ID (EPIC) card by post within 30 days." },
  { q: "What is the voting age in India?", a: "The minimum voting age in India is **18 years**, reduced from 21 years by the 61st Constitutional Amendment (1988). This significantly expanded India's electorate and gave young citizens a powerful democratic voice." },
  { q: "What ID do I need to vote?", a: "Your **Voter ID card (EPIC)** is primary. The ECI also accepts: Aadhaar Card, MNREGA Job Card, Passbooks with photo, Health Smart Card, Driving License, PAN Card, Smart Card by RGI, Indian Passport, and Pension documents with photo." },
  { q: "What is the Lok Sabha?", a: "The **Lok Sabha** (House of the People) is India's lower house of Parliament with **543 elected seats**. Members are directly elected using First Past the Post voting. It serves a max term of 5 years and is more powerful than the Rajya Sabha in money bills." },
  { q: "How does EVM work?", a: "An **EVM** has two units — a Control Unit (with the polling officer) and a Balloting Unit (for the voter). Press the button next to your candidate's symbol → a beep confirms → the attached **VVPAT** machine prints a paper slip you can verify through the glass window within 7 seconds." },
  { q: "What is NOTA?", a: "**NOTA** (None of the Above) was introduced in 2013 by a Supreme Court directive. It lets you reject ALL candidates. However, NOTA votes are counted separately — the candidate with the highest votes still wins, even if NOTA gets more votes." },
  { q: "When are the polls open?", a: "Generally **7:00 AM to 6:00 PM** on polling day, varying by constituency. Check ECI's official site for exact timings. Importantly, if you're in the queue before closing time, you **have the right to vote** — they cannot turn you away." }
];

// Context detection helpers
function detectIntent(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('first time') || lower.includes('new voter') || lower.includes('never voted'))
    return 'first_time_voter';
  if (lower.includes('quiz') || lower.includes('score') || lower.includes('result'))
    return 'quiz_inquiry';
  if (lower.includes('where') && (lower.includes('booth') || lower.includes('poll')))
    return 'booth_finder';
  if (lower.includes('register') || lower.includes('enroll') || lower.includes('form 6'))
    return 'registration';
  return 'general';
}

function getContextualResponse(intent, quizScore, totalQuestions) {
  if (intent === 'first_time_voter') {
    return `Welcome, first-time voter! 🎉 Here's your quick-start guide:

**Step 1:** Check if you're registered at voters.eci.gov.in
**Step 2:** If not, fill Form 6 online (takes ~5 minutes)
**Step 3:** Find your polling booth using the Voter Helpline app
**Step 4:** On Election Day, carry your Voter ID + any backup photo ID
**Step 5:** Press the button on the EVM → verify your VVPAT slip

Would you like me to explain any of these steps in detail?`;
  }
  if (intent === 'quiz_inquiry' && quizScore !== null) {
    const pct = Math.round((quizScore / totalQuestions) * 100);
    if (pct === 100) return `You scored a perfect ${quizScore}/${totalQuestions} on the quiz! 🏆 You're an election expert. Want to explore advanced topics like the Model Code of Conduct or Electoral Bond system?`;
    if (pct >= 60) return `You scored ${quizScore}/${totalQuestions} on the quiz — great job! 👍 I noticed you may want to review: the EVM process and NOTA rules. Want me to explain them?`;
    return `You scored ${quizScore}/${totalQuestions} on the quiz. No worries — let's review together! I'd suggest starting with how EVMs work and what the Lok Sabha is. Which would you like first?`;
  }
  if (intent === 'booth_finder') {
    return `To find your polling booth:\n\n🔹 Visit **voters.eci.gov.in** → "Know Your Polling Station"\n🔹 Download the **Voter Helpline App** (Android/iOS)\n🔹 Call **1950** (National Voter Helpline — free)\n🔹 Send an SMS: **EPIC <your voter ID>** to 1950\n\nYour booth details will include the exact address and your serial number on the voter list.`;
  }
  return null;
}

export default function Assistant({ quizScore = null, totalQuestions = 5 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'नमस्ते! 🇮🇳 I\'m your **ElectIndia Assistant** — powered by Google Gemini AI.\n\nAre you a **first-time voter** or looking for specific election information? Ask me anything or tap a suggested question below!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // When quiz is completed, proactively notify
  useEffect(() => {
    if (quizScore !== null && isOpen) {
      const pct = Math.round((quizScore / totalQuestions) * 100);
      const proactive = pct < 60
        ? `I noticed you just completed the quiz with ${quizScore}/${totalQuestions}. Want me to help you review the topics you missed? 📚`
        : `Great job on the quiz — ${quizScore}/${totalQuestions}! 🎉 Want to explore more advanced election topics?`;
      setMessages(prev => {
        const alreadyNotified = prev.some(m => m.content.includes('quiz'));
        if (alreadyNotified) return prev;
        return [...prev, { role: 'assistant', content: proactive }];
      });
    }
  }, [quizScore, isOpen]);

  const simulateTyping = (reply) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 600);
  };

  const handlePredefined = (qa) => {
    setMessages(prev => [...prev, { role: 'user', content: qa.q }]);
    simulateTyping(qa.a);
  };

  // Format message content (bold text support)
  const formatMessage = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, j) => (
        <span key={`${i}-${j}`}>{line}{j < part.split('\n').length - 1 && <br />}</span>
      ));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    // 1. Check intent for contextual responses
    const intent = detectIntent(userMsg);
    const contextual = getContextualResponse(intent, quizScore, totalQuestions);
    if (contextual) {
      simulateTyping(contextual);
      return;
    }

    // 2. Check predefined Q&A (keyword match)
    const match = predefinedQA.find(qa =>
      userMsg.toLowerCase().includes(qa.q.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
    );
    if (match) {
      simulateTyping(match.a);
      return;
    }

    // 3. Call Gemini proxy with full conversation history for context
    setIsLoading(true);
    try {
      // Build conversation history for Gemini multi-turn context
      const history = messages
        .filter(m => m.role !== 'assistant' || messages.indexOf(m) !== 0) // skip greeting
        .slice(-6) // last 6 messages for context window
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n');

      const contextPrompt = quizScore !== null
        ? `[User context: scored ${quizScore}/${totalQuestions} on the election quiz]\n`
        : '';

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: history,
          context: contextPrompt
        })
      });

      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      simulateTyping(data.reply);
    } catch {
      simulateTyping('I can answer questions about voter registration, EVMs, Lok Sabha, and more! Try tapping one of the suggested questions below, or call the **National Voter Helpline: 1950** for official assistance.');
    }
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            style={{
              width: '62px', height: '62px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF9933, #E8821A)',
              color: 'white', boxShadow: '0 8px 28px rgba(255,153,51,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid white', position: 'relative'
            }}
          >
            <MessageCircle size={26} />
            {/* Online indicator */}
            <span style={{
              position: 'absolute', top: '2px', right: '2px',
              width: '12px', height: '12px', borderRadius: '50%',
              background: '#138808', border: '2px solid white'
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem',
              width: '380px', height: '580px',
              background: '#FFFFFF',
              borderRadius: '1.5rem',
              boxShadow: '0 24px 64px rgba(0,0,0,0.16)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #E8E8E8'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #FF9933, #E8821A)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>🇮🇳</div>
                <div>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ElectIndia Assistant <Sparkles size={12} />
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', margin: 0 }}>
                    🟢 Online · Powered by Google Gemini
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ color: 'white', opacity: 0.8, padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '0.4rem' }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9933, #E8821A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem' }}>🇮🇳</div>
                  )}
                  <div style={{
                    maxWidth: '82%', padding: '0.75rem 1rem',
                    borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '0 1rem 1rem 1rem',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #FF9933, #E8821A)' : '#F5F5F5',
                    color: msg.role === 'user' ? 'white' : '#1A1A2E',
                    fontSize: '0.875rem', lineHeight: 1.65,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    {formatMessage(msg.content)}
                  </div>
                  {msg.role === 'user' && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <User size={13} color="#7A7A8A" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {(isLoading || isTyping) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9933, #E8821A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>🇮🇳</div>
                  <div style={{ padding: '0.75rem 1rem', background: '#F5F5F5', borderRadius: '0 1rem 1rem 1rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF9933' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div style={{
              padding: '0.6rem 0.75rem', display: 'flex', gap: '0.5rem',
              overflowX: 'auto', borderTop: '1px solid #F0F0F0',
              background: '#FAFAFA', scrollbarWidth: 'none'
            }}>
              {predefinedQA.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => handlePredefined(qa)}
                  style={{
                    whiteSpace: 'nowrap', padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem', borderRadius: '999px',
                    border: '1.5px solid rgba(255,153,51,0.4)',
                    color: '#E8821A', background: 'rgba(255,153,51,0.08)',
                    fontWeight: 500, flexShrink: 0, transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(255,153,51,0.2)'; }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(255,153,51,0.08)'; }}
                >
                  {qa.q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{
              padding: '0.75rem 1rem', borderTop: '1px solid #F0F0F0',
              display: 'flex', gap: '0.5rem', background: '#FFFFFF'
            }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about Indian elections..."
                disabled={isLoading || isTyping}
                style={{
                  flex: 1, padding: '0.6rem 1rem',
                  borderRadius: '999px',
                  border: '1.5px solid #E8E8E8',
                  outline: 'none', fontSize: '0.875rem',
                  background: '#FAFAFA', color: '#1A1A2E',
                  transition: 'border-color 0.2s',
                  opacity: isLoading ? 0.6 : 1
                }}
                onFocus={e => e.target.style.borderColor = '#FF9933'}
                onBlur={e => e.target.style.borderColor = '#E8E8E8'}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.9 }}
                disabled={isLoading || isTyping}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF9933, #E8821A)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255,153,51,0.35)',
                  opacity: isLoading ? 0.6 : 1
                }}
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
