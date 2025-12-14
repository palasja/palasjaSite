import { getServicesCost, MONTH_R } from '../helpers/helper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chooseMonth, getChoosenMonth } from '../redux/slices/servicesSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import {
  useLazyGetServicesCostQuery,
  useLazyGetServicesByMonthQuery,
} from '../redux/slices/servicesRTKSlice';
import { useEffect } from 'react';
import { OrganizationCost, ServiceCost } from '../helpers/contractTypes';
import SVGAxis from './SVGCan';

const Stats = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const [loadServices, { data: services, isLoading: isGetLoading }] =
    useLazyGetServicesByMonthQuery();
  const { data: organizations = [] } = useGetOrganizationQuery();
  const [loadServicesCost, { data: servicesCost, isLoading: isGetLoadingCost }] =
    useLazyGetServicesCostQuery();
  const chooseMonthHandler = (month: string) => {
    dispatch(chooseMonth(month));
  };

  useEffect(() => {
    if (choosenMonth) {
      loadServices(choosenMonth);
      loadServicesCost();
    }
  }, [choosenMonth]);

  const getOrganizationCost = (services: ServiceCost[]) => {
    const dateArr = services.map((s) => new Date(s.date).getTime());
    const minDate = new Date(Math.min(...dateArr));
    let maxDate = new Date(Math.max(...dateArr));
    maxDate = new Date(maxDate.setMonth(maxDate.getMonth()));

    let firstDay = new Date(`${minDate.getFullYear()}-${minDate.getMonth() + 1}`);
    const servicesByMonth = [];
    while (firstDay <= maxDate) {
      let lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0, 23, 59, 59);
      const serviceByMonth = services.filter((s) => {
        return new Date(s.date) >= firstDay && new Date(s.date) <= lastDay;
      });

      const organisationsCost: OrganizationCost[] = organizations.map((o) => {
        const arr = serviceByMonth.filter((s) => s.orgId == o.id.toString());

        return { orgId: o.id.toString(), cost: getServicesCost(arr) };
      });
      const costWithoutOrg = getServicesCost(serviceByMonth.filter((s) => s.orgId === null));
      const withoutOrg = { orgId: '0', cost: costWithoutOrg };
      organisationsCost.push(withoutOrg);
      const dateStr = firstDay.toLocaleDateString('ru-ru');
      servicesByMonth.push({
        date: `${dateStr.slice(3, 6)}${dateStr.slice(-2)}`,
        services: organisationsCost,
      });

      firstDay = new Date(firstDay.setMonth(firstDay.getMonth() + 1));
    }

    return servicesByMonth.map((sm) => ({
      colName: sm.date,
      colParts: sm.services.map((s) => ({ value: s.cost, entityId: s.orgId })),
    }));
  };

  return (
    <>
      {servicesCost && (
        <SVGAxis columnInfo={getOrganizationCost(servicesCost)} entity={organizations} />
      )}

      {/* <select onChange={(e) => chooseMonthHandler(e.target.value)} defaultValue={choosenMonth}>
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
      )} */}
    </>
  );
};

export default Stats;
