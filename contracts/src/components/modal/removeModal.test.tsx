import { fireEvent, render, screen } from "@testing-library/react"
import RemoveModal from "./removeModal"

describe('removeModal', () => {
  it('remove close by byttons', () => {
    const mockRemove = vi.fn().mockImplementation(() => {}) ;
    const mockClose = vi.fn().mockImplementation(() => {}) ;
    render(<RemoveModal remove={mockRemove}  close={mockClose}/>)
    fireEvent.click(screen.getByTestId('close'));
    expect(mockClose).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByTestId('remove'));
    expect(mockRemove).toHaveBeenCalledOnce();
  })

  it('remove close by byttons', () => {
    const mockClose = vi.fn().mockImplementation(() => {}) ;
    render(<RemoveModal remove={()=>{}}  close={mockClose}/>)
    fireEvent.click(screen.getByTestId('removeModal'));
    expect(mockClose).toHaveBeenCalledOnce();
  })
})