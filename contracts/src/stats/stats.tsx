import { useEffect, useState } from "react";
import { getServicesCost, getServicesCostWithNDS, MONTH_R } from "../helpers/helper";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchContractsByOrgIMonth } from "../redux/slices/contractSlice";
import { fetchOrgs, getAllOrganisation, getChosenOrganization } from "../redux/slices/orgsSlice";
import { chooseMonth, getChoosenMonth } from "../redux/slices/servicesSlice";
import { fetchServicesMonth } from "../helpers/api";
import { Organization, Service } from "../helpers/contractTypes";

const Stats = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const organizations = useAppSelector(getAllOrganisation);
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    if(organizations.length === 0){
      dispatch(fetchOrgs());
    }
  }, []);
  useEffect(() => {
    const getServiceByMonth = async () => {
      const allServ = await fetchServicesMonth(month);
      setServices(allServ);
    }
     getServiceByMonth();
  }, [month]);

  return(
    <>
    <select onChange={(e) => setMonth(e.target.value)} defaultValue={choosenMonth}>
              {MONTH_R.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    {e}
                  </option>
                );
              })}
    </select>
    <h2>За месяц {getServicesCost(services)}</h2>
    {
      organizations.map(o => {

        const arr = services.filter( s => s.orgId == o.id.toString());
        return <p>{o.name} - {getServicesCost(arr)}</p>
      })
    }
    {
      <p>Без организаций - {getServicesCost( services.filter( s => s.orgId === null))}</p>
    }
    </>
  );
}

export default Stats