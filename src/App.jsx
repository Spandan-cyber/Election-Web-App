import Header from './components/Header';
import Hero from './components/Hero';
import VotingSteps from './components/VotingSteps';
import Timeline from './components/Timeline';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import News from './components/News';
import Assistant from './components/Assistant';
import CustomCursor from './components/CustomCursor';
import { useState } from 'react';

function App() {
  const [quizScore, setQuizScore] = useState(null);
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <VotingSteps />
        <Timeline />
        <Flashcards />
        <Quiz onComplete={setQuizScore} />
        <News />
      </main>
      <Assistant quizScore={quizScore} totalQuestions={5} />
      <footer style={{
        background: '#1A1A2E',
        color: 'rgba(255,255,255,0.7)',
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          {/* Tricolor bar */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
            borderRadius: '999px',
            maxWidth: '120px',
            margin: '0 auto 1.5rem'
          }} />
          <p style={{ fontSize: '0.9rem' }}>© {new Date().getFullYear()} ElectIndia &nbsp;|&nbsp; 🇮🇳 Empowering every Indian voter with knowledge.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
