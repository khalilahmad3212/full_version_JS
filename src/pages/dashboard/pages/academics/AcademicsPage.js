import { Outlet, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// redux
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function AcademicsPage() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      label: 'About Banner',
      link: PATH_DASHBOARD.about.banner,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Admission Paras',
      link: PATH_DASHBOARD.about.admissionParas,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Gallery',
      link: PATH_DASHBOARD.about.gallery,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'History',
      link: PATH_DASHBOARD.home.history,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Campus Info',
      link: PATH_DASHBOARD.home.campusInfo,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Department',
      link: PATH_DASHBOARD.home.department,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Addmision',
      link: PATH_DASHBOARD.home.admission,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'How To Apply',
      link: PATH_DASHBOARD.home.howToApply,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Scholarship',
      link: PATH_DASHBOARD.home.scholarship,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Page title="Academics: Sukkur IBA University">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Academics Page" />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.label} label={capitalCase(tab.label)} icon={tab.icon} value={tab.link} />
            ))}
          </Tabs>
          <Outlet />
        </Stack>
      </Container>
    </Page>
  );
}
