import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PrivacyBadge from '../PrivacyBadge';

describe('PrivacyBadge', () => {
  it('renders shielded badge text', () => {
    render(<PrivacyBadge isShielded />);
    expect(screen.getByText(/Shielded/i)).toBeTruthy();
  });

  it('renders transparent badge text', () => {
    render(<PrivacyBadge isShielded={false} />);
    expect(screen.getByText(/Transparent/i)).toBeTruthy();
  });
});
