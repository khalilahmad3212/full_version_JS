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
import { AddSliderItemForm } from '../../../../components/_dashboard/home';
import { getSlider } from '../../../../redux/slices/slider';

// ----------------------------------------------------------------------

export default function AddSliderItem() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { slider } = useSelector((state) => state.slider);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getSlider(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading={!isEdit ? 'New Slider' : slider?.Title} />
        {isEdit && slider && <AddSliderItemForm isEdit={isEdit} currentProduct={slider} />}
        {!isEdit && <AddSliderItemForm isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
