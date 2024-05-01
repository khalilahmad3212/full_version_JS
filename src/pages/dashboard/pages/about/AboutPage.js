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

export default function HomePage() {
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
      label: 'About Paragraphs',
      link: PATH_DASHBOARD.about.admissionParas,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Gallery',
      link: PATH_DASHBOARD.about.gallery,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Statistics',
      link: PATH_DASHBOARD.about.facts,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'History',
      link: PATH_DASHBOARD.about.history,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Mission & Value',
      link: PATH_DASHBOARD.about.mission,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Video',
      link: PATH_DASHBOARD.about.video,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Page title="About">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="About" />

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
