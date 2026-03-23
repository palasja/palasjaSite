import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { renderWithProviders } from '../auth/renderWithProviders';
import Error404 from './404';

describe("error message", () => {
    it("show error message", async () => {
        
    renderWithProviders(
      <MemoryRouter initialEntries={['logout','/']}>
        <Error404 />
      </MemoryRouter>
    );

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    })
})