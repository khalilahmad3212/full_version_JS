import { Outlet, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
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

import SliderItemsList from './SliderItemsList';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      label: 'Home Slider',
      link: PATH_DASHBOARD.home.sliderItems,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'About',
      link: PATH_DASHBOARD.home.about,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Mission',
      link: PATH_DASHBOARD.home.mission,
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

          {/* {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })} */}
          <Outlet />
        </Stack>
      </Container>
    </Page>
  );
}
