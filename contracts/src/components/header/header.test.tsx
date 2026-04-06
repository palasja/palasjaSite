import { render, screen } from '@testing-library/react';
import Header from './header';
import { MemoryRouter } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import { renderWithProviders } from '../../auth/renderWithProviders';
import { delay } from 'msw';

beforeEach(() => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/contract']}>
      <Header />
    </MemoryRouter>,
    {
      preloadedState: {
        auth: {
          authErrorMessage: null,
          status: 'idle',
          isAuth: true,
          isLoading: false,
          isCheked: false,
        },
      },
    }
  );
});

describe('header no print', () => {
  it('header has no print class', () => {
    expect(screen.queryByTestId('header')?.classList.contains('noprint')).toBeTruthy();
  });
});

describe('header has all links', () => {
  it('header has 4 link', async () => {
    await delay(100);
    expect(screen.queryAllByRole('link').length).toBe(4);
  });
  it('header has correct links', () => {
    expect(screen.queryAllByRole('link')[0]).toHaveAttribute('href', '/contract');
    expect(screen.queryAllByRole('link')[1]).toHaveAttribute('href', '/stats');
    expect(screen.queryAllByRole('link')[2]).toHaveAttribute('href', '/softinfo');
    expect(screen.queryAllByRole('link')[3]).toHaveAttribute('href', '/logout');
  });
});
