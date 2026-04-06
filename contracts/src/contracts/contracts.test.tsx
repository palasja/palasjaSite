import { act, fireEvent, screen } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { env } from 'process';
import { MemoryRouter, Route, Routes } from 'react-router';
import { setupServer } from 'msw/node';
import Contracts from './contracts';
import { renderWithProviders } from '../auth/renderWithProviders';
import { Contract, Organization } from '../helpers/contractTypes';
import fetchPolyfill, { Request as RequestPolyfill } from 'node-fetch';
import * as slice from '../redux/slices/orgsSlice';

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

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests
const testOrg: Organization = { id: 0, name: 'Test' };
const testContract: Contract = {
  id: 0,
  number: '11111',
  signDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  scan: new Blob(),
  orgId: '0',
};
describe('check show / add / change', () => {
  it('show table', async () => {
    server.use(
      http.post(`${env.VITE_API_SERVER_URL_DEV}/getContractsByOrg/${testOrg.id}`, () => {
        return new HttpResponse(JSON.stringify(testContract), { status: 200 });
      })
    );
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Contracts />
      </MemoryRouter>,
      {
        preloadedState: {
          orgs: {
            chosenOrg: testOrg,
            changingOrg: null,
            error: null,
            status: 'idle',
            chosenInfo: null,
            chosenAction: 'show',
          },
        },
      }
    );
    expect((await screen.findAllByRole('table')).length).toBe(1);
  });
  it('add caontract', async () => {
    const spyChoseAct = vi.spyOn(slice, 'choseAct');
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Contracts />
      </MemoryRouter>,
      {
        preloadedState: {
          orgs: {
            chosenOrg: testOrg,
            changingOrg: null,
            error: null,
            status: 'idle',
            chosenInfo: null,
            chosenAction: 'show',
          },
        },
      }
    );
    expect(await screen.findByTestId('addContract')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('addContract'));
    });

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('contractForm')).toBeInTheDocument();
    expect(spyChoseAct).toBeCalled();
  });

  // it("change caontract", async () => {
  //     server.use(
  //         http.post(`${env.VITE_API_SERVER_URL_DEV}/getContractsByOrg/${testOrg.id}`, () => {
  //             return new HttpResponse(JSON.stringify(testContract), { status: 200});
  //         })
  //     );
  //     renderWithProviders(
  //     <MemoryRouter initialEntries={['/']}>
  //         <Contracts />
  //     </MemoryRouter>, {
  //         preloadedState: {
  //             orgs:{
  //                 chosenOrg: testOrg,
  //                 changingOrg: null,
  //                 error: null,
  //                 status: 'idle',
  //                 chosenInfo: null,
  //                 chosenAction: 'show'
  //             }
  //         }
  //     }
  //     );
  //     // fireEvent.click(await screen.findByTestId('changeContract'));
  //     screen.debug();
  //     expect((await screen.findByTestId('changeContract'))).toBeInTheDocument();
  //     // expect((await screen.findAllByTestId(/changeContract/i)).length).toBe(1);
  // })
});
