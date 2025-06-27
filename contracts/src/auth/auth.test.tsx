
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from './renderWithProviders'
import { MemoryRouter, Route, Routes } from 'react-router'
import Auth from './auts'

const API_SERVER = 'http://127.0.0.1:3000';

export const handlers = [
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('fill form errors', async () => {


  it('error empty form', async () =>{

      renderWithProviders(
     <MemoryRouter initialEntries={['/']}>
      <Auth />
    </MemoryRouter>)
    fireEvent.submit(screen.getByTestId('submit'));
    expect(await screen.findByText(/Логин должно быть заполнено/i)).toBeInTheDocument();
    expect(await screen.findByText(/Пароль должно быть заполнено/i)).toBeInTheDocument();
  })
  
  it('login fill, password empty', async () => {
      renderWithProviders(
     <MemoryRouter initialEntries={['/']}>
      <Auth />
    </MemoryRouter>)
    screen.debug();
    fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
    fireEvent.submit(screen.getByTestId('submit'));
    expect( screen.queryByText(/Логин должно быть заполнено/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/Пароль должно быть заполнено/i)).toBeInTheDocument();
  })
  
  it('fill form', async () => {
      renderWithProviders(
     <MemoryRouter initialEntries={['/']}>
      <Auth />
    </MemoryRouter>)
    fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
    fireEvent.change(screen.getByTestId('pass'), {target: {value: 'qwe'}});
    expect( screen.queryByText(/Логин должно быть заполнено/i)).not.toBeInTheDocument();
    expect( screen.queryByText(/Неверный логин или пароль/i)).not.toBeInTheDocument();
  })
})

describe('wrong auth data 403 status code', async () => {
  it('wrong authorisation data', async () => {
    server.use(
      http.post(`${API_SERVER}/logIn`, () => {
        return new HttpResponse(null, {status: 403})
      }),
    )
      renderWithProviders(
     <MemoryRouter initialEntries={['/']}>
      <Auth />
    </MemoryRouter>)

    fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
    fireEvent.change(screen.getByTestId('pass'), {target: {value: 'qwe'}});
    fireEvent.submit(screen.getByTestId('submit'));
    expect(await screen.findByText(/Неверный логин или пароль/i)).toBeInTheDocument();
    })
})

describe('OK auth data 200 status code', async () => {
  it('success authorisation', async () => {
    server.use(
      // http.post(`${API_SERVER}/logIn`, (_req, _res, _ctx) => {
      //   return new HttpResponse(null, {status: 200})
      // }),
      http.post(`${API_SERVER}/logIn`, () => {
        return new HttpResponse(null, {status: 200})
      }),
      http.post(`${API_SERVER}/checkAuth`, () => {
        return new HttpResponse(null, {status: 403})
      }),
    )
    renderWithProviders(
      <MemoryRouter initialEntries={['/', 'contract']} initialIndex={0}>
          <Routes>
            <Route
                path="/"
                element={<Auth />}
              />
            <Route
                path="contract"
                element={<>Contract</>}
              />
          </Routes>
      </MemoryRouter>
      )
    fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
    fireEvent.change(screen.getByTestId('pass'), {target: {value: 'qwe'}});
    fireEvent.submit(screen.getByTestId('submit'));
    expect(await screen.findByText(/Contract/i)).toBeInTheDocument();
  })
})
