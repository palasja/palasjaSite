import { ChangeEvent, useEffect, useState } from 'react';
// import style from './services.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChoosenMonth, getChoosenYear } from '../redux/slices/servicesSlice';
import {
  chosenAction,
  getChosenchosenAction,
  getChosenOrganization,
} from '../redux/slices/orgsSlice';
import ServiceForm from './serviceForm';
import { Service } from '../helpers/contractTypes';
import {
  useDeleteServiceMutation,
  useLazyGetServiceCostChangeByOrgIdMonthYearQuery,
  useLazyGetServicesByOrgIdMonthYearQuery,
} from '../redux/slices/servicesRTKSlice';
import RemoveAgreePortal from '../components/modal/remove/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import ServiceTable from './serviceTable';
import { AddIcon } from '../components/icons/icons';
import style from './services.module.css';
import { getCostByUser, getServicesCost, getServicesCostByMonth } from '../helpers/helper';
import { WISHPAYMENT_IN_MOOONTH } from '../helpers/constants';
import SelectMonthYear from '../components/selectMonthYear';
import DetailPortal from '../components/modal/details/detailModal';
import CostChange from './modalContent/costChange/costChange';
import Description from './modalContent/description/description';
import UserCost from './modalContent/userCost/userCost';

const Services = () => {
  const [isPaid, setIsPaid] = useState(false);
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenYear = useAppSelector(getChoosenYear);
  const action = useAppSelector(getChosenchosenAction);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const [loadServices, { data: services, isLoading, isFetching }] =
    useLazyGetServicesByOrgIdMonthYearQuery();

  const [deleteService] = useDeleteServiceMutation();
  const [changingService, setChangingService] = useState<Service | undefined>();
  const [isShowDescriptionModal, setIsShowDescriptionModal] = useState(false);
  const [isShowCostChangeModal, setIsShowCostChangeModal] = useState(false);
  const [isShowUserCostModal, setIsShowUserCostModal] = useState(false);
  useEffect(() => {
    if (choosenOrg !== null) {
      loadServices(
        {
          orgId: choosenOrg.id,
          month: choosenMonth,
          year: choosenYear,
          isPaid: choosenOrg.id == 0 ? true : isPaid,
        },
        true
      );
    }
  }, [choosenOrg, choosenMonth, choosenYear, isPaid]);

  const handlerPaidService = (paid: boolean) => {
    setIsPaid(paid);
  };
  const changeHandler = (service: Service) => {
    setChangingService(service);
    dispatch(chosenAction('change'));
  };
  const addHandler = () => {
    dispatch(chosenAction('add'));
  };
  const removeHandler = (id: string) => {
    setRemoveId(parseInt(id, 10));
    setIsShowRemoveModal(true);
  };
  const page = (
    <>
      <div className={style.nameContainer}>
        <AddIcon onClick={addHandler} />
        <p>Услуги {choosenOrg && `( ${choosenOrg.name} )`}</p>
      </div>
      <div className={style.infoContainer}>
        <label htmlFor="paid">Оплаченые</label>
        {choosenOrg?.id != 0 && (
          <input
            type="checkbox"
            name="paid"
            defaultChecked={isPaid}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlerPaidService(e.target.checked)}
          />
        )}
        <div className={style.costInfo}>
          <p>
            Стоимость работ:
            <span className={style.cost} onClick={() => setIsShowUserCostModal(true)}>
              {services ? getServicesCost(services) : 0}
            </span>
          </p>

          <p>
            Стоимость по времени (3к/мес):
            <span className={style.cost}>
              {services ? getServicesCostByMonth(services, WISHPAYMENT_IN_MOOONTH) : 0}
            </span>
          </p>
        </div>
      </div>

      <div>
        {isPaid && <SelectMonthYear />}
        <br />
      </div>
      {action === 'change' && <ServiceForm changingService={changingService} />}
      {action === 'add' && <ServiceForm changingService={undefined} />}
      {action === 'show' &&
        (services?.length == 0 ? (
          <h3>Нет услуг</h3>
        ) : (
          services && (
            <ServiceTable
              data={services}
              edit={changeHandler}
              remove={removeHandler}
              showDetail={() => setIsShowDescriptionModal(true)}
              showServiceCost={() => setIsShowCostChangeModal(true)}
            />
          )
        ))}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deleteService(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}

      {isShowDescriptionModal && (
        <DetailPortal
          children={
            <Description
              close={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                setIsShowDescriptionModal(false);
              }}
            />
          }
        />
      )}
      {isShowCostChangeModal && (
        <DetailPortal
          children={
            <CostChange
              close={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                setIsShowCostChangeModal(false);
              }}
            />
          }
        />
      )}
      {isShowUserCostModal && services && (
        <DetailPortal
          children={
            <UserCost
              services={services}
              isPaid={isPaid}
              close={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                setIsShowUserCostModal(false);
              }}
            />
          }
        />
      )}
    </>
  );
  return page;
};

export default Services;
