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
import { getResource } from '../../../redux/slices/resource';
import AddSemesterForm from '../../../components/_dashboard/semester/AddSemesterForm';
// ----------------------------------------------------------------------

export default function AddSemester() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { resource: slider } = useSelector((state) => state.resource);
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    dispatch(getResource(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Resource"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Resource' : slider?.ShortName }
          ]}
        />

        <AddSemesterForm isEdit={isEdit} currentProduct={slider} />
      </Container>
    </Page>
  );
}
