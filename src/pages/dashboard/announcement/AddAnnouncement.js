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
import { getAnnouncement } from '../../../redux/slices/announcement';
import AddAnnouncementForm from '../../../components/_dashboard/announcement/AddAnnouncementForm';

// ----------------------------------------------------------------------

export default function AddAnnouncement() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { announcement: slider } = useSelector((state) => state.announcement);
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    dispatch(getAnnouncement(id));
  }, [dispatch]);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Announcement"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Announcement' : slider?.Title }
          ]}
        />

        <AddAnnouncementForm isEdit={isEdit} currentProduct={slider} />
      </Container>
    </Page>
  );
}
