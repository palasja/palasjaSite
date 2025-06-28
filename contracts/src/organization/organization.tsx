import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
  delOrg,
  fetchOrgs,
  getAllOrganisation,
  getChosenOrganization,
  getOrganisationError,
} from '../redux/slices/orgsSlice';
import RemoveAgreePortal from '../components/modal/removeModal';
import { useRemoveEntity } from '../hooks/useRemoveEntity';
import OrganizationForm from './organizationForm';

const Organization = () => {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(getAllOrganisation);
  const choosenOrg = useAppSelector(getChosenOrganization);
  const errors = useAppSelector(getOrganisationError);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();

  useEffect(() => {
    dispatch(fetchOrgs());
  }, []);
  return (
    <>
      <h2>Организации</h2>
      <h3>{errors}</h3>

      <OrganizationForm />
      {organizations.length == 0 ? (
        <></>
      ) : (
        <ul>
          {organizations.map((org, i) => {
            return (
              <li key={i}>
                <span
                  onClick={() => {
                    dispatch(chooseOrg(org));
                  }}
                >
                  {org.name}
                </span>
                <button
                  onClick={() => {
                    setRemoveId(org.id);
                    setIsShowRemoveModal(true);
                  }}
                >
                  Удалить
                </button>
                <button
                  onClick={() => {
                    dispatch(changingOrg(org));
                  }}
                >
                  Переименовать
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <h2>{choosenOrg?.name}</h2>
      {isShowRemoveModal && (
        <RemoveAgreePortal
          remove={() => dispatch(delOrg(removeId))}
          close={() => setIsShowRemoveModal(false)}
        />
      )}
    </>
  );
};

export default Organization;
