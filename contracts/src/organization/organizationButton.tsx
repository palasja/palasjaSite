import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
  choseInfo,
  getChangingOrganization,
  chosenAction,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/remove/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import { useDeleteOrganizationMutation } from '../redux/slices/organizationRTKSlice';
import style from './organization.module.css';
import { isWithoutOrg } from '../redux/slices/servicesSlice';
import { Organization as OrgType } from '../helpers/contractTypes';
import {
  ActIcon,
  ContractIcon,
  EditIcon,
  PersonalIcon,
  RemoveIcon,
  ServicesIcon,
} from '../components/icons/icons';
import { Link, NavLink, useNavigate, useParams } from 'react-router';

type OrganizationButtonProps = {
  org: OrgType;
};

const OrganizationButton = ({ org }: OrganizationButtonProps) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  let params = useParams();
  const changingOrganization = useAppSelector(getChangingOrganization);
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } =
    useRemoveEntity<number>(-1);
  const noOrgClickHandler = () => {
    dispatch(isWithoutOrg(true));
    dispatch(choseInfo('service'));
    dispatch(chosenAction('show'));
  };
  const orgClickHandler = (org: OrgType) => {
    dispatch(isWithoutOrg(false));
    dispatch(choseInfo('service'));
    dispatch(chosenAction('show'));
  };
  const changeHandler = (org: OrgType, e: React.MouseEvent) => {
    e?.stopPropagation();
    dispatch(choseInfo('org'));
    dispatch(chosenAction('change'));
    dispatch(changingOrg(org));
    navigate(`../org`);
  };
  const removeHandler = (org: OrgType) => {
    setRemoveId(org.id);
    setIsShowRemoveModal(true);
    dispatch(chooseOrg(null));
    if (changingOrganization?.name === org.name) dispatch(changingOrg(null));
  };
  return (
    <div
      className={style.orgBtn}
      key={org.id}
      onClick={() => (org.id !== 0 ? orgClickHandler(org) : noOrgClickHandler())}
      data-testid="orgBtn"
    >
      <div
        className={`${style.mainBtn} ${org.id === Number.parseInt(params.orgID as string) ? style.orgActive : ''}`}
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
            <Link to={`/org/${org.id}/service`} className={style.orgName}>
              {org.name}
            </Link>
            {/* <div className={style.orgName}>{org.name}</div> */}
            <div
              className={style.orgActBtn}
              onClick={(e) => changeHandler(org, e)}
              data-testid="rename"
            >
              <EditIcon />
            </div>
          </>
        ) : (
          <>
            <Link className={style.orgName} to={`/org/${org.id}/service`}>
              {org.name}
            </Link>
          </>
        )}
      </div>
      <div className={style.subButtonContainer}>
        <NavLink className={style.subButton} to={`/org/${org.id}/service`}>
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
      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => deleteOrganization(removeId)}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </div>
  );
};
export default OrganizationButton;
