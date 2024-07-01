import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProfile, getProfile2 } from '../../redux/slices/user';
import { getDepartments } from '../../redux/slices/department';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';
import { myAxios } from '../../utils/axios';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [campuses, setCampuses] = useState([]);
  const { pathname } = useLocation();
  const { name } = useParams();
  const { profile } = useSelector((state) => state.user);
  const { departments } = useSelector((state) => state.department);
  const isEdit = pathname.includes('edit');
  // const currentUser = userList.find((user) => paramCase(user.name) === name);

  const getCampuses = async () => {
    try {
      const response = await myAxios.get('/campus/list');
      setCampuses(response.data);
    } catch (error) {
      console.error('Error getting campuses: ', error);
    }
  }
  useEffect(() => {
    if (isEdit) {
      dispatch(getProfile2(name));
    }
    dispatch(getDepartments());
    getCampuses();
  }, [dispatch]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'NEW USER' : 'EDIT USER'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Users', href: PATH_DASHBOARD.user.account },
            { name: !isEdit ? 'New user' : profile?.FirstName }
          ]}
        />
        {isEdit && profile && <UserNewForm
          isEdit={isEdit}
          currentUser={profile}
          departments={departments}
          campuses={campuses}
        />}
        {!isEdit && <UserNewForm
          isEdit={isEdit}
          currentUser={null}
          departments={departments}
          campuses={campuses}
        />}
      </Container>
    </Page>
  );
}
