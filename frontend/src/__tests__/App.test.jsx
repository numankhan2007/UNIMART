import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without throwing', () => {
    // Smoke test — App mounts and renders without crashing
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});

