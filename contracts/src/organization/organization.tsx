import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  chooseOrg,
  changingOrg,
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

const Organization = () => {
  const dispatch = useAppDispatch();
  const changingOrganization = useAppSelector(getChangingOrganization);
  const errors = useAppSelector(getOrganisationError);
  const { isShowRemoveModal, setIsShowRemoveModal, removeId, setRemoveId } = useRemoveEntity();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const { data: organizations = [], isLoading, isFetching } = useGetOrganizationQuery();

  const page = (
    <>
      <h3>Организации</h3>
      <h4>{errors}</h4>
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
