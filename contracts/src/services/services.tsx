import { ChangeEvent, useEffect, useState } from 'react';
// import style from './services.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChoosenMonth, chooseMonth } from '../redux/slices/servicesSlice';
import { choseAct, getChosenchosenAction, getChosenOrganization } from '../redux/slices/orgsSlice';
import ServiceForm from './serviceForm';
import { Service } from '../helpers/contractTypes';
import {
  useDeleteServiceMutation,
  useLazyGetServicesByOrgIdMonthQuery,
} from '../redux/slices/servicesRTKSlice';
import Loading from '../components/loading';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import ServiceTable from './serviceTable';
import { AddIcon } from '../components/icons/icons';
import style from './services.module.css';

const Services = () => {
  const [isPaid, setIsPaid] = useState(false);
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const action = useAppSelector(getChosenchosenAction);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const [loadServices, { data: services, isLoading, isFetching }] =
    useLazyGetServicesByOrgIdMonthQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [changingService, setChangingService] = useState<Service | undefined>();
  useEffect(() => {
    if (choosenOrg !== null) {
      loadServices({ orgId: choosenOrg.id, month: choosenMonth, isPaid: isPaid });
    }
  }, [choosenOrg, choosenMonth, isPaid]);

  const handlerPaidService = (paid: boolean) => {
    setIsPaid(paid);
  };
  const changeHandler = (service: Service) => {
    setChangingService(service);
    dispatch(choseAct('change'));
  };
  const addHandler = () => {
    dispatch(choseAct('add'));
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

      <label htmlFor="paid">Оплаченые</label>
      <input
        type="checkbox"
        name="paid"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handlerPaidService(e.target.checked)}
      />
      <div>
        {isPaid && (
          <select
            onChange={(e) => dispatch(chooseMonth(e.target.value))}
            defaultValue={choosenMonth}
          >
            {[...new Array(12)].map((_e, i) => {
              return (
                <option value={i} key={i}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        )}
        <br />
      </div>
      {action === 'change' && <ServiceForm changingService={changingService} />}
      {action === 'add' && <ServiceForm changingService={undefined} />}
      {action === 'show' &&
        (services?.length == 0 ? (
          <h3>Нет услуг</h3>
        ) : (
          services && <ServiceTable data={services} edit={changeHandler} remove={removeHandler} />
        ))}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deleteService(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
  return isLoading ? <Loading /> : page;
};

export default Services;
