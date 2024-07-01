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
import AddProgramForm from '../../../components/_dashboard/programs/AddProgramForm';
import { getProgram } from '../../../redux/slices/program';

// ----------------------------------------------------------------------

export default function AddProgram() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { program: slider } = useSelector((state) => state.program);
  const isEdit = pathname.includes('edit');
  // const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getProgram(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Program"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Program' : slider?.Title }
          ]}
        />
        {isEdit && slider && <AddProgramForm isEdit={isEdit} currentProduct={slider} />}
        {!isEdit && <AddProgramForm isEdit={isEdit} currentProduct={slider} />}
      </Container>
    </Page>
  );
}
