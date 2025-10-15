import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderWithProviders } from '../renderWithProviders';
import { MemoryRouter, Route, Routes } from 'react-router';
import Login from '.';
const env = import.meta.env;

export const handlers = [];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('fill form errors', async () => {
  it('error empty form', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );
    fireEvent.submit(await screen.findByTestId('submit'));
    expect(await screen.findByText(/Логин должно быть заполнено/i)).toBeInTheDocument();
    expect(await screen.findByText(/Пароль должно быть заполнено/i)).toBeInTheDocument();
  });

  it('login fill, password empty', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(await screen.findByTestId('login'), { target: { value: 'qwe' } });
    fireEvent.submit(await screen.findByTestId('submit'));
    expect(screen.queryByText(/Логин должно быть заполнено/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/Пароль должно быть заполнено/i)).toBeInTheDocument();
  });

  it('fill form', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );
    screen.debug();
    fireEvent.change(await screen.findByTestId('login'), { target: { value: 'qwe' } });
    fireEvent.change(await screen.findByTestId('pass'), { target: { value: 'qwe' } });
    expect(screen.queryByText(/Логин должно быть заполнено/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Неверный логин или пароль/i)).not.toBeInTheDocument();
  });
});

describe('wrong auth data 403 status code', async () => {
  it('wrong authorisation data', async () => {
    server.use(
      http.post(`${env.VITE_API_SERVER_URL_DEV}/logIn`, () => {
        return new HttpResponse(null, { status: 403 });
      })
    );
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );
    screen.debug();
    fireEvent.change(await screen.findByTestId('login'), { target: { value: 'qwe' } });
    fireEvent.change(await screen.findByTestId('pass'), { target: { value: 'qwe' } });
    fireEvent.submit(await screen.findByTestId('submit'));
    expect(await screen.findByText(/Неверный логин или пароль/i)).toBeInTheDocument();
  });
});

describe('OK auth data 200 status code', async () => {
  it('success authorisation', async () => {
    server.use(
      // http.post(`${API_SERVER}/logIn`, (_req, _res, _ctx) => {
      //   return new HttpResponse(null, {status: 200})
      // }),
      http.post(`${env.VITE_API_SERVER_URL_DEV}/logIn`, () => {
        return new HttpResponse('OK', { status: 200 });
      }),
      http.post(`${env.VITE_API_SERVER_URL_DEV}/checkAuth`, () => {
        return new HttpResponse(null, { status: 403 });
      })
    );
    renderWithProviders(
      <MemoryRouter initialEntries={['/', 'contract']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="contract" element={<>Contract</>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByTestId('login'), { target: { value: 'qwe' } });
    fireEvent.change(await screen.findByTestId('pass'), { target: { value: 'qwe' } });
    fireEvent.submit(await screen.findByTestId('submit'));
    screen.debug();
    expect(await screen.findByText(/Contract/i)).toBeInTheDocument();
  });
});
