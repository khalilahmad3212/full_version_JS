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
import AddAcademicStudyAreasForm from '../../../../components/_dashboard/academics/AddAcademicStudyAreasForm';
// ----------------------------------------------------------------------

export default function AddAcademicStudyAreas() {
  const [data, setData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { themeStretch } = useSettings();

  useEffect(() => {
    const res = getValueByKey('ACADEMIC_STUDY_AREAS');
    res.then((data) => {
      console.log('data: ', data);
      data.value = JSON.parse(data.value);
      setData(data);
      setIsEdit(true);
    });
  }, []);
  return (
    <Page title="About: Banner | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Sports & Activites" />
        {data && <AddAcademicStudyAreasForm data={data} isEdit={isEdit} />}
      </Container>
    </Page>
  );
}
