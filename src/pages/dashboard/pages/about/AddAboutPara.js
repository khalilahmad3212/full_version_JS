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
import { AddParaForm } from '../../../../components/_dashboard/about';
import { getValueByKey } from '../../../../utils/api';
// ----------------------------------------------------------------------

export default function AddAboutPara() {
  const { themeStretch } = useSettings();

  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const res = getValueByKey('about-overview-paras');
    res.then((data) => {
      console.log('data', data);
      data.value = JSON.parse(data.value);
      console.log('data', data);
      setData(data);
      setIsEdit(true);
    });
  }, []);

  return (
    <Page title="About: Paragraphs | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="About Paragraphs" />
        {data && <AddParaForm data={data} isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
