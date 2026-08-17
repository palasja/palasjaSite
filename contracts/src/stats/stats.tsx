import { getServicesCost } from '../helpers/helper';
import { useAppSelector } from '../redux/hooks';
import { getChoosenMonth, getChoosenYear } from '../redux/slices/servicesSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import {
  useLazyGetServicesCostQuery,
  useLazyGetServicesByMonthQuery,
} from '../redux/slices/servicesRTKSlice';
import { useEffect, useState } from 'react';
import { OrganizationCost, ServiceCost } from '../helpers/contractTypes';
import SVGAxis from './SVGCan';
import style from './stats.module.css';
const Stats = () => {
  const countMonthOnAxis = 8;
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenYear = useAppSelector(getChoosenYear);
  const [loadServices, { data: services }] = useLazyGetServicesByMonthQuery();
  const { data: organizations = [] } = useGetOrganizationQuery();
  const [loadServicesCost, { data: servicesCost }] = useLazyGetServicesCostQuery();
  const [isShowAll, setIsShowAll] = useState(false);
  useEffect(() => {
    if (choosenMonth) {
      loadServices({ month: choosenMonth, year: choosenYear });
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
      const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0, 23, 59, 59);
      const serviceByMonth = services.filter((s) => {
        return new Date(s.date) >= firstDay && new Date(s.date) <= lastDay;
      });

      const organisationsCost: OrganizationCost[] = organizations.map((o) => {
        const arr = serviceByMonth.filter((s) => s.orgId == o.id);

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

  const colunns = servicesCost ? getOrganizationCost(servicesCost) : [];
  const currentColumns = isShowAll ? colunns : colunns.slice(colunns.length - countMonthOnAxis);
  return (
    <>
      <h2>Статистика</h2>
      <div className={style.showAllContainer}>
        <label htmlFor="showAll">За всё время</label>
        <input
          type="checkbox"
          name="showAll"
          id="showAll"
          className={style.showAll}
          defaultChecked={isShowAll}
          onChange={(e) => setIsShowAll(e.target.checked)}
        />
      </div>
      <div className={style.container}>
        {servicesCost && <SVGAxis columnInfo={currentColumns} entity={organizations} />}
      </div>
    </>
  );
};

export default Stats;
