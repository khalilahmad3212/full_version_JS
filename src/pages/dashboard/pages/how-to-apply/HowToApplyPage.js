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

export default function HowToApplyPage() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      label: 'Banner',
      link: PATH_DASHBOARD.howToApply.banner,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Paragraphs',
      link: PATH_DASHBOARD.howToApply.paras,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Process',
      link: PATH_DASHBOARD.howToApply.process,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Requirements',
      link: PATH_DASHBOARD.howToApply.requirements,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Page title="How To Apply: Sukkur IBA University">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="How To Apply Page" />

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
