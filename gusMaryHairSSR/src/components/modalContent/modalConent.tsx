import { useEffect } from 'react';
import './modalConent.css';

type ModalContentProps = {
  content: JSX.Element;
  bgColor?: string;
  showCloseBtn?: boolean;
  onClose?: () => void;
};

const ModalContent = ({ content, bgColor, showCloseBtn = true, onClose }: ModalContentProps) => {
  useEffect(() => {
    document.body.classList.add('lockScroll');
    return () => document.body.classList.remove('lockScroll');
  }, []);
  return (
    <>
      <div
        className="modal"
        onClick={onClose ? () => onClose() : undefined}
        data-testid="overlay"
      ></div>
      <div className="modal_content" style={bgColor ? { backgroundColor: bgColor } : {}}>
        {showCloseBtn ? (
          <div className="close" onClick={onClose} data-testid="close_modal"></div>
        ) : undefined}
        {content}
      </div>
    </>
  );
};

export default ModalContent;
