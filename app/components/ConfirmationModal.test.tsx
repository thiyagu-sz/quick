import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

// Rewritten 2026-06-02: the previous tests omitted required props
// (confirmLabel/cancelLabel) and asserted props the component never had
// (type, closeOnBackdropClick). These test the ACTUAL component + new a11y.

const base = {
  title: 'Delete collection?',
  message: 'This cannot be undone.',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('ConfirmationModal', () => {
  it('renders nothing when show is false', () => {
    const { container } = render(<ConfirmationModal {...base} show={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title, message, and both action buttons', () => {
    render(<ConfirmationModal {...base} show />);
    expect(screen.getByText('Delete collection?')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('is a labelled modal dialog', () => {
    render(<ConfirmationModal {...base} show />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('fires onConfirm and onCancel on the respective buttons', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(<ConfirmationModal {...base} show onConfirm={onConfirm} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('Escape triggers onCancel', () => {
    const onCancel = jest.fn();
    render(<ConfirmationModal {...base} show onCancel={onCancel} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalled();
  });

  it('disables the buttons while loading', () => {
    render(<ConfirmationModal {...base} show isLoading />);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});
