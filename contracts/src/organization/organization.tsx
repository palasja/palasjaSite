import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  choseInfo,
  getChosenOrganization,
  getChosenInfo,
  getChosenchosenAction,
  chosenAction,
} from '../redux/slices/orgsSlice';
import OrganizationForm from './organizationForm';
import {
  useGetOrganizationQuery,
} from '../redux/slices/organizationRTKSlice';
import style from './organization.module.css';
import { Organization as OrgType } from '../helpers/contractTypes';
import {
  AddOrgIcon,
} from '../components/icons/icons';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import OrganizationButton from './organizationButton';



const Organization = () => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);

  const info = useAppSelector(getChosenInfo);
  const action = useAppSelector(getChosenchosenAction);

  const { data: organizations = [] } = useGetOrganizationQuery();

  const changeSelectHandler = (orgId: string) => {
    navigate(`${orgId}/servise`);
  };
  const addHandler = () => {
    dispatch(choseInfo('org'));
    dispatch(chosenAction('add'));
  };

  useEffect(() => {
    const org = organizations.find(
      (o) => o.id === Number.parseInt(params.orgID as string)
    ) as OrgType;
    dispatch(chooseOrg(org));
  });
  const page = (
    <>
      {organizations.length == 0 ? (
        <>
          <h2>Список организаций не загружен или пуст</h2>
        </>
      ) : (
        <>
          <div className={`noprint ${style.orgContainer}`}>
            <p onClick={() => addHandler()}>
              <AddOrgIcon />
            </p>
            {organizations.map((org) => (
              <OrganizationButton org={org} />
            ))}
            {info === 'org' && (action === 'change' || action === 'add') && <OrganizationForm />}
          </div>

          <div className={`noprint ${style.orgContainerMobile}`}>
            <select onChange={(e) => changeSelectHandler(e.target.value)} data-testid="monthSelect">
              {organizations.map((org, i) => {
                return (
                  <option value={org.id} key={i}>
                    {org.name}
                  </option>
                );
              })}
            </select>
            {choosenOrg && <OrganizationButton org={choosenOrg} />}
          </div>
        </>
      )}
      {/* move to redux */}
      {/* {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deleteOrganization(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )} */}
    </>
  );

  return page;
};

export default Organization;
