import './modalConent.css';

type ModalContentProps = {
  content: JSX.Element;
  bgColor?: string;
  onClose: () => void;
};

const ModalContent = ({ content, bgColor, onClose }: ModalContentProps) => {
  return (
    <>
      <div
        className="modal"
        onClick={() => {
          onClose();
        }}
        data-testid="overlay"
      ></div>
      <div className="modal_content" style={bgColor ? { backgroundColor: bgColor } : {}}>
        <div className="close" onClick={onClose} data-testid="close_modal"></div>
        {content}
      </div>
    </>
  );
};

export default ModalContent;
