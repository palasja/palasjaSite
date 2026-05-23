import { createPortal } from 'react-dom';

import style from './userCost.module.css';
import { getChoosenMonth, getChoosenYear, getFullDesc } from '../../../redux/slices/servicesSlice';
import { useAppSelector } from '../../../redux/hooks';
import { getCostByUser } from '../../../helpers/helper';
import { getChosenOrganization } from '../../../redux/slices/orgsSlice';
import { useLazyGetServiceCostChangeByOrgIdMonthYearQuery } from '../../../redux/slices/servicesRTKSlice';
import { useEffect } from 'react';
import { Service } from '../../../helpers/contractTypes';

type UserCostType = {
  services: Service[];
  isPaid: boolean;
  close: (e: React.MouseEvent<HTMLElement>) => void;
};
const UserCost = ({ close, isPaid, services }: UserCostType) => {
  console.log(123);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenYear = useAppSelector(getChoosenYear);
  const [loadServicesCostChange, { data: servicesCostChange }] =
    useLazyGetServiceCostChangeByOrgIdMonthYearQuery();
  useEffect(() => {
    console.log(123);
    if (choosenOrg !== null) {
      loadServicesCostChange(
        {
          orgId: choosenOrg.id,
          month: choosenMonth,
          year: choosenYear,
          isPaid: choosenOrg.id == 0 ? true : isPaid,
        },
        true
      );
    }
  }, []);

  return (
    <>
      {createPortal(
        <div className={style.back} onClick={(e) => close(e)} data-testid="removeModal">
          <div className={style.main}>
            <div className={style.desc}>
              {servicesCostChange &&
                getCostByUser(servicesCostChange, services).map((cu) => {
                  return (
                    <p>
                      {cu.user} - {cu.cost}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>,
        document.getElementById('root') ?? document.getElementsByTagName('body')[0]
      )}
    </>
  );
};

export default UserCost;
