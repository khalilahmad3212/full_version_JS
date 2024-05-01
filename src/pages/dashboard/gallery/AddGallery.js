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
import { getGallery } from '../../../redux/slices/gallery';
import AddGalleryForm from '../../../components/_dashboard/gallery/AddGalleryForm';
// ----------------------------------------------------------------------

export default function AddGallery() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id, page } = useParams();
  const { gallery: slider } = useSelector((state) => state.gallery);
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    dispatch(getGallery(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Gallery"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Gallery' : slider?.Category }
          ]}
        />

        <AddGalleryForm isEdit={isEdit} page={page} currentProduct={slider} />
      </Container>
    </Page>
  );
}
