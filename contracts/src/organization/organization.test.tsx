import { renderWithProviders } from '../auth/renderWithProviders';
import Organization from './organization';
import OrganizationForm from './organizationForm';
import { store as setupStore } from '../redux/store';
import { addOrg, changingOrg } from '../redux/slices/orgsSlice';
import { act, fireEvent, screen } from '@testing-library/react';

describe('organization form', () => {
  it('error when name is empty', async () => {
    renderWithProviders(<OrganizationForm />);

    expect(screen.getByTestId('submit')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('submit'));
    expect(screen.queryByTestId('id')).not.toBeInTheDocument();
    expect(await screen.findByText(/Наименование должно быть заполнено/i)).toBeInTheDocument();
  });

  it('name in form if change ograbization', () => {
    const store = setupStore();
    store.dispatch(changingOrg({ id: 0, name: 'testOrg' }));

    renderWithProviders(<OrganizationForm />, { store });
    expect(screen.queryByTestId('id')).toBeInTheDocument();
    expect(screen.getByDisplayValue('testOrg')).toBeInTheDocument();
  });
});

// describe('dispatch organization form ', () => {
//   it('new organisation', async () =>{
//     const mockAdd = vi.fn(addOrg)
//     const a = vi.fn().mock("./organizationForm", onSubmitCreate)
//     renderWithProviders( <OrganizationForm />);
//     act(async () => {
//           fireEvent.change(await screen.findByTestId('name'), {target:{ value: 'testOrg'}});
//     fireEvent.click(await screen.findByTestId('submit'));
//     });

//     screen.debug();
//     expect(mockAdd).toHaveBeenCalled();
//     // fireEvent.click(screen.getByTestId('submit'));
//     // expect(screen.queryByTestId('id')).not.toBeInTheDocument();
//     // expect(await screen.findByText(/Наименование должно быть заполнено/i)).toBeInTheDocument();
//   })

//   // it('change organisation',  () =>{
//   //   const store = setupStore()
//   //   store.dispatch(changingOrg({id: 0, name: "testOrg"}));

//   //   renderWithProviders( <OrganizationForm />, {store});
//   //   expect(screen.queryByTestId('id')).toBeInTheDocument();
//   //   expect(screen.getByDisplayValue('testOrg')).toBeInTheDocument();

//   //  })
// })
