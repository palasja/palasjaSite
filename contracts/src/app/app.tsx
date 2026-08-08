import { Outlet, useParams } from 'react-router';
import Organization from '../organization';
import { Organization as OrgType } from '../helpers/contractTypes';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chooseOrg, getChosenchosenAction, getChosenInfo, getChosenOrganization } from '../redux/slices/orgsSlice';
import style from './app.module.css';
import { useEffect } from 'react';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import { ProtectedRoute } from '../hooks/protectedRoute';

const App = () => {
  const choosenOrg = useAppSelector(getChosenOrganization);
  const action = useAppSelector(getChosenchosenAction);
  const dispatch = useAppDispatch();
  const { data: organizations = [], isSuccess } = useGetOrganizationQuery();
  const { orgID } = useParams();
  useEffect(() => {
    if (orgID !== undefined && isSuccess) {
      const org = organizations.find((o) => o.id === parseInt(orgID)) as OrgType;
      dispatch(chooseOrg(org));
    }
  }, [organizations, choosenOrg, isSuccess]);

  const appContent = (
    <>
      <Organization />
      <>
        {choosenOrg == undefined && action == 'show'? (
          <h2>Выберите организацию</h2>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </>
    </>
  );

  return appContent;
};

const ProtectedApp = () => {
  return (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  );
};
export default ProtectedApp;
