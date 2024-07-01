import axios from 'axios';
// material
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import { useDispatch, useSelector } from '../../../redux/store';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import AddDepartmentForm from '../../../components/_dashboard/departments/AddDepartmentForm';
import AddSubCampusForm from '../../../components/_dashboard/sub-campus/AddSubCampusForm';
import { getDepartment } from '../../../redux/slices/my-department';

// ----------------------------------------------------------------------

export default function AddSubCampus() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchCampusData = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/campus/${id}`);
        console.log(res.data);
        setDepartment(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (isEdit) {
      fetchCampusData();
    }
  }, []);
  return (
    <Page title="Home: New Slider Item | Sukkur IBA">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Campus"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Home', href: PATH_DASHBOARD.home.root },
            { name: !isEdit ? 'New Campus' : department?.Name }
          ]}
        />
        {isEdit && department && <AddSubCampusForm isEdit={isEdit} currentProduct={department} />}
        {!isEdit && <AddSubCampusForm />}
      </Container>
    </Page>
  );
}
