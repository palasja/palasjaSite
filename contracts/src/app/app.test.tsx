import { act, fireEvent, screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../auth/renderWithProviders';
import { MemoryRouter } from 'react-router';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

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
