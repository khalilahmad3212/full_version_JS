import { useEffect, useState } from 'react';
// material
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UpdateHomeMissionForm } from '../../../../components/_dashboard/home';
import { getValueByKey } from '../../../../utils/api';

// ----------------------------------------------------------------------

export default function UpdateHomeMission() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const res = getValueByKey('home-overview');
    res.then((data) => {
      console.log('data', data);
      data.value = JSON.parse(data.value);
      console.log('parsed data: ', data);
      setData(data);
      setIsEdit(true);
    });
  }, []);

  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="University Mission" />
        {data && <UpdateHomeMissionForm data={data} isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
