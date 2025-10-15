import { act, fireEvent, screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../auth/renderWithProviders';
import { MemoryRouter } from 'react-router';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [];
const env = import.meta.env;
const server = setupServer(...handlers);

describe('app test switch service with or without org ', () => {
  it('services without organization', async () => {
    renderWithProviders(<App />);
    act(() => {
      fireEvent.click(screen.getByTestId('withoutOrg'));
    });
    await delay(100);
    expect(screen.getByRole('heading', { level: 3 }).innerHTML === 'Услуги ').toBeTruthy();
  });

  it('services with organization', async () => {
    renderWithProviders(<App />);
    act(() => {
      fireEvent.click(screen.getByTestId('includeOrg'));
    });
    await delay(100);
    expect(screen.getByRole('heading', { level: 3 }).innerHTML === 'Организации').toBeTruthy();
  });
});

describe('', () => {
  it('choosen organization undefined case', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/contract']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText('Выберите организацию')).toBeInTheDocument();
  });

  it('choosen organization exist', async () => {
    const mockOrg = {
      id: 1,
      name: 'testOrg',
    };

    server.use(
      http.get(`${env.VITE_API_SERVER_URL_DEV}/getOrganizations`, () => {
        return new HttpResponse(JSON.stringify([mockOrg]), { status: 200 });
      })
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/contract']}>
        <App />
      </MemoryRouter>,
      {
        preloadedState: {
          orgs: {
            chosenOrg: mockOrg,
            changingOrg: null,
            status: 'idle',
            error: null,
          },
        },
      }
    );
    await delay(100);
    expect(screen.queryByText('Выберите организацию')).not.toBeInTheDocument();
    expect(screen.getAllByText(/testOrg/i).length).greaterThan(0);
  });
});
