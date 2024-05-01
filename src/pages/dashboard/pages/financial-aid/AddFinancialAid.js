// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
// hooks
import useSettings from '../../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AddBannerForm } from '../../../../components/_dashboard/about';
import { getValueByKey } from '../../../../utils/api';
import AddFinancialAidForm from '../../../../components/_dashboard/financial-aid/AddFinancialAidForm';
// ----------------------------------------------------------------------

export default function AddFinancialAid() {
  const [data, setData] = useState(null);
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit');

  useEffect(async () => {
    try {
      const data = await getValueByKey('FINANCIAL_AID_TYPE');
      data.value = JSON.parse(data.value);
      console.log('parsedData: ', data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <Page title="Financial Aid: Banner | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Financial Aid Type" />
        {data && <AddFinancialAidForm data={data} isEdit={isEdit} index={id} />}
      </Container>
    </Page>
  );
}
