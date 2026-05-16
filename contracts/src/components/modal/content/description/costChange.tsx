import { createPortal } from "react-dom";
import { useAppSelector } from "../../../../redux/hooks";
import { getFullDesc, getServiceCostChange } from "../../../../redux/slices/servicesSlice";
import style from './costChange.module.css';
import { ServiceCostChange } from "../../../../helpers/contractTypes";

type RemoveModalType = {
  close: (e: React.MouseEvent<HTMLElement>) => void;
};
const CostChange = ({ close }: RemoveModalType) => {
  const costChange = useAppSelector(getServiceCostChange);
  return (
    <>
      {createPortal(
        <div className={style.back} onClick={(e) => close(e)} data-testid="removeModal">
          <div className={style.main}>
            <div className={style.desc}>
                {costChange.map((ch, key) => <div key={key}>
                <p >{ch.user} - {ch.newCost} - {new Date(ch.date).toISOString().replace('T', ' ').substring(0, 19)}</p>
                <span >&#8593;</span>
                </div>)}
            </div>
          </div>
        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default CostChange