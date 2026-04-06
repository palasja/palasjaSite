import { renderWithProviders } from '../../auth/renderWithProviders';
import SelectMonthYear from './selectMonthYear';
import { screen } from '@testing-library/react';

describe('month value', () => {
  it('correct default month value', () => {
    renderWithProviders(<SelectMonthYear />, {
      preloadedState: {
        services: {
          choosenMonth: '0',
          choosenYear: '2025',
          isWithoutOrg: false,
        },
      },
    });

    expect(screen.getByDisplayValue(/январ/i)).toBeInTheDocument();
  });
});

describe('year value', () => {
  it('correct default year value', () => {
    renderWithProviders(<SelectMonthYear />, {
      preloadedState: {
        services: {
          choosenMonth: '0',
          choosenYear: '2025',
          isWithoutOrg: false,
        },
      },
    });

    expect(screen.getByDisplayValue(/2025/i)).toBeInTheDocument();
  });
});
