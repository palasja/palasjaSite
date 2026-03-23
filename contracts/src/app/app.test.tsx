import { act, fireEvent, screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../auth/renderWithProviders';
import { MemoryRouter } from 'react-router';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import fetchPolyfill, { Request as RequestPolyfill } from 'node-fetch';

Object.defineProperty(global, 'fetch', {
  // MSW will overwrite this to intercept requests
  writable: true,
  value: fetchPolyfill,
});

Object.defineProperty(global, 'Request', {
  writable: false,
  value: RequestPolyfill,
});

export const handlers = [];
const env = import.meta.env;
const server = setupServer(...handlers);


describe('show choose org message', () => {
  it('show if no choosen org', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/contract']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText('Выберите организацию')).toBeInTheDocument();
  });

    it('show if org choose', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/contract']}>
        <App />
      </MemoryRouter>, {
        preloadedState:{
            orgs:{
                chosenOrg: {id: 1,name: 'testOrg'},
                changingOrg: null,
                error: null,
                status: 'idle',
                chosenInfo: null,
                chosenAction: null
            }
        }
      }
    );

    expect(screen.queryByText('Выберите организацию')).not.toBeInTheDocument();
  });
});

describe("check info value has correct view", () => {
  const server = setupServer(...handlers);
  
  // Enable API mocking before tests.
  beforeAll(() => server.listen());
  
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());
  
  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  const testOrg = { id: 0, name: 'testOrg' };

  it("is service", () => {
    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(JSON.stringify([testOrg]), { status: 200 });
      })
    );

     renderWithProviders(<App />, {
      preloadedState: {
        orgs: {
            chosenOrg: testOrg,
            changingOrg: null,
            error: null,
            status: 'idle',
            chosenInfo: 'service',
            chosenAction: null
        },
      },
    });

    expect(screen.getByText(/Услуги/i)).toBeInTheDocument();
  })
  it("is contract", async () => {
    server.use(
          http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
            return new HttpResponse(JSON.stringify([testOrg]), { status: 200 });
          })
        );

     renderWithProviders(<App />, {
      preloadedState: {
        orgs: {
            chosenOrg: testOrg,
            changingOrg: null,
            error: null,
            status: 'idle',
            chosenInfo: 'contract',
            chosenAction: null
        },
      },
    });

    expect(await screen.findByText(/Договора/i)).toBeInTheDocument();
  })
 it("is personal", async () => {
    server.use(
          http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
            return new HttpResponse(JSON.stringify([testOrg]), { status: 200 });
          })
        );

     renderWithProviders(<App />, {
      preloadedState: {
        orgs: {
            chosenOrg: testOrg,
            changingOrg: null,
            error: null,
            status: 'idle',
            chosenInfo: 'personal',
            chosenAction: null
        },
      },
    });

    expect(await screen.findByText(/Personal/i)).toBeInTheDocument();
  })
   it("is personal", async () => {
    server.use(
          http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
            return new HttpResponse(JSON.stringify([testOrg]), { status: 200 });
          })
        );

     renderWithProviders(<App />, {
      preloadedState: {
        orgs: {
            chosenOrg: testOrg,
            changingOrg: null,
            error: null,
            status: 'idle',
            chosenInfo: 'act',
            chosenAction: null
        },
      },
    });

    expect(await screen.findByText(/testOrg/i)).toBeInTheDocument();
  })
})
