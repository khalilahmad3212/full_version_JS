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

export default function AddHomeProgramsPara() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const res = getValueByKey('HOME_PROGRAMS_PARA');
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
        <HeaderBreadcrumbs heading="Programs Paragraphs" />
        {data && <UpdateHomeMissionForm data={data} isEdit={isEdit} label1="Paragraph" label2="Paragraph" />}
      </Container>
    </Page>
  );
}
