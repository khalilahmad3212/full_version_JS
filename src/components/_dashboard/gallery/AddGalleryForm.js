import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, TextField, Typography, FormHelperText, Autocomplete } from '@mui/material';
import { useDispatch } from 'react-redux';
// utils
import { UploadSingleFile } from '../../upload';
import { createGallery, updateGallery } from '../../../redux/slices/gallery';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddGalleryForm({ isEdit, currentProduct: currentSlider, page }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const NewBlogSchema = Yup.object({
    Type: Yup.string().required('Type is required'),
    DepartmentId: Yup.number().positive('Department is required').required('Department is required'),
    AltText: Yup.string().required('Alt text is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      Type: currentSlider?.Type || '',
      AltText: currentSlider?.AltText || '',
      DepartmentId: currentSlider?.DepartmentId || 1,
      Image: isEdit ? `http://localhost:5001/gallery-images/${currentSlider?.Name}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };
      delete temp.Image;
      const formData = new FormData();
      Object.entries(temp).forEach(([key, val]) => {
        formData.append(key, val);
      });
      try {
        if (!isEdit) {
          formData.append('Page', page);
          dispatch(createGallery(formData));
        } else {
          dispatch(updateGallery(currentSlider?.Id, formData));
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      fullWidth
                      options={['IMAGE', 'VIDEO']}
                      getOptionLabel={(option) => option} // Assuming you want to use the option string itself as the label
                      renderInput={(params) => <TextField {...params} label="Type" />}
                      value={formik.values.Type}
                      onChange={(event, newValue) => {
                        setFieldValue('Type', newValue);
                      }}
                      error={Boolean(formik.touched.Type && formik.errors.Type)}
                      helperText={formik.touched.Type && formik.errors.Type}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Alt Text"
                      {...formik.getFieldProps('AltText')}
                      error={Boolean(formik.touched.AltText && formik.errors.AltText)}
                      helperText={formik.touched.AltText && formik.errors.AltText}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="DepartmentId"
                      multiline
                      rows={4}
                      {...formik.getFieldProps('DepartmentId')}
                      error={Boolean(formik.touched.DepartmentId && formik.errors.DepartmentId)}
                      helperText={formik.touched.DepartmentId && formik.errors.DepartmentId}
                    />
                  </Grid>
                </Grid>
                <Stack spacing={3}>
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

            <Grid item xs={12} md={4}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Gallery' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
