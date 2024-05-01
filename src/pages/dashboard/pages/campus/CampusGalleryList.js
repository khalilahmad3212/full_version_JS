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
import { AddGalleryForm } from '../../../../components/_dashboard/about';
import { getValueByKey, getGallery } from '../../../../utils/api';
import GalleryList from '../../gallery/GalleryList';
// ----------------------------------------------------------------------

export default function CampusGalleryList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Campus Gallery" />
        <GalleryList type="campus" />
      </Container>
    </Page>
  );
}
