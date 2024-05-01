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
import { getValueByKey } from '../../../../utils/api';
import AddCampusInfoForm from '../../../../components/_dashboard/campus/AddCampusInfoForm';
import AddTuitionFeeTableForm from '../../../../components/_dashboard/tuition-fee/AddTuitionFeeTableForm';
// ----------------------------------------------------------------------

export default function AddHomeTuition() {
  const { themeStretch } = useSettings();

  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const res = getValueByKey('HOME_TUITION_FEE');
    res.then((data) => {
      console.log('data', data);
      data.value = JSON.parse(data.value);
      console.log('parsed data: ', data);
      setData(data);
      setIsEdit(true);
    });
  }, []);

  return (
    <Page title="Home: Tuition Fee | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Tuition Fee" />
        {data && <AddTuitionFeeTableForm data={data} isEdit={isEdit} limit={2} />}
      </Container>
    </Page>
  );
}
