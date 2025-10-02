import { getServicesCost, MONTH_R } from '../helpers/helper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { chooseMonth, getChoosenMonth } from '../redux/slices/servicesSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import { useLazyGetServicesByMonthQuery } from '../redux/slices/servicesRTKSlice';
import { useEffect } from 'react';

const Stats = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const [loadServices, { data: services, isLoading: isGetLoading }] =
    useLazyGetServicesByMonthQuery();
  const { data: organizations = [] } = useGetOrganizationQuery();

  const chooseMonthHandler = (month: string) => {
    dispatch(chooseMonth(month));
    // loadServices(month);
  };

  useEffect(() => {
    if (choosenMonth) {
      loadServices(choosenMonth);
    }
  }, [choosenMonth]);
  return (
    <>
      <select onChange={(e) => chooseMonthHandler(e.target.value)} defaultValue={choosenMonth}>
        {MONTH_R.map((e, i) => {
          return (
            <option value={i} key={i}>
              {e}
            </option>
          );
        })}
      </select>
      {services && (
        <>
          <h2>За месяц {getServicesCost(services)}</h2>
          {organizations.map((o, i) => {
            const arr = services.filter((s) => s.orgId == o.id.toString());
            return (
              <p key={i}>
                {o.name} - {getServicesCost(arr)}
              </p>
            );
          })}
          <p>Без организаций - {getServicesCost(services.filter((s) => s.orgId === null))}</p>
        </>
      )}
    </>
  );
};

export default Stats;
