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
import { getRecognition } from '../../../redux/slices/recognition';
import AddRecognitionForm from '../../../components/_dashboard/recognition/AddRecognitionForm';

// ----------------------------------------------------------------------

export default function AddRecognition() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { recognition: slider } = useSelector((state) => state.recognition);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getRecognition(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Recognition | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Recognition"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Recognition' : slider?.Title }
          ]}
        />
        {isEdit && slider && <AddRecognitionForm isEdit={isEdit} currentSlider={slider} />}
        {!isEdit && <AddRecognitionForm isEdit={isEdit} currentSlider={slider} />}
      </Container>
    </Page>
  );
}
