import { renderWithProviders } from '../../auth/renderWithProviders';
import { screen } from '@testing-library/react';
import ActPMS from './actPMS';
import { COUNT_FOR_ONE_PAGE } from '../../helpers/constants';
import { Contract, Personal, Service } from '../../helpers/contractTypes';
import * as helper from './../../helpers/helper';
describe('act PMS', () => {
  it('call NDS 47 law', () => {
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
      {
        id: 3,
        lastName: 'c',
        middleName: 'c',
        firstName: 'c',
        positionName: 'c',
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
      orgId: '1',
    } as Contract;

    const spyNDS47 = vi.spyOn(helper, 'getServicesCostWithNDS_47');

    renderWithProviders(<ActPMS contract={contract} personal={personals} services={services} />, {
      preloadedState: {
        orgs: {
          chosenOrg: { id: 1, name: 'testOrg' },
          changingOrg: null,
          error: null,
          status: 'idle',
          chosenInfo: null,
          chosenAction: null,
        },
        services: {
          choosenMonth: '1',
          isWithoutOrg: false,
          choosenYear: '',
          fullDesc: '',
          serviceCostChange: [],
        },
      },
    });

    expect(spyNDS47).toBeCalled();
  });

  it('all persons on act', () => {
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
      {
        id: 3,
        lastName: 'c',
        middleName: 'c',
        firstName: 'c',
        positionName: 'c',
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
      orgId: '1',
    } as Contract;

    renderWithProviders(<ActPMS contract={contract} personal={personals} services={services} />, {
      preloadedState: {
        orgs: {
          chosenOrg: { id: 1, name: 'testOrg' },
          changingOrg: null,
          error: null,
          status: 'idle',
          chosenInfo: null,
          chosenAction: null,
        },
        services: {
          choosenMonth: '1',
          isWithoutOrg: false,
          choosenYear: '',
          fullDesc: '',
          serviceCostChange: [],
        },
      },
    });

    expect(screen.getByText(/a. a. a/i)).toBeInTheDocument();
    expect(screen.getByText(/b. b. b/i)).toBeInTheDocument();
    expect(screen.getByText(/c. c. c/i)).toBeInTheDocument();
  });
});
