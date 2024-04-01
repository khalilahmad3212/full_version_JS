import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
//
import axios from 'axios';
import axiosInstance from '../../../utils/axios';
// import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
import { createProgram, updateProgram } from '../../../redux/slices/program';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------
const TAGS_OPTION = ['UNDERGRADUATE', 'GRADUATE', 'POSTGRADUATE', 'FOUNDATION', 'SUMMER', 'WINTER'];
export default function AddProgramForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenPreview = () => {
    setOpen(true);
  };

  const NewBlogSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Duration: Yup.string().required('Duration is required'),
    Link: Yup.string().required('Link is required'),
    Description: Yup.string().required('Description Text is required'),
    Coordinator: Yup.string().required('Coordinator Text is required')
  });

  const formik = useFormik({
    initialValues: {
      Name: currentSlider?.Name || '',
      Duration: currentSlider?.Duration || '',
      Link: currentSlider?.Link || '',
      Description: currentSlider?.Description || '',
      Coordinator: currentSlider?.Coordinator || ''
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
      // Object.entries(temp).forEach((entry) => {
      //   const [key, value] = entry;
      //   formData.append(key, value);
      // });
      try {
        if (!isEdit) {
          dispatch(createProgram(temp));
        } else {
          dispatch(updateProgram(currentSlider?.Id, temp));
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
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    freeSolo
                    value={values.Name}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => {
                      setFieldValue('Name', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderInput={(params) => <TextField {...params} label="Select Name" />}
                  />

                  <TextField
                    fullWidth
                    label="Heading"
                    {...getFieldProps('Duration')}
                    error={Boolean(touched.Duration && errors.Duration)}
                    helperText={touched.Duration && errors.Duration}
                  />

                  <TextField
                    fullWidth
                    label="Link"
                    {...getFieldProps('Link')}
                    error={Boolean(touched.Link && errors.Link)}
                    helperText={touched.Link && errors.Link}
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
                    label="Coordinator"
                    {...getFieldProps('Coordinator')}
                    error={Boolean(touched.Coordinator && errors.Coordinator)}
                    helperText={touched.Coordinator && errors.Coordinator}
                  />

                  {/* <div>
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
                  </div> */}
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  />

                  <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaDescription')}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('metaKeywords', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Meta keywords" />}
                  />
                </Stack>
              </Card> */}

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Slider' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
