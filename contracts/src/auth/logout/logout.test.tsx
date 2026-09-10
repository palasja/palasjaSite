import { act, fireEvent, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { env } from 'process';
import { MemoryRouter, Route, Routes } from 'react-router';
import { renderWithProviders } from '../renderWithProviders';
import Logout from './logout';
export const handlers = [];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('check logout', () => {
  it('redirect after logout', async () => {
    server.use(
      http.post(`${env.VITE_API_SERVER_URL_DEV}/logout`, () => {
        return new HttpResponse('OK', { status: 200 });
      })
    );
    renderWithProviders(
      <MemoryRouter initialEntries={['logout', '/']}>
        <Routes>
          <Route path="/" element={<>Login</>} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          auth: {
            authErrorMessage: null,
            status: 'idle',
            isAuth: true,
            isLoading: false,
            isCheked: false,
            user: undefined,
          },
        },
      }
    );

    expect(await screen.findByText('Login')).toBeInTheDocument();
  });
});
