
import React from 'react'
import { http, HttpResponse, delay } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import Auth from './auts'
import { renderWithProviders } from './renderWithProviders'
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router'

const API_SERVER = 'http://127.0.0.1:3000';
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  // http.post(`${API_SERVER}/logIn`, async () => {
  //   console.log(99999999999999999999999999999999999);
  //   await delay(150)
    
  //   return HttpResponse.json({fuck: 'fuck'}, { status: 200 })
  // })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fill form errors', async () => {
  renderWithProviders(
     <MemoryRouter initialEntries={['/']}>
      <Auth />
    </MemoryRouter>)

  fireEvent.submit(screen.getByTestId('submit'));
  expect(await screen.findByText(/Логин должно быть заполнено/i)).toBeInTheDocument();
  expect(await screen.findByText(/Пароль должно быть заполнено/i)).toBeInTheDocument();

  fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
  fireEvent.submit(screen.getByTestId('submit'));
  expect(await screen.findByText(/Логин должно быть заполнено/i)).not.toBeInTheDocument();
  expect(await screen.findByText(/Пароль должно быть заполнено/i)).toBeInTheDocument();
  
  fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
  fireEvent.change(screen.getByTestId('pass'), {target: {value: 'qwe'}});
  expect(await screen.findByText(/Логин должно быть заполнено/i)).not.toBeInTheDocument();
  expect(await screen.findByText(/Неверный логин или пароль/i)).not.toBeInTheDocument();
})

test('wrong auth data 403 status code', async () => {
  server.use(
    // http.post(`${API_SERVER}/logIn`, (_req, _res, _ctx) => {
    //   return new HttpResponse(null, {status: 200})
    // }),
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

test('OK auth data 200 status code', async () => {
  server.use(
    // http.post(`${API_SERVER}/logIn`, (_req, _res, _ctx) => {
    //   return new HttpResponse(null, {status: 200})
    // }),
    http.post(`${API_SERVER}/logIn`, () => {
      return new HttpResponse(null, {status: 200})
    }),
  )

  renderWithProviders(
     <MemoryRouter initialEntries={['/']}>
      <Auth />
    </MemoryRouter>)

  fireEvent.change(screen.getByTestId('login'), {target: {value: 'qwe'}});
  fireEvent.change(screen.getByTestId('pass'), {target: {value: 'qwe'}});
  fireEvent.submit(screen.getByTestId('submit'));
  screen.debug()
  expect(await screen.findByText(/Неверный логин или пароль/i)).not.toBeInTheDocument();
  
})