import axios from 'axios';
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
import AddPageForm from '../../../../components/_dashboard/other/AddPageForm';
import { getValueByKey } from '../../../../utils/api';
// ----------------------------------------------------------------------

export default function AddPage() {
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { themeStretch } = useSettings();
  const { id } = useParams();
  useEffect(() => {
    const fetchPageData = async () => {
      const { data } = await axios.get(`http://localhost:5001/dynamic-page/${id}`);
      console.log('data: ', data);
      setData({ value: data });
      setIsEdit(true);
    };
    if (id) {
      fetchPageData();
    }
  }, []);
  return (
    <Page title="Founder: Banner | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Add New Page" />
        {id && data && <AddPageForm data={data} isEdit={isEdit} />}
        {!id && <AddPageForm isEdit={false} />}
      </Container>
    </Page>
  );
}
