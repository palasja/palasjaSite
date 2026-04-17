import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
  choseInfo,
  getChangingOrganization,
  getChosenOrganization,
  getChosenInfo,
  getChosenchosenAction,
  choseAct,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import OrganizationForm from './organizationForm';
import {
  useGetOrganizationQuery,
  useDeleteOrganizationMutation,
} from '../redux/slices/organizationRTKSlice';
import style from './organization.module.css';
import { isWithoutOrg } from '../redux/slices/servicesSlice';
import { OrgInfo, Organization as OrgType } from '../helpers/contractTypes';
import {
  ActIcon,
  AddOrgIcon,
  ContractIcon,
  EditIcon,
  PersonalIcon,
  RemoveIcon,
  ServicesIcon,
} from '../components/icons/icons';
import { NavLink } from 'react-router';

const Organization = () => {
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const changingOrganization = useAppSelector(getChangingOrganization);
  const info = useAppSelector(getChosenInfo);
  const action = useAppSelector(getChosenchosenAction);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const { data: organizations = [], isLoading, isFetching } = useGetOrganizationQuery();
  const noOrgClickHandler = () => {
    dispatch(isWithoutOrg(true));
    dispatch(choseInfo('service'));
    dispatch(choseAct('show'));
    dispatch(chooseOrg(organizations[organizations.length - 1]));
  };
  const orgClickHandler = (org: OrgType) => {
    dispatch(isWithoutOrg(false));
    dispatch(chooseOrg(org));
    dispatch(choseInfo('service'));
    dispatch(choseAct('show'));
  };
  const changeHandler = (e: React.MouseEvent, org: OrgType) => {
    e.stopPropagation();
    dispatch(choseInfo('org'));
    dispatch(choseAct('change'));
    dispatch(changingOrg(org));
  };
  const addHandler = () => {
    dispatch(choseInfo('org'));
    dispatch(choseAct('add'));
  };
  const removeHandler = (org: OrgType) => {
    setRemoveId(org.id);
    setIsShowRemoveModal(true);
    dispatch(chooseOrg(null));
    if (changingOrganization?.name === org.name) dispatch(changingOrg(null));
  };

  const page = (
    <>
      {organizations.length == 0 ? (
        <>
          <h2>Список организаций не загружен или пуст</h2>
        </>
      ) : (
        <div className={`noprint ${style.orgContainer}`}>
          <p onClick={() => addHandler()}>
            <AddOrgIcon />
          </p>
          {organizations.map((org) => (
            <div
              className={style.orgBtn}
              key={org.id}
              onClick={() => (org.id !== 0 ? orgClickHandler(org) : noOrgClickHandler())}
              data-testid="orgBtn"
            >
              <div
                className={`${style.mainBtn} ${org.id === choosenOrg?.id ? style.orgActive : ''}`}
              >
                {org.id !== 0 ? (
                  <>
                    <div
                      className={style.orgActBtn}
                      onClick={() => removeHandler(org)}
                      data-testid="delete"
                    >
                      <RemoveIcon />
                    </div>
                    <div className={style.orgName}>{org.name}</div>
                    <div
                      className={style.orgActBtn}
                      onClick={(e) => changeHandler(e, org)}
                      data-testid="rename"
                    >
                      <EditIcon />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={style.orgName}>{org.name}</div>
                  </>
                )}
              </div>
              {org.id !== 0 && (
                <div className={style.subButtonContainer}>
                  <NavLink className={style.subButton} to={`/org/${org.id}/servise`}>
                    <ServicesIcon />
                  </NavLink>
                  <NavLink className={style.subButton} to={`/org/${org.id}/contracts`}>
                    <ContractIcon />
                  </NavLink>
                  <NavLink className={style.subButton} to={`/org/${org.id}/personals`}>
                    <PersonalIcon />
                  </NavLink>
                  <NavLink className={style.subButton} to={`/org/${org.id}/act`}>
                    <ActIcon />
                  </NavLink>
                </div>
              )}
            </div>
          ))}
          {info === 'org' && (action === 'change' || action === 'add') && <OrganizationForm />}
        </div>
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deleteOrganization(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );

  return page;
};

export default Organization;
