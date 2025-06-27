import { render, screen } from "@testing-library/react"
import Footer from "./footer"

describe('footer no print', () => {
  it('footer has no print class', () =>{
    render(<Footer />);
    expect(screen.queryByTestId('footer')?.classList.contains('noprint')).toBeTruthy();
  })
})