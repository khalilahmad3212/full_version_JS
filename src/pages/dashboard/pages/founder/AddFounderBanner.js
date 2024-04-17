// material
import { Container } from '@mui/material';
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
import { AddBannerForm } from '../../../../components/_dashboard/about';
import { getValueByKey } from '../../../../utils/api';
// ----------------------------------------------------------------------

export default function AddFounderBanner() {
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { themeStretch } = useSettings();

  useEffect(() => {
    const res = getValueByKey('FOUNDER_BANNER');
    res.then((data) => {
      console.log('data: ', data);
      data.value = JSON.parse(data.value);
      setData(data);
      setIsEdit(true);
    });
  }, []);
  return (
    <Page title="Founder: Banner | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Founder Banner" />
        {data && <AddBannerForm data={data} isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
