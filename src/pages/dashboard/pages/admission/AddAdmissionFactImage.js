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
import AddAdmissionFactImageForm from '../../../../components/_dashboard/admission/AddAdmissionFactImageForm';
// ----------------------------------------------------------------------

export default function AddAdmissionFactImage() {
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { themeStretch } = useSettings();

  useEffect(async () => {
    try {
      const data = await getValueByKey('ADMISSION_FACT_IMAGE');
      data.value = JSON.parse(data.value);
      setData(data);
      setIsEdit(true);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <Page title="Admission: Banner | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Facts Image" />
        {data && <AddAdmissionFactImageForm data={data} isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
