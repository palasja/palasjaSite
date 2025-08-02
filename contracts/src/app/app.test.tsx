import { fireEvent, render, RenderOptions, screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../auth/renderWithProviders';
import { Organization } from '../helpers/contractTypes';
import { AppStore, RootState, store } from '../redux/store';
import { addOrg, changingOrg } from '../redux/slices/orgsSlice';
import { MemoryRouter } from 'react-router';

describe('app test switch service with or without org ', () => {
  it('services without organization', () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByTestId('withoutOrg'));
    expect(screen.getByText('Услуги')).toBeInTheDocument();
    expect(screen.queryByText('Организации')).not.toBeInTheDocument();
  });

  it('services with organization', () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByTestId('includeOrg'));
    expect(screen.queryByText('Организации')).toBeInTheDocument();
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

  it('choosen organization exist', () => {
    const mockOrg = {
      id: 1,
      name: 'testOrg',
    };
 
    renderWithProviders(
      <MemoryRouter initialEntries={['/contract']}>
        <App />
      </MemoryRouter>,
      { preloadedState: { orgs: {
      organizations: [mockOrg],
      chosenOrg: mockOrg,
      changingOrg: null,
      status: "idle",
      error: null,
    },  } }
    );

    expect(screen.queryByText('Выберите организацию')).not.toBeInTheDocument();
    expect(screen.getAllByText('testOrg').length).greaterThan(0);
  });
});
