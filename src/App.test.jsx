import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

// Mocking some of the subcomponents to keep tests isolated and fast
vi.mock('./components/Header', () => ({ default: () => <div data-testid="header">Header</div> }));
vi.mock('./components/Hero', () => ({ default: () => <div data-testid="hero">Hero</div> }));
vi.mock('./components/VotingSteps', () => ({ default: () => <div data-testid="voting-steps">VotingSteps</div> }));
vi.mock('./components/Timeline', () => ({ default: () => <div data-testid="timeline">Timeline</div> }));
vi.mock('./components/Flashcards', () => ({ default: () => <div data-testid="flashcards">Flashcards</div> }));
vi.mock('./components/Quiz', () => ({ default: () => <div data-testid="quiz">Quiz</div> }));
vi.mock('./components/News', () => ({ default: () => <div data-testid="news">News</div> }));
vi.mock('./components/Assistant', () => ({ default: () => <div data-testid="assistant">Assistant</div> }));
vi.mock('./components/CustomCursor', () => ({ default: () => <div data-testid="custom-cursor">CustomCursor</div> }));

describe('App Component', () => {
  it('renders all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('voting-steps')).toBeInTheDocument();
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByTestId('flashcards')).toBeInTheDocument();
    expect(screen.getByTestId('quiz')).toBeInTheDocument();
    expect(screen.getByTestId('news')).toBeInTheDocument();
    expect(screen.getByTestId('assistant')).toBeInTheDocument();
  });

  it('renders the footer text', () => {
    render(<App />);
    expect(screen.getByText(/ElectIndia/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering every Indian voter/i)).toBeInTheDocument();
  });
});
