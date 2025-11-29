import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
  choseInfo,
  getOrganisationError,
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
  useUpdateOrganizationMutation,
  useAddOrganizationMutation,
} from '../redux/slices/organizationRTKSlice';
import Loading from '../components/loading';
import style from './organization.module.css';
import { isWithoutOrg } from '../redux/slices/servicesSlice';
import { OrgInfo, Organization as OrgType } from '../helpers/contractTypes';
import PersonalTable from '../personal/personalTable';

const Organization = () => {
  // console.log(123);
  const dispatch = useAppDispatch();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const changingOrganization = useAppSelector(getChangingOrganization);
  const errors = useAppSelector(getOrganisationError);
  const info = useAppSelector(getChosenInfo);
  const action = useAppSelector(getChosenchosenAction);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const { data: organizations = [], isLoading, isFetching } = useGetOrganizationQuery();
  const noOrgClickHandler = () => {
    dispatch(isWithoutOrg(true));
    dispatch(chooseOrg(organizations[organizations.length - 1]));
  };
  const orgClickHandler = (org: OrgType) => {
    dispatch(isWithoutOrg(false));
    dispatch(chooseOrg(org));
    dispatch(choseInfo('service'));
  };
  const infoHandler = (e: React.MouseEvent, info: OrgInfo) => {
    e.stopPropagation();
    dispatch(choseInfo(info));
    dispatch(choseAct('show'));
  };
  const changeHandler = (e: React.MouseEvent, org: OrgType) => {
    e.stopPropagation();
    dispatch(choseInfo('org'));
    dispatch(choseAct('change'));
    dispatch(changingOrg(org));
  };
  const removeHandler = (org: OrgType) => {
    setRemoveId(org.id);
    setIsShowRemoveModal(true);
    dispatch(chooseOrg(null));
    if (changingOrganization?.name === org.name) dispatch(changingOrg(null));
  };
  const page = (
    <>
      {/* <h3>Организации</h3>
      <h4>{errors}</h4>
      <OrganizationForm /> */}
      {organizations.length == 0 ? (
        <>
          <h2>Список организаций не загружен или пуст</h2>
        </>
      ) : (
        <div className={style.orgContainer}>
          <p>ADD_ORG</p>
          {organizations.map((org) => (
            <div
              className={style.orgBtn}
              key={org.id}
              onClick={() => (org.id !== 0 ? orgClickHandler(org) : noOrgClickHandler())}
            >
              <div
                className={`${style.mainBtn} ${org.id === choosenOrg?.id ? style.orgActive : ''}`}
              >
                {org.id !== 0 ? (
                  <>
                    <div className={style.orgActBtn} onClick={() => removeHandler(org)}>
                      -
                    </div>
                    <div className={style.orgName}>{org.name}</div>
                    <div className={style.orgActBtn} onClick={(e) => changeHandler(e, org)}>
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
                <div className={style.subButton} onClick={(e) => infoHandler(e, 'service')}>
                  S
                </div>
                <div className={style.subButton} onClick={(e) => infoHandler(e, 'contract')}>
                  C
                </div>
                <div className={style.subButton} onClick={(e) => infoHandler(e, 'personal')}>
                  P
                </div>
              </div>
            </div>
          ))}
          {info === 'org' && action === 'change' && <OrganizationForm />}
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

  return isLoading ? <Loading /> : page;
};

export default Organization;
