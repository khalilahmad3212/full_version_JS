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
import AddPublicationForm from '../../../components/_dashboard/publications/AddPublicationForm';
import { getPublication } from '../../../redux/slices/publications';

// ----------------------------------------------------------------------

export default function AddPublication() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { publication } = useSelector((state) => state.publication);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    if (isEdit) {
      dispatch(getPublication(id));
    }
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Publication"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Publication' : publication?.Title }
          ]}
        />
        {isEdit && publication && <AddPublicationForm isEdit={isEdit} currentProduct={publication} />}
        {!isEdit && <AddPublicationForm />}
      </Container>
    </Page>
  );
}
