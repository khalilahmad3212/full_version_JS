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

export default function MissionPage() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      label: 'About Banner',
      link: PATH_DASHBOARD.mission.banner,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Fact',
      link: PATH_DASHBOARD.mission.facts,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Vission',
      link: PATH_DASHBOARD.mission.vission,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Steps',
      link: PATH_DASHBOARD.mission.steps,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Page title="User: Account Settings | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: 'Page Sections' }
          ]}
        />

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
