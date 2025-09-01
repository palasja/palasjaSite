// import { renderWithProviders } from '../auth/renderWithProviders';
// import Organization from './organization';
// import OrganizationForm from './organizationForm';
// import { store as setupStore } from '../redux/store';
// import { changingOrg } from '../redux/slices/orgsSlice';
// import { act, fireEvent, screen } from '@testing-library/react';
// import * as slice from '../redux/slices/orgsSlice';

// describe('organization form', () => {
//   // it('', () =>{
//   //   const spyChangingOrg = vi.spyOn(slice, 'addOrg');
//   //   renderWithProviders(<OrganizationForm />);
//   //   fireEvent.change(screen.getByTestId("name"), {target: {value: 'testOrg'}});
//   //   expect(screen.getByDisplayValue("testOrg")).toBeInTheDocument();
//   //   act(() => fireEvent.submit(screen.getByTestId("submit")));

//   //   screen.debug();
//   //   expect(spyChangingOrg).toBeCalled();
//   // })

//   it('error when name is empty', async () => {
//     renderWithProviders(<OrganizationForm />);

//     expect(screen.getByTestId('submit')).toBeInTheDocument();
//     fireEvent.click(screen.getByTestId('submit'));
//     expect(screen.queryByTestId('id')).not.toBeInTheDocument();
//     expect(await screen.findByText(/Наименование должно быть заполнено/i)).toBeInTheDocument();
//   });

//   it('name in form if change ogranization', () => {
//     const store = setupStore();
//     store.dispatch(changingOrg({ id: 0, name: 'testOrg' }));

//     renderWithProviders(<OrganizationForm />, { store });
//     expect(screen.queryByTestId('id')).toBeInTheDocument();
//     expect(screen.getByDisplayValue('testOrg')).toBeInTheDocument();
//   });
// });

// describe('dispatch organization ', () => {
//   it('call change organisation', () => {
//     const spyChangingOrg = vi.spyOn(slice, 'changingOrg');
//     renderWithProviders(<Organization />, {
//       preloadedState: {
//         orgs: {
//           organizations: [{ id: 1, name: 'testOrg' }],
//           chosenOrg: null,
//           changingOrg: null,
//           error: null,
//           status: 'idle',
//         },
//       },
//     });

//     act(() => fireEvent.click(screen.getAllByText('Переименовать')[0]));
//     expect(screen.getByDisplayValue('testOrg')).toBeInTheDocument();
//     expect(spyChangingOrg).toBeCalled();
//   });

//   it('call delete organisation', () => {
//     renderWithProviders(<Organization />, {
//       preloadedState: {
//         orgs: {
//           organizations: [{ id: 1, name: 'testOrg' }],
//           chosenOrg: null,
//           changingOrg: null,
//           error: null,
//           status: 'idle',
//         },
//       },
//     });

//     fireEvent.click(screen.getAllByText('Удалить')[0]);
//     expect(screen.getByText('Вы действительно хотитет удалить')).toBeInTheDocument();
//   });
// });

// describe('show organisation', () => {
//   it('without organisation', () => {
//     renderWithProviders(<Organization />);

//     expect(screen.queryByRole('list')).not.toBeInTheDocument();
//     expect(screen.getByText('Список организаций не загружен')).toBeInTheDocument();
//   });

//   it('two organisations', () => {
//     renderWithProviders(<Organization />, {
//       preloadedState: {
//         orgs: {
//           organizations: [
//             { id: 1, name: 'testOrg' },
//             { id: 2, name: 'testOrg1' },
//           ],
//           chosenOrg: null,
//           changingOrg: null,
//           error: null,
//           status: 'idle',
//         },
//       },
//     });

//     expect(screen.getAllByRole('listitem')).toHaveLength(2);
//   });
// });
