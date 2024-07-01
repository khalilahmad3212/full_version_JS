// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AddHowToApplyItemForm } from '../../../../components/_dashboard/home';
import { getSlider } from '../../../../redux/slices/slider';

// ----------------------------------------------------------------------

export default function AddHowToApplyItem() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getSlider(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="How to Apply"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.howToApply },
            { name: 'New Item' }
          ]}
        />
        <AddHowToApplyItemForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
