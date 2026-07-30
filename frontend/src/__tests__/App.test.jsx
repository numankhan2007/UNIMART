import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  it('renders without throwing', () => {
    // Smoke test — App mounts and renders the router without crashing
    expect(() => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    }).not.toThrow();
  });
});
