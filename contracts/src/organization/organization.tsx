import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
  getChosenOrganization,
  getOrganisationError,
  getChangingOrganization,
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
import { Organization as Org } from '../helpers/contractTypes';

const Organization = () => {
  const dispatch = useAppDispatch();
  const changingOrganization = useAppSelector(getChangingOrganization);
  const errors = useAppSelector(getOrganisationError);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const [deleteOrganization, { isLoading: isDeleteLoading }] = useDeleteOrganizationMutation();
  const [_, { isLoading: isUpdateLoading }] = useUpdateOrganizationMutation();
  const [__, { isLoading: isAddLoading }] = useAddOrganizationMutation();
  // const [organization, setOrganization] = useState<Org | undefined>();
  const {
    data: organizations = [],
    isLoading: isGetLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationQuery();

  const page = (
    <>
      <h2>Организации</h2>
      <h3>{errors}</h3>
      <OrganizationForm />
      {organizations.length == 0 ? (
        <>
          <h2>Список организаций не загружен</h2>
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
                  Переименовать
                </button>
              </li>
            );
          })}
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

  return isGetLoading || isUpdateLoading || isAddLoading || isDeleteLoading ? <Loading /> : page;
};

export default Organization;
