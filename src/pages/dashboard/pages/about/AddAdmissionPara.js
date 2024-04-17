// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AddAdmissionParaForm } from '../../../../components/_dashboard/about';
import { getValueByKey } from '../../../../utils/api';
// ----------------------------------------------------------------------

export default function AddAdmissionPara() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Admission Paragraphs"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'About', href: PATH_DASHBOARD.about.root },
            { name: 'Admission Paragraphs' }
          ]}
        />
        <AddAdmissionParaForm />
      </Container>
    </Page>
  );
}
