import style from './closeBtn.module.css';
type CloseBtnProps = { className?: string | null };
const CloseBtn = ({ className }: CloseBtnProps) => {
  return <div className={`${style.closeBtn} ${className}`}></div>;
};

export default CloseBtn;
