import { renderWithProviders } from '../../auth/renderWithProviders';
import { screen } from '@testing-library/react';
import ActZKH from './actZKH';
import { COUNT_FOR_ONE_PAGE } from '../../helpers/constants';
import { Contract, Personal, Service } from '../../helpers/contractTypes';

describe('pages count', () => {
  it('one page when less 19 services', () => {
    const date = new Date('01-01-2025');
    const services = [...new Array(COUNT_FOR_ONE_PAGE)].map(
      (_e, i) =>
        ({
          id: i,
          name: '',
          date: date,
          user: '',
          place: '',
          cost: 1,
          count: 1,
        }) as Service
    );
    const personals: Personal[] = [
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
    ];
    const contract = {
      id: 0,
      number: '1',
      signDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      scan: new Blob(),
      orgId: '',
    } as Contract;
    renderWithProviders(
      <ActZKH
        contract={contract}
        personal={personals}
        services={services}
        signDate={date}
        startDate={date}
        endDate={date}
      />,
      {
        preloadedState: {
          services: {
            choosenMonth: '1',
            choosenYear: '2025',
            isWithoutOrg: false,
          },
        },
      }
    );

    expect(screen.getAllByTestId('page').length).toBe(1);
  });

  it('two page when more 19 services', () => {
    const date = new Date('01-01-2025');
    const services = [...new Array(COUNT_FOR_ONE_PAGE + 1)].map(
      (_e, i) =>
        ({
          id: i,
          name: '',
          date: date,
          user: '',
          place: '',
          cost: 1,
          count: 1,
        }) as Service
    );
    const personals: Personal[] = [
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
    ];
    const contract = {
      id: 0,
      number: '1',
      signDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      scan: new Blob(),
      orgId: '',
    } as Contract;
    renderWithProviders(
      <ActZKH
        contract={contract}
        personal={personals}
        services={services}
        signDate={date}
        startDate={date}
        endDate={date}
      />,
      {
        preloadedState: {
          services: {
            choosenMonth: '1',
            choosenYear: '2025',
            isWithoutOrg: false,
          },
        },
      }
    );

    expect(screen.getAllByTestId('page').length).toBe(1);
  });
});
