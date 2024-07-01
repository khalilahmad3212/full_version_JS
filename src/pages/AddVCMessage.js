// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
import { useDispatch, useSelector } from '../redux/store';

// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { getValueByKey } from '../utils/api';
import AddVCMessageForm from '../components/_dashboard/vc-message/AddVCMessageForm';
// ----------------------------------------------------------------------

export default function AddVCMessage() {
  const { themeStretch } = useSettings();

  const [data, setData] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const res = getValueByKey('VC_MESSAGE');
    res.then((data) => {
      console.log('data', data);
      data.value = JSON.parse(data.value);
      console.log('parsed data: ', data);

      setData(data);
    }).catch((error) => {
      console.error('error', error);
    });
  }, []);

  return (
    <Page title="About: Paragraphs | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="VC Message" />
        {data && <AddVCMessageForm data={data} isEdit={true} />}
      </Container>
    </Page>
  );
}
