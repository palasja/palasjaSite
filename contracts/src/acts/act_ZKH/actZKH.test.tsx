import { renderWithProviders } from '../../auth/renderWithProviders';
import { screen } from '@testing-library/react';
import ActZKH from './actZKH';
import { COUNT_FOR_ONE_PAGE } from '../../helpers/constants';

describe('pages count', () => {
  it('one page when less 19 services', () => {
    renderWithProviders(<ActZKH />, {
      preloadedState: {
        services: {
          services: [...new Array(COUNT_FOR_ONE_PAGE)].map((_e, i) => ({
            id: i,
            name: '',
            date: new Date(),
            user: '',
            place: '',
            cost: 1,
            count: 1,
          })),
          choosenMonth: '',
          isWithoutOrg: false,
          changingService: null,
          status: 'idle',
        },
        personals: {
          personals: [
            {
              id: 1,
              lastName: 'a',
              middleName: 'a',
              firstName: 'a',
              positionName: 'a',
              isHead: false,
              orgId: '1',
            },
            {
              id: 2,
              lastName: 'b',
              middleName: 'b',
              firstName: 'b',
              positionName: 'b',
              isHead: true,
              orgId: '1',
            },
          ],
          changingPersonal: null,
          status: 'idle',
        },
        contract: {
          contracts: [],
          chosenContract: {
            id: 0,
            number: '1',
            signDate: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            scan: new Blob(),
            orgId: '',
          },
          changingContract: null,
          status: 'idle',
        },
      },
    });

    expect(screen.getAllByTestId('page').length).toBe(1);
  });

  it('two page when more 19 services', () => {
    renderWithProviders(<ActZKH />, {
      preloadedState: {
        services: {
          services: [...new Array(COUNT_FOR_ONE_PAGE + 1)].map((_e, i) => ({
            id: i,
            name: '',
            date: new Date(),
            user: '',
            place: '',
            cost: 1,
            count: 1,
          })),
          choosenMonth: '',
          isWithoutOrg: false,
          changingService: null,
          status: 'idle',
        },
        personals: {
          personals: [
            {
              id: 1,
              lastName: 'a',
              middleName: 'a',
              firstName: 'a',
              positionName: 'a',
              isHead: false,
              orgId: '1',
            },
            {
              id: 2,
              lastName: 'b',
              middleName: 'b',
              firstName: 'b',
              positionName: 'b',
              isHead: true,
              orgId: '1',
            },
          ],
          changingPersonal: null,
          status: 'idle',
        },
        contract: {
          contracts: [],
          chosenContract: {
            id: 0,
            number: '1',
            signDate: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            scan: new Blob(),
            orgId: '',
          },
          changingContract: null,
          status: 'idle',
        },
      },
    });

    expect(screen.getAllByTestId('page').length).toBe(1);
  });
});
