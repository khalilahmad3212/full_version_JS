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
import { getEducation } from '../../../redux/slices/education';
import AddRecognitionForm from '../../../components/_dashboard/recognition/AddRecognitionForm';
import AddEducationForm from '../../../components/_dashboard/education/AddEducationForm';

// ----------------------------------------------------------------------

export default function AddRecognition() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { education: slider } = useSelector((state) => state.education);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getEducation(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Recognition | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Education"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Education' : slider?.Title }
          ]}
        />

        <AddEducationForm isEdit={isEdit} currentSlider={slider} />
      </Container>
    </Page>
  );
}
