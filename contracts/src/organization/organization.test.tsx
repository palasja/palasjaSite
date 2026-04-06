import { renderWithProviders } from '../auth/renderWithProviders';
import Organization from './organization';
import OrganizationForm from './organizationForm';
import { store as setupStore } from '../redux/store';
import { changingOrg } from '../redux/slices/orgsSlice';
import { act, fireEvent, screen } from '@testing-library/react';
import * as slice from '../redux/slices/orgsSlice';
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

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('organization form', () => {
  it('error when name is empty', async () => {
    renderWithProviders(<OrganizationForm />);

    expect(screen.getByTestId('submit')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('submit'));
    });
    expect(screen.queryByTestId('id')).not.toBeInTheDocument();
    expect(await screen.findByText(/Наименование должно быть заполнено/i)).toBeInTheDocument();
  });

  it('name in form if change ogranization', () => {
    const store = setupStore();
    store.dispatch(changingOrg({ id: 0, name: 'testOrg' }));

    renderWithProviders(<OrganizationForm />, { store });
    expect(screen.queryByTestId('id')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testOrg')).toBeInTheDocument();
  });
});

describe('dispatch organization ', () => {
  it('call change organisation', async () => {
    const spyChangingOrg = vi.spyOn(slice, 'changingOrg');

    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(JSON.stringify([{ id: 1, name: 'testOrg' }]), { status: 200 });
      })
    );

    renderWithProviders(<Organization />, {
      preloadedState: {
        orgs: {
          chosenOrg: null,
          changingOrg: null,
          error: null,
          status: 'idle',
          chosenInfo: null,
          chosenAction: null,
        },
      },
    });
    await delay(100);
    act(() => {
      fireEvent.click(screen.getByTestId('rename'));
    });
    expect(await screen.findByDisplayValue('testOrg')).toBeInTheDocument();
    expect(spyChangingOrg).toBeCalled();
  });

  it('approve modal window on delete organisation', async () => {
    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(JSON.stringify([{ id: 1, name: 'testOrg' }]), { status: 200 });
      })
    );

    renderWithProviders(<Organization />, {
      preloadedState: {
        orgs: {
          chosenOrg: null,
          changingOrg: null,
          error: null,
          status: 'idle',
          chosenInfo: null,
          chosenAction: null,
        },
      },
    });
    await delay(100);
    act(() => {
      fireEvent.click(screen.getByTestId('delete'));
    });
    expect(screen.getByText('Вы действительно хотитет удалить')).toBeInTheDocument();
  });
});

describe('show organisation', () => {
  it('without organisation', async () => {
    renderWithProviders(<Organization />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(await screen.findByText(/Список организаций не загружен или пуст/i)).toBeInTheDocument();
  });

  it('two organisations', async () => {
    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(
          JSON.stringify([
            { id: 1, name: 'testOrg' },
            { id: 2, name: 'testOrg1' },
          ]),
          { status: 200 }
        );
      })
    );

    renderWithProviders(<Organization />, {
      preloadedState: {
        orgs: {
          chosenOrg: null,
          changingOrg: null,
          error: null,
          status: 'idle',
          chosenInfo: null,
          chosenAction: null,
        },
      },
    });
    expect(await screen.findAllByTestId('orgBtn')).toHaveLength(3);
  });
});
