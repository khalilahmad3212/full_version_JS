import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, TextField, Typography, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
// utils
import { UploadSingleFile } from '../../upload';

import { createAnnouncement, updateAnnouncement } from '../../../redux/slices/announcement';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddAnnouncementForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const NewBlogSchema = Yup.object({
    Title: Yup.string().required('Title is required').max(100, 'Title can not be longer than 100 characters'),
    // StartDate: Yup.date().required('End Date is required'),
    // EndDate: Yup.date().required('Start Date is required'),
    Description: Yup.string().nullable().max(1000, 'Description can not be longer than 1000 characters'),
    Image: Yup.mixed().required('Image URL is required')
  });

  const formik = useFormik({
    initialValues: {
      Title: currentSlider?.Title || '',
      // Date: currentSlider?.Date || null,
      Description: currentSlider?.Description || '',
      Image: isEdit ? `http://localhost:5001/announcement-images/${currentSlider?.File}` : null
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
          dispatch(createAnnouncement(formData));
        } else {
          dispatch(updateAnnouncement(currentSlider?.Id, formData));
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
                    <TextField
                      fullWidth
                      label="Title"
                      {...formik.getFieldProps('Title')}
                      error={Boolean(formik.touched.Title && formik.errors.Title)}
                      helperText={formik.touched.Title && formik.errors.Title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      {...formik.getFieldProps('Description')}
                      error={Boolean(formik.touched.Description && formik.errors.Description)}
                      helperText={formik.touched.Description && formik.errors.Description}
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
                  {!isEdit ? 'Create Announcement' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
