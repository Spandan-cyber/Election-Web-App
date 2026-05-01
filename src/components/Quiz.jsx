import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';

const quizData = [
  {
    question: "What does EVM stand for in Indian elections?",
    options: ["Electronic Voter Management", "Electronic Voting Machine", "Election Verification Method", "Electoral Vote Monitor"],
    answer: 1
  },
  {
    question: "Which body conducts General Elections in India?",
    options: ["Supreme Court of India", "Parliament of India", "Election Commission of India", "Ministry of Home Affairs"],
    answer: 2
  },
  {
    question: "How many seats are there in the Lok Sabha?",
    options: ["245", "543", "552", "525"],
    answer: 1
  },
  {
    question: "What is NOTA in Indian elections?",
    options: ["National Online Turnout Assessment", "None of the Above", "National Official Tally Aggregator", "Nominated Officer Tracking Arrangement"],
    answer: 1
  },
  {
    question: "What is the minimum age to vote in India?",
    options: ["16 years", "21 years", "18 years", "25 years"],
    answer: 2
  }
];

export default function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizData[currentQuestion].answer) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (onComplete) onComplete(score);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const getOptionStyle = (index) => {
    const base = {
      width: '100%', padding: '0.9rem 1.25rem',
      textAlign: 'left', borderRadius: '0.75rem',
      border: '1.5px solid #E8E8E8',
      background: '#FFFFFF', color: '#1A1A2E',
      fontSize: '0.95rem', fontWeight: 500,
      cursor: isAnswered ? 'default' : 'pointer',
      transition: 'all 0.2s',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    };
    if (!isAnswered) return base;
    if (index === quizData[currentQuestion].answer) {
      return { ...base, background: '#F0FDF4', border: '1.5px solid #138808', color: '#0F6B06' };
    }
    if (index === selectedOption) {
      return { ...base, background: '#FFF1F2', border: '1.5px solid #E11D48', color: '#BE123C' };
    }
    return { ...base, opacity: 0.5 };
  };

  const pct = Math.round((score / quizData.length) * 100);

  return (
    <section id="quiz" className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          className="text-center"
          style={{ marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-green" style={{ marginBottom: '1rem', display: 'inline-block' }}>Challenge Yourself</span>
          <h2 className="section-heading">Test Your Knowledge</h2>
          <p className="section-subheading">
            Take this quick quiz to see how much you know about the Indian election process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            maxWidth: '680px', margin: '0 auto',
            background: '#FAFAFA',
            borderRadius: '1.5rem',
            border: '1px solid #E8E8E8',
            boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
            padding: '2.5rem 2rem'
          }}
        >
          {showResults ? (
            <div className="text-center">
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: pct >= 60 ? '#F0FDF4' : '#FFF7ED',
                border: `3px solid ${pct >= 60 ? '#138808' : '#FF9933'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Trophy size={36} color={pct >= 60 ? '#138808' : '#FF9933'} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#1A1A2E' }}>Quiz Complete!</h3>
              <p style={{ color: '#5A5A6A', marginBottom: '1.5rem' }}>
                You scored <strong style={{ color: pct >= 60 ? '#138808' : '#FF9933' }}>{score} out of {quizData.length}</strong>
              </p>
              <div style={{ height: '8px', background: '#E8E8E8', borderRadius: '999px', margin: '0 auto 1.5rem', maxWidth: '300px' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: pct >= 60 ? 'var(--grad-green)' : 'var(--grad-saffron)', borderRadius: '999px', transition: 'width 0.6s' }} />
              </div>
              <p style={{ color: '#7A7A8A', marginBottom: '2rem', fontSize: '0.95rem' }}>
                {pct === 100 ? '🏆 Perfect score! You are an election expert!' : pct >= 60 ? '🎉 Great job! Keep learning!' : '📚 Keep studying — you\'ll ace it next time!'}
              </p>
              <button onClick={handleRestart} className="btn-primary">
                <RotateCcw size={16} /> Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#7A7A8A', fontWeight: 600 }}>
                  Question {currentQuestion + 1} of {quizData.length}
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {quizData.map((_, i) => (
                    <div key={i} style={{
                      width: '28px', height: '4px', borderRadius: '999px',
                      background: i < currentQuestion ? '#138808' : i === currentQuestion ? '#FF9933' : '#E8E8E8',
                      transition: 'background 0.3s'
                    }} />
                  ))}
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#1A1A2E', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {quizData[currentQuestion].question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
                {quizData[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { scale: 1.01, x: 4 } : {}}
                    onClick={() => handleOptionClick(index)}
                    style={getOptionStyle(index)}
                  >
                    <span>{option}</span>
                    {isAnswered && index === quizData[currentQuestion].answer && <CheckCircle2 size={20} color="#138808" />}
                    {isAnswered && index === selectedOption && index !== quizData[currentQuestion].answer && <XCircle size={20} color="#E11D48" />}
                  </motion.button>
                ))}
              </div>

              {isAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'right' }}>
                  <button onClick={handleNext} className="btn-primary">
                    {currentQuestion < quizData.length - 1 ? 'Next Question →' : 'See Results'}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
