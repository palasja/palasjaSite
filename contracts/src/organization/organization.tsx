import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
  getOrganisationError,
  getChangingOrganization,
  getChosenOrganization,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import OrganizationForm from './organizationForm';
import {
  useGetOrganizationQuery,
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
  useAddOrganizationMutation,
} from '../redux/slices/organizationRTKSlice';
import Loading from '../components/loading';
import style from './organization.module.css';
import { isWithoutOrg } from '../redux/slices/servicesSlice';
import { Organization as OrgType } from '../helpers/contractTypes';

const Organization = () => {
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const changingOrganization = useAppSelector(getChangingOrganization);
  const errors = useAppSelector(getOrganisationError);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const { data: organizations = [], isLoading, isFetching } = useGetOrganizationQuery();
  const noOrgClickHandler = () => {
    dispatch(isWithoutOrg(true));
    dispatch(chooseOrg(null));
  };
  const orgClickHandler = (org: OrgType) => {
    dispatch(isWithoutOrg(false));
    dispatch(chooseOrg(org));
  };
  const page = (
    <>
      <div className={style.orgContainer}>
        <p>ADD_ORG</p>
        {organizations.map((org) => (
          <div
            className={style.orgBtn}
            key={org.id}
            onClick={() => (org.id !== 0 ? orgClickHandler(org) : noOrgClickHandler())}
          >
            <div className={`${style.mainBtn} ${org.id === choosenOrg?.id ? style.orgActive : ''}`}>
              {org.id !== 0 ? (
                <>
                  <div
                    className={style.orgActBtn}
                    onClick={() => {
                      setRemoveId(org.id);
                      setIsShowRemoveModal(true);
                      dispatch(chooseOrg(null));
                      if (changingOrganization?.name === org.name) dispatch(changingOrg(null));
                    }}
                  >
                    -
                  </div>
                  <div className={style.orgName}>{org.name}</div>
                  <div
                    className={style.orgActBtn}
                    onClick={() => {
                      dispatch(changingOrg(org));
                    }}
                  >
                    *
                  </div>
                </>
              ) : (
                <>
                  <div className={style.orgName}>{org.name}</div>
                </>
              )}
            </div>
            <div className={style.subButtonContainer}>
              <div className={style.subButton}>S</div>
              <div className={style.subButton}>D</div>
              <div className={style.subButton}>P</div>
            </div>
          </div>
        ))}
      </div>

      <h3>Организации</h3>
      <h4>{errors}</h4>
      <OrganizationForm />
      {organizations.length == 0 ? (
        <>
          <h2>Список организаций не загружен или пуст</h2>
        </>
      ) : (
        <ul>
          {organizations.map((org) => {
            return (
              <li key={org.id}>
                <p
                  onClick={() => {
                    dispatch(chooseOrg(org));
                  }}
                >
                  {org.name}
                </p>
                <button
                  onClick={() => {
                    setRemoveId(org.id);
                    setIsShowRemoveModal(true);
                    dispatch(chooseOrg(null));
                    if (changingOrganization?.name === org.name) dispatch(changingOrg(null));
                  }}
                >
                  Удалить
                </button>
                <button
                  onClick={() => {
                    dispatch(changingOrg(org));
                  }}
                >
                  Изменить
                </button>
              </li>
            );
          })}
          <li>{isFetching && <Loading />}</li>
        </ul>
      )}

      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deleteOrganization(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );

  return isLoading ? <Loading /> : page;
};

export default Organization;
