// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../redux/store';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import AddDepartmentForm from '../../../components/_dashboard/departments/AddDepartmentForm';
import { getDepartment } from '../../../redux/slices/my-department';

// ----------------------------------------------------------------------

export default function AddDepartment() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { department } = useSelector((state) => state.myDepartment);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getDepartment(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Department"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Department' : department?.Name }
          ]}
        />
        {isEdit && department && <AddDepartmentForm isEdit={isEdit} currentProduct={department} />}
        {!isEdit && <AddDepartmentForm />}
      </Container>
    </Page>
  );
}
