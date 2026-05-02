import { render, screen, fireEvent } from '@testing-library/react';
import Assistant from './Assistant';
import { describe, it, expect, vi } from 'vitest';

describe('Assistant Component', () => {
  it('renders the chat button initially', () => {
    render(<Assistant />);
    expect(screen.getByLabelText('Open chat assistant')).toBeInTheDocument();
  });

  it('opens chat window when FAB is clicked', () => {
    render(<Assistant />);
    const openBtn = screen.getByLabelText('Open chat assistant');
    fireEvent.click(openBtn);
    expect(screen.getAllByText(/ElectIndia Assistant/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Chat input')).toBeInTheDocument();
  });
});
