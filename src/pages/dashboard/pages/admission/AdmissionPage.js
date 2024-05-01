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

export default function AdmissionPage() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      label: 'Admission Banner',
      link: PATH_DASHBOARD.admission.banner,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Admission Paras',
      link: PATH_DASHBOARD.admission.admissionParas,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Facts',
      link: PATH_DASHBOARD.admission.facts,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'First Section',
      link: PATH_DASHBOARD.admission.first,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Second Section',
      link: PATH_DASHBOARD.admission.second,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Page title="Admission: Sukkur IBA University">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Admission Page" />

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
