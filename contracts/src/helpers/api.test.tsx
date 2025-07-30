import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchAllOrganizations } from './api';
const env = import.meta.env;
export const handlers = [];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('fetch data', async () => {
  
  it('success fetch data', async () => {
    // const spy = vi.spyOn(api, 'fetchAllOrganizations' );
    const data = [{"id": 1, name: "testOrg"}, {"id": 2, name: "testOrg1"}];
    
    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(JSON.stringify(data), { status: 200 });
      }),
    );
    const res = await fetchAllOrganizations();
    expect( res.length ).toBe(2);
  });

  it('unauthorization fetch data', async () => {
    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );
    window = Object.create(window);
    const url = "http://localhost:3000/";
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      },
      writable: true // possibility to override
    });
    await fetchAllOrganizations();
    expect( window.location.href ).toMatch(/logout/i);
  });
  
  it('throw error', async () => {
    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(null, { status: 400 });
      }),
    );
    expect( fetchAllOrganizations() ).rejects.toThrowError()
  });
});