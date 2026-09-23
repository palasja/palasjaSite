import { createPortal } from 'react-dom';

import style from './description.module.css';
import { useAppSelector } from '../../../redux/hooks';
import { Carousel } from 'nuka-carousel';
import { Service } from '../../../helpers/contractTypes';
import { useUpdateServiceMutation } from '../../../redux/slices/servicesRTKSlice';
import { useEffect, useState } from 'react';
import { getChoosenServiceId } from '../../../redux/slices/servicesSlice';
type RemoveModalType = {
  close: (e: React.MouseEvent<HTMLElement>) => void;
  services: Service[]
};
const Description = ({ services, close }: RemoveModalType) => {
  const choosenServiceId = useAppSelector(getChoosenServiceId);
  const [updateService] = useUpdateServiceMutation();

  const [serviceId, setServiceId] = useState(services?.findIndex(s => s.id === choosenServiceId) as number);
  const [newCost, setNewCost] = useState(services[serviceId].cost);
  const changeCost = () => {
    if (services) {
      const changedService = { ...services[serviceId], cost: newCost };
      updateService(changedService);
    }
  }

  useEffect(() => {
    setNewCost(services[serviceId].cost);
  }, [serviceId])

  return (
    <>
      {createPortal(
        <div className={style.back} onClick={(e) => close(e)} data-testid="removeModal">
          <div className={style.main}>
            <div className={style.carouselContailner} onClick={(e) => { e.stopPropagation(); e.preventDefault() }}>
              <Carousel showArrows={true} initialPage={services?.findIndex(s => s.id === choosenServiceId)} afterSlide={(endSlideIndex) => { setServiceId(endSlideIndex) }}>
                {services?.map((s, i) => <div className={style.desc} key={i}>
                  <div className={style.descHead}>
                    <div>{s.name}</div>
                    <form className={style.costForm}>
                      <input
                        type="number"
                        value={newCost}
                        onChange={(e) => setNewCost(parseInt(e.target.value, 10))}
                        className="noprint"
                      />
                      <input type='button' value={'Сохранить'} onClick={changeCost} />
                    </form>
                  </div>

                  {s.description}
                </div>
                )}
              </Carousel>
            </div>
          </div>

        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default Description;
