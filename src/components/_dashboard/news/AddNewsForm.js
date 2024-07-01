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

import { createNews, updateNews } from '../../../redux/slices/news';

import { PATH_DASHBOARD } from '../../../routes/paths';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddNewsForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NewBlogSchema = Yup.object({
    Title: Yup.string().required('Title is required').max(100, 'Title can not be longer than 100 characters'),
    // Date: Yup.date().required('Date is required'),
    Heading: Yup.string().nullable().max(100, 'Heading can not be longer than 100 characters'),
    Descripiton: Yup.string().nullable().max(1000, 'Descripiton can not be longer than 1000 characters'),
    Image: Yup.mixed().required('Image URL is required'),
    Sort: Yup.number().required('Sort order is required').integer('Sort order must be an integer')
  });

  const formik = useFormik({
    initialValues: {
      Title: currentSlider?.Title || '',
      // Date: currentSlider?.Date || null,
      Heading: currentSlider?.Heading || '', // Make sure to match the property name (Heading vs Headings)
      Descripiton: currentSlider?.Descripiton || '',
      Image: isEdit ? `http://localhost:5001/news-images/${currentSlider?.Image}` : '',
      Sort: currentSlider?.Sort || ''
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
          dispatch(createNews(formData));
        } else {
          dispatch(updateNews(currentSlider?.Id, formData));
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.news);
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
                  {/* 
                  TODO: Add date picker
                  <Grid item xs={12}>
                    <DatePicker
                      label="Date"
                      value={formik.values.Date}
                      onChange={(value) => formik.setFieldValue('Date', value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(formik.touched.Date && formik.errors.Date)}
                          helperText={formik.touched.Date && formik.errors.Date}
                        />
                      )}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Heading"
                      {...formik.getFieldProps('Heading')}
                      error={Boolean(formik.touched.Heading && formik.errors.Heading)}
                      helperText={formik.touched.Heading && formik.errors.Heading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      {...formik.getFieldProps('Descripiton')}
                      error={Boolean(formik.touched.Descripiton && formik.errors.Descripiton)}
                      helperText={formik.touched.Descripiton && formik.errors.Descripiton}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sort Order"
                      type="number"
                      {...formik.getFieldProps('Sort')}
                      error={Boolean(formik.touched.Sort && formik.errors.Sort)}
                      helperText={formik.touched.Sort && formik.errors.Sort}
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

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create News' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
