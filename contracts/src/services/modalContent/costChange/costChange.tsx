import { createPortal } from 'react-dom';
import { useAppSelector } from '../../../redux/hooks';
import { getServiceCostChange } from '../../../redux/slices/servicesSlice';
import style from './costChange.module.css';
import senyaLoginImg from '../../../assets/senya_face_s.png';
import palasjaLoginImg from '../../../assets/palasja_face_s.png';

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
              {costChange.map((ch, key) => (
                <div key={key}>
                  <div className={style.costChangeRow}>
                    <div className={style.userImage}>
                      <img src={ch.user === 'palasja' ? palasjaLoginImg : senyaLoginImg} />
                    </div>
                    {new Date(ch.date).toISOString().replace('T', ' ').substring(0, 19)}
                  </div>
                  <span>&#8593;</span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default CostChange;
