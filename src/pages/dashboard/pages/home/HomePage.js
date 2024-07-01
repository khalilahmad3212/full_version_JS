import { Outlet, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
// icons
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import homeFill from '@iconify/icons-eva/home-fill';
import aboutFill from '@iconify/icons-eva/book-fill';
import history from '@iconify/icons-ic/history';
// material icons
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import PatternIcon from '@mui/icons-material/Pattern';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
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
      icon: <LinearScaleIcon />
    },
    {
      label: 'About',
      link: PATH_DASHBOARD.home.about,
      icon: <Icon icon={aboutFill} width={20} height={20} />
    },
    {
      label: 'History & Mission',
      link: PATH_DASHBOARD.home.mission,
      icon: <Icon icon={history} width={20} height={20} />
    },
    // {
    //   label: 'History',
    //   link: PATH_DASHBOARD.home.history,
    //   icon: <Icon icon={roundAccountBox} width={20} height={20} />
    // },
    {
      label: 'Statistics',
      link: PATH_DASHBOARD.home.statistics,
      icon: <BarChartIcon />
    },
    {
      label: 'Campus Info',
      link: PATH_DASHBOARD.home.campusInfo,
      icon: <InfoIcon />
    },
    {
      label: 'Paragraphs',
      link: PATH_DASHBOARD.home.para,
      icon: <AlignHorizontalLeftIcon />
    },
    {
      label: 'Department',
      link: PATH_DASHBOARD.home.department,
      icon: <PatternIcon />
    },
    {
      label: 'Addmision',
      link: PATH_DASHBOARD.home.admission,
      icon: <PersonAddAlt1Icon />
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
    },
    {
      label: 'Sports & Activities',
      link: PATH_DASHBOARD.home.sports,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    },
    {
      label: 'Tuition Fees',
      link: PATH_DASHBOARD.home.tuitionFees,
      icon: <Icon icon={roundAccountBox} width={20} height={20} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Page title="Home Page | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Home Page"
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
