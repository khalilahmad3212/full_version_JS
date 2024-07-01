import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { DatePicker, LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
import { deleteFile, getValueByKey, uploadFile } from '../../../utils/api';
//
import axiosInstance from '../../../utils/axios';
// import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
// import BlogNewPostPreview from './AddSliderItemPreview';
import { createMyDepartment, updateMyDepartment } from '../../../redux/slices/my-department';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { SERVER } from '../../../utils/constants';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddDepartmentForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const NewBlogSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Vision: Yup.string().required('Vision is required'),
    Mission: Yup.string().required('Mission is required'),
    Objectives: Yup.string().required('Objectives is required'),
    History: Yup.string().required('Objectives is required'),
    Description: Yup.string().required('Description is required'),
    Accreditions: Yup.string().required('Accreditions is required'),
    Catagory: Yup.string().required('Catagory is required'),
    Address: Yup.string().required('Address is required'),
    Phone: Yup.string().required('Phone is required'),
    Image: Yup.mixed().required('Image is required'),
    Faculty: Yup.string().required('Faculty is required')
  });

  const formik = useFormik({
    initialValues: {
      Name: currentSlider?.Name || '',
      Vision: currentSlider?.Vision || '',
      Mission: currentSlider?.Mission || '',
      Objectives: currentSlider?.Objectives || '',
      History: currentSlider?.History || '',
      Description: currentSlider?.Description || '',
      Accreditions: currentSlider?.Accreditions || '',
      Catagory: currentSlider?.Catagory || '',
      Address: currentSlider?.Address || '',
      Phone: currentSlider?.Phone || '',
      Faculty: currentSlider?.Faculty || 'education',
      Image: isEdit ? `${SERVER}/department-images/${currentSlider?.Logo}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      if (values.file) {
        formData.append('file', values.file);
      }

      const temp = { ...values };
      delete temp.file;
      delete temp.Image;
      Object.entries(temp).forEach((entry) => {
        const [key, value] = entry;
        formData.append(key, value);
      });

      try {
        if (isEdit) {
          dispatch(updateMyDepartment(currentSlider?.Id, formData));
        } else {
          dispatch(createMyDepartment(formData));
        }
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.home.root);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('file', file);
        setFieldValue('Image', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps('Name')}
                    error={Boolean(touched.Name && errors.Name)}
                    helperText={touched.Name && errors.Name}
                  />

                  <TextField
                    fullWidth
                    label="Vision"
                    multiline
                    rows={5}
                    {...getFieldProps('Vision')}
                    error={Boolean(touched.Vision && errors.Vision)}
                    helperText={touched.Vision && errors.Vision}
                  />

                  <TextField
                    fullWidth
                    label="Mission"
                    multiline
                    rows={5}
                    {...getFieldProps('Mission')}
                    error={Boolean(touched.Mission && errors.Mission)}
                    helperText={touched.Mission && errors.Mission}
                  />

                  <TextField
                    fullWidth
                    label="Objectives"
                    {...getFieldProps('Objectives')}
                    error={Boolean(touched.Objectives && errors.Objectives)}
                    helperText={touched.Objectives && errors.Objectives}
                  />

                  <TextField
                    fullWidth
                    label="History"
                    multiline
                    rows={6}
                    {...getFieldProps('History')}
                    error={Boolean(touched.History && errors.History)}
                    helperText={touched.History && errors.History}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={5}
                    {...getFieldProps('Description')}
                    error={Boolean(touched.Description && errors.Description)}
                    helperText={touched.Description && errors.Description}
                  />
                  {/* TODO:
                    - Make it a dropdown as you have added for tags
                  */}
                  <TextField
                    fullWidth
                    label="Accreditions"
                    {...getFieldProps('Accreditions')}
                    error={Boolean(touched.Accreditions && errors.Accreditions)}
                    helperText={touched.Accreditions && errors.Accreditions}
                  />
                  {/* Also make it a dropdown */}
                  <TextField
                    fullWidth
                    label="Catagory"
                    {...getFieldProps('Catagory')}
                    error={Boolean(touched.Catagory && errors.Catagory)}
                    helperText={touched.Catagory && errors.Catagory}
                  />

                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    {...getFieldProps('Address')}
                    error={Boolean(touched.Address && errors.Address)}
                    helperText={touched.Address && errors.Address}
                  />

                  <TextField
                    fullWidth
                    label="Phone"
                    type="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    {...getFieldProps('Phone')}
                    error={Boolean(touched.Phone && errors.Phone)}
                    helperText={touched.Phone && errors.Phone}
                  />

                  <Grid item xs={12}>
                    <LabelStyle>Faculty</LabelStyle>
                    <Select
                      fullWidth
                      label="Faculty"
                      {...getFieldProps('Faculty')}
                      error={Boolean(touched.Faculty && errors.Faculty)}
                      helperText={touched.Faculty && errors.Faculty}
                    >
                      {[
                        'Management Science',
                        'Science and Information Technology',
                        'Engineering and Technology',
                        'Education'
                      ].map((department) => (
                        <MenuItem key={department} value={department.replace(/\s/g, '-').toLowerCase()}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <div>
                    <LabelStyle>Image</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.Image}
                      onDrop={handleDrop}
                      error={Boolean(touched.Image && errors.Image)}
                    />
                    {touched.Image && errors.Image && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.Image && errors.Image}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Publication' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
