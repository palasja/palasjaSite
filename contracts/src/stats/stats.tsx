import { getServicesCost, MONTH_R } from '../helpers/helper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { chooseMonth, getChoosenMonth } from '../redux/slices/servicesSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import { useLazyGetServicesByMonthQuery } from '../redux/slices/servicesRTKSlice';

const Stats = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const [loadServices, { data: services, isLoading: isGetLoading }] =
    useLazyGetServicesByMonthQuery();
  const { data: organizations = [] } = useGetOrganizationQuery();

  const chooseMonthHandler = (month: string) => {
    dispatch(chooseMonth(month));
    loadServices(month);
  };

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
          {organizations.map((o) => {
            const arr = services.filter((s) => s.orgId == o.id.toString());
            return (
              <p>
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
