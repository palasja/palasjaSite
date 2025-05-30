import style from './closeBtn.module.css';
type CloseBtnProps = { className?: string | null; click?: () => void };
const CloseBtn = ({ className, click }: CloseBtnProps) => {
  return <div className={`${style.closeBtn} ${className}`} onClick={click}></div>;
};

export default CloseBtn;
