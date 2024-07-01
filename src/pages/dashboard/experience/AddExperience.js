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
import AddExperienceForm from '../../../components/_dashboard/experiences/AddExperienceForm';
import { getExperience } from '../../../redux/slices/experience';

// ----------------------------------------------------------------------

export default function AddExperience() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { experience: slider } = useSelector((state) => state.experience);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getExperience(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Expeience"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Experiences', href: PATH_DASHBOARD.experience },
            { name: !isEdit ? 'New Experience' : slider?.Position }
          ]}
        />
        {isEdit && slider && <AddExperienceForm isEdit={isEdit} currentProduct={slider} />}
        {!isEdit && <AddExperienceForm isEdit={isEdit} currentProduct={slider} />}
      </Container>
    </Page>
  );
}
