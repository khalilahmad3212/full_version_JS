// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../../../redux/store';

// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { getValueByKey } from '../../../../../utils/api';
import AddSyndicateForm from '../../../../../components/_dashboard/authorities/syndicate/AddSyndicateForm';
// ----------------------------------------------------------------------

export default function AddSenate() {
  const { themeStretch } = useSettings();

  const [data, setData] = useState(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const res = getValueByKey('AUTHORITIES_SENATE');
    res.then((data) => {
      console.log('data', data);
      data.value = JSON.parse(data.value);
      console.log('parsed data: ', data);

      if (id && isEdit) {
        const temp = data.value.filter((item) => item.id === +id);
        console.log('temp', temp);
        setCurrentItem(temp[0]);
      }

      setData(data);
    }).catch((error) => {
      console.error('error', error);
    });
  }, []);

  return (
    <Page title="About: Paragraphs | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Senate" />
        {id && isEdit && data && <AddSyndicateForm data={data} isEdit={isEdit} currentItem={currentItem} />}
        {data && !isEdit && <AddSyndicateForm data={data} />}
      </Container>
    </Page>
  );
}
