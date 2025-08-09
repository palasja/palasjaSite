import { renderWithProviders } from '../auth/renderWithProviders';
import { Contract, Organization, Personal, Service } from '../helpers/contractTypes';
import Act from './act';
import * as orgSlice from '../redux/slices/orgsSlice';
import * as serviceSlice from '../redux/slices/servicesSlice';
import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import ActZKH from './act_ZKH';
const mockOrgs: Organization[] = [
  { id: 1, name: 'testOrg1' },
  { id: 2, name: 'ЖКХ' },
  { id: 3, name: 'testOrg' },
];
const mockContract1: Contract = {
  id: 1,
  number: 'testContrackt1',
  signDate: new Date('2025-05-01'),
  startDate: new Date('2025-04-01'),
  endDate: new Date('2025-06-30'),
  scan: new Blob(),
  orgId: '1',
};
const mockContract2: Contract = {
  id: 2,
  number: 'testContrackt2',
  signDate: new Date('2025-05-01'),
  startDate: new Date('2025-04-01'),
  endDate: new Date('2025-06-30'),
  scan: new Blob(),
  orgId: '2',
};

const mockPerson1: Personal[] = [
  {
    id: 3,
    lastName: 'LastNameTest3',
    middleName: 'MiddleNameTest3',
    firstName: 'FirstNameTest3',
    positionName: 'HeadTest3',
    isHead: true,
    orgId: '1',
  },
  {
    id: 4,
    lastName: 'LastNameTest4',
    middleName: 'MiddleNameTest4',
    firstName: 'FirstNameTest4',
    positionName: 'WorkerTest4',
    isHead: false,
    orgId: '1',
  },
  {
    id: 5,
    lastName: 'LastNameTest5',
    middleName: 'MiddleNameTest5',
    firstName: 'FirstNameTest5',
    positionName: 'бухгалтерTest5',
    isHead: false,
    orgId: '1',
  },
];
const mockPerson2: Personal[] = [
  {
    id: 1,
    lastName: 'LastNameTest1',
    middleName: 'MiddleNameTest1',
    firstName: 'FirstNameTest1',
    positionName: 'HeadTest1',
    isHead: true,
    orgId: '2',
  },
  {
    id: 2,
    lastName: 'LastNameTest2',
    middleName: 'MiddleNameTest2',
    firstName: 'FirstNameTest2',
    positionName: 'WorkerTest1',
    isHead: false,
    orgId: '2',
  },
];
const services1: Service[] = [
  {
    id: 1,
    name: 's1',
    date: new Date('2025-05-05'),
    user: 'test',
    place: 'test',
    cost: 10,
    count: 1,
  },
  {
    id: 2,
    name: 's2',
    date: new Date('2025-05-05'),
    user: 'test',
    place: 'test',
    cost: 10,
    count: 1,
  },
  {
    id: 3,
    name: 's3',
    date: new Date('2025-05-05'),
    user: 'test',
    place: 'test',
    cost: 10,
    count: 1,
  },
  {
    id: 4,
    name: 's4',
    date: new Date('2025-05-05'),
    user: 'test',
    place: 'test',
    cost: 10,
    count: 1,
  },
  {
    id: 5,
    name: 's5',
    date: new Date('2025-05-05'),
    user: 'test',
    place: 'test',
    cost: 10,
    count: 1,
  },
  {
    id: 6,
    name: 's6',
    date: new Date('2025-05-05'),
    user: 'test',
    place: 'test',
    cost: 10,
    count: 1,
  },
];

describe('act load data', () => {
  it('empty organization in store', async () => {
    // server.use(
    //   http.post(`${env.VITE_API_SERVER}/logIn`, () => {
    //     return new HttpResponse(null, { status: 403 });
    //   })
    // );
    const mock = vi.spyOn(orgSlice, 'fetchOrgs');
    renderWithProviders(<Act />);
    expect(mock).toBeCalled();
    // fireEvent.change(screen.getByTestId('login'), { target: { value: 'qwe' } });
    // fireEvent.change(screen.getByTestId('pass'), { target: { value: 'qwe' } });
    // fireEvent.submit(screen.getByTestId('submit'));
    // expect(await screen.findByText(/Неверный логин или пароль/i)).toBeInTheDocument();
  });
  it('take organizations from store', () => {
    const mock = vi.spyOn(orgSlice, 'fetchOrgs');
    renderWithProviders(<Act />, {
      preloadedState: {
        orgs: {
          organizations: mockOrgs,
          chosenOrg: null,
          changingOrg: null,
          error: null,
          status: 'idle',
        },
      },
    });
    expect(mock).not.toBeCalled();
  });
});

describe('act selected', async () => {
  it('month change call dispatch', () => {
    const mock = vi.spyOn(serviceSlice, 'chooseMonth');
    renderWithProviders(<Act />);
    fireEvent.change(screen.getByTestId('monthSelect'), { target: { value: 5 } });
    expect(mock).toBeCalled();
  });

  it('organization change call dispatch', () => {
    const mock = vi.spyOn(orgSlice, 'chooseOrg');
    renderWithProviders(<Act />, {
      preloadedState: {
        orgs: {
          organizations: mockOrgs,
          chosenOrg: null,
          changingOrg: null,
          error: null,
          status: 'idle',
        },
      },
    });
    fireEvent.change(screen.getByTestId('orgSelect'), { target: { value: 2 } });
    expect(mock).toBeCalled();
  });
});

describe('act conditional rendering', async () => {
  // it('month change call dispatch', () => {
  //   const mock = vi.spyOn(serviceSlice, 'chooseMonth');
  //   renderWithProviders(
  //       <Act />
  //   );
  //   fireEvent.change(screen.getByTestId('monthSelect'), { target: { value: 5 } })
  //   expect( mock ).toBeCalled();

  // });

  it('organization change call dispatch', () => {
    vi.mock('./act_ZKH', () => ({
      default: () => <div>mockZKH</div>,
    }));
    renderWithProviders(<Act />, {
      preloadedState: {
        orgs: {
          organizations: mockOrgs,
          chosenOrg: null,
          changingOrg: null,
          error: null,
          status: 'idle',
        },
      },
    });
    fireEvent.change(screen.getByTestId('orgSelect'), { target: { value: 2 } });
    expect(screen.getByText(/mockZKH/i)).toBeInTheDocument();
  });
});
