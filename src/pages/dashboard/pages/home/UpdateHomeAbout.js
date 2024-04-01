// material
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UpdateHomeAboutForm } from '../../../../components/_dashboard/home';

// ----------------------------------------------------------------------

export default function UpdateHomeAbout() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" gutterBottom>
          About University Info
        </Typography>
        <UpdateHomeAboutForm />
      </Container>
    </Page>
  );
}
