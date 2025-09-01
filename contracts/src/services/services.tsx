import { useEffect, useState } from 'react';
import style from './services.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getChoosenMonth,
  chooseMonth,
} from '../redux/slices/servicesSlice';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import ServiceForm from './serviceForm';
import { Service } from '../helpers/contractTypes';
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useLazyGetServicesByOrgIdMonthQuery,
  useUpdateServiceMutation,
} from '../redux/slices/servicesRTKSlice';
import Loading from '../components/loading';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';

const Services = () => {
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const [loadServices, { data: services, isLoading: isGetLoading }] =
    useLazyGetServicesByOrgIdMonthQuery();
  const [deleteService, { isLoading: isDeleteLoading }] = useDeleteServiceMutation();
  const [_, { isLoading: isUpdateLoading }] = useUpdateServiceMutation();
  const [__, { isLoading: isAddLoading }] = useAddServiceMutation();
  const [changingService, setChangingService] = useState<Service | undefined>();
  useEffect(() => {
    if (choosenOrg === null) {
      loadServices({ orgId: null, month: choosenMonth });
    } else if (choosenOrg) {
      loadServices({ orgId: choosenOrg.id, month: choosenMonth });
    }
  }, [choosenMonth, choosenOrg]);
  const page = (
    <>
      <h3>Услуги</h3>
      <div>
        <select onChange={(e) => dispatch(chooseMonth(e.target.value))}>
          {[...new Array(12)].map((_e, i) => {
            return (
              <option value={i} key={i} selected={i.toString() === choosenMonth}>
                {i + 1}
              </option>
            );
          })}
        </select>
      </div>
      <ServiceForm changingService={changingService} />
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
  return isGetLoading || isUpdateLoading || isAddLoading || isDeleteLoading ? <Loading /> : page;
};

export default Services;
