import { ChangeEvent, useEffect, useState } from 'react';
import style from './services.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChoosenMonth, chooseMonth } from '../redux/slices/servicesSlice';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import ServiceForm from './serviceForm';
import { Service } from '../helpers/contractTypes';
import {
  useDeleteServiceMutation,
  useLazyGetServicesByOrgIdMonthQuery,
} from '../redux/slices/servicesRTKSlice';
import Loading from '../components/loading';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';

const Services = () => {
  const [isPaid, setIsPaid] = useState(false);
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const [loadServices, { data: services, isLoading, isFetching }] =
    useLazyGetServicesByOrgIdMonthQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [changingService, setChangingService] = useState<Service | undefined>();
  useEffect(() => {
    if (choosenOrg === null) {
      //Без организации всегда оплачено
      loadServices({ orgId: null, month: choosenMonth, isPaid: true });
    } else if (choosenOrg) {
      loadServices({ orgId: choosenOrg.id, month: choosenMonth, isPaid: isPaid });
    }
  }, [choosenMonth, choosenOrg, isPaid]);

  const handlerPaidService = (paid: boolean) => {
    setIsPaid(paid);
  };
  const page = (
    <>
      <h3>Услуги {choosenOrg && `( ${choosenOrg.name} )`}</h3>
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
      <ServiceForm
        changingService={changingService}
        clearCallback={() => setChangingService(undefined)}
      />
      {services?.length == 0 ? (
        <></>
      ) : (
        <ul>
          {services?.map((service) => {
            return (
              <li key={service.id}>
                {`${service.name} ${service.date} ${service.count} ${service.cost}`}
                <button
                  onClick={() => {
                    setRemoveId(service.id);
                    setIsShowRemoveModal(true);
                  }}
                >
                  Удалить
                </button>
                <button onClick={() => setChangingService(service)}>Изменить</button>
              </li>
            );
          })}
          <li>{isFetching && <Loading />}</li>
        </ul>
      )}
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
