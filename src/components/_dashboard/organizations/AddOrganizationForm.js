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
  FormControlLabel
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
import { createOrganization, updateOrganization } from '../../../redux/slices/organization';
import { PATH_DASHBOARD } from '../../../routes/paths';

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

export default function AddOrganizationForm({ isEdit, currentProduct: currentSlider }) {
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
    History: Yup.string().required('Objectives is required'),
    Description: Yup.string().required('Description is required'),
    Founder: Yup.string().required('Founder is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      Name: currentSlider?.Name || '',
      Vision: currentSlider?.Vision || '',
      Mission: currentSlider?.Mission || '',
      History: currentSlider?.History || '',
      Description: currentSlider?.Description || '',
      Founder: currentSlider?.Founder || '',
      Image: isEdit ? `http://localhost:5001/organization-images/${currentSlider?.Logo}` : null
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
          dispatch(updateOrganization(currentSlider?.Id, formData));
        } else {
          dispatch(createOrganization(formData));
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.organizations);
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
                    {...getFieldProps('Vision')}
                    error={Boolean(touched.Vision && errors.Vision)}
                    helperText={touched.Vision && errors.Vision}
                  />

                  <TextField
                    fullWidth
                    label="Mission"
                    {...getFieldProps('Mission')}
                    error={Boolean(touched.Mission && errors.Mission)}
                    helperText={touched.Mission && errors.Mission}
                  />

                  <TextField
                    fullWidth
                    label="History"
                    {...getFieldProps('History')}
                    error={Boolean(touched.History && errors.History)}
                    helperText={touched.History && errors.History}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    {...getFieldProps('Description')}
                    error={Boolean(touched.Description && errors.Description)}
                    helperText={touched.Description && errors.Description}
                  />

                  <TextField
                    fullWidth
                    label="Founder"
                    {...getFieldProps('Founder')}
                    error={Boolean(touched.Founder && errors.Founder)}
                    helperText={touched.Founder && errors.Founder}
                  />

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
