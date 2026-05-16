import { createPortal } from "react-dom";
import { useAppSelector } from "../../../../redux/hooks";
import { getFullDesc } from "../../../../redux/slices/servicesSlice";
import style from './description.module.css';

type RemoveModalType = {
  close: (e: React.MouseEvent<HTMLElement>) => void;
};
const Description = ({ close }: RemoveModalType) => {
  const fullDesc = useAppSelector(getFullDesc);
  return (
    <>
      {createPortal(
        <div className={style.back} onClick={(e) => close(e)} data-testid="removeModal">
          <div className={style.main}>
            <div className={style.desc}>{fullDesc}</div>
          </div>
        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default Description