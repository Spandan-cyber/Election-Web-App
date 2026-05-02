import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';

// Lazy load components below the fold for better efficiency
const VotingSteps = lazy(() => import('./components/VotingSteps'));
const Timeline = lazy(() => import('./components/Timeline'));
const Flashcards = lazy(() => import('./components/Flashcards'));
const Quiz = lazy(() => import('./components/Quiz'));
const News = lazy(() => import('./components/News'));
const Assistant = lazy(() => import('./components/Assistant'));

function App() {
  const [quizScore, setQuizScore] = useState(null);
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A7A8A' }}>Loading section...</div>}>
          <VotingSteps />
          <Timeline />
          <Flashcards />
          <Quiz onComplete={setQuizScore} />
          <News />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Assistant quizScore={quizScore} totalQuestions={5} />
      </Suspense>
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
