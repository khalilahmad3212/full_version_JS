// material
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
// hooks
import useSettings from '../../../../hooks/useSettings';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UpdateHomeAdmissionForm } from '../../../../components/_dashboard/home';
import { getValueByKey } from '../../../../utils/api';

// ----------------------------------------------------------------------

export default function AddAdmissionFirst() {
  const { themeStretch } = useSettings();

  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const res = getValueByKey('ADMISSION_FIRST');
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
        <HeaderBreadcrumbs heading="What to Call it?" />

        {data && <UpdateHomeAdmissionForm data={data} isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
