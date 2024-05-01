// material
import { Container, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { UpdateHomeAdmissionForm } from '../../../../components/_dashboard/home';
import { getSlider } from '../../../../redux/slices/slider';
import { getValueByKey } from '../../../../utils/api';

// ----------------------------------------------------------------------

export default function UpdateHomeAdmission() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();

  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const res = getValueByKey('HOME_ADMISSION_DATA');
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
        <Typography variant="h4" gutterBottom>
          Admission
        </Typography>
        {data && <UpdateHomeAdmissionForm isEdit={isEdit} data={data} />}
      </Container>
    </Page>
  );
}
