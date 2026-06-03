import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import StatusModal from './StatusModal';

// Rewritten 2026-06-02: the previous tests targeted a non-existent API
// (optional onClose, autoCloseDuration, a "×" button, .rounded-lg/.backdrop).
// These test the ACTUAL component + the dialog a11y added in this change set.

const base = {
  type: 'success' as const,
  title: 'Saved',
  message: 'All good',
  onClose: jest.fn(),
};

describe('StatusModal', () => {
  it('renders nothing when show is false', () => {
    const { container } = render(<StatusModal {...base} show={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title and message when show is true', () => {
    render(<StatusModal {...base} show />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('is a labelled modal dialog', () => {
    render(<StatusModal {...base} show />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('calls onClose when the OK button is clicked', () => {
    const onClose = jest.fn();
    render(<StatusModal {...base} show onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = jest.fn();
    render(<StatusModal {...base} show onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('handles long title and message without crashing', () => {
    const title = 'x'.repeat(200);
    const message = 'y'.repeat(500);
    render(<StatusModal {...base} show title={title} message={message} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
