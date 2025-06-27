import { render, screen } from "@testing-library/react"
import Header from "./header";
import { MemoryRouter } from "react-router";

beforeEach(() => {
    render(     
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>
    );
})

describe('header no print', () => {
  it('header has no print class', () =>{
    expect(screen.queryByTestId('header')?.classList.contains('noprint')).toBeTruthy();
  })
})

describe('header has all links', () => {

  it('header has 2 link', () =>{
    expect(screen.queryAllByRole('link').length).toBe(2);
  })
  it('header has 2 link', () =>{
      expect(screen.queryAllByRole('link')[0]).toHaveAttribute('href', '/contract');
      expect(screen.queryAllByRole('link')[1]).toHaveAttribute('href', '/act');
  })
})