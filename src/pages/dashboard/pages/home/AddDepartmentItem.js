import { useLocation } from 'react-router';
// material
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../../hooks/useSettings';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AddDepartmentItemForm } from '../../../../components/_dashboard/home';

// ----------------------------------------------------------------------

export default function AddDepartmentItem() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Add New Program" />
        <AddDepartmentItemForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
