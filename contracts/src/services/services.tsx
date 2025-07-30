import { useEffect } from 'react';
import style from './services.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  delService,
  fetchServicesByOrgIdMonth,
  getServices,
  getChoosenMonth,
  chooseMonth,
  changingService,
} from '../redux/slices/servicesSlice';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import ServiceForm from './serviceForm';

const Services = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(getServices);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);

  useEffect(() => {
    console.log(choosenOrg);
    if(choosenOrg === null) {
      console.log(123);
      dispatch(fetchServicesByOrgIdMonth({ orgId: null, month: choosenMonth }));
    } else if(choosenOrg) {
      dispatch(fetchServicesByOrgIdMonth({ orgId: choosenOrg.id, month: choosenMonth }));
    }
    // choosenOrg &&
    //   dispatch(fetchServicesByOrgIdMonth({ orgId: choosenOrg.id, month: choosenMonth }));
  }, [choosenMonth, choosenOrg]);

  return (
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
      <ServiceForm />
      {services.length == 0 ? (
        <></>
      ) : (
        <ul>
          {services.map((service) => {
            return (
              <li key={service.id}>
                {`${service.name} ${service.date} ${service.count} ${service.cost}`}
                <button
                  onClick={async () => {
                    dispatch(delService(service.id));
                  }}
                >
                  Удалить
                </button>
                <button onClick={() => dispatch(changingService(service))}>Изменить</button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Services;
