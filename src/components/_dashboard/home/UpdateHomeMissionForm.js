import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
// utils

import { getValueByKey, updateValueById } from '../../../utils/api';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function UpdateHomeMissionForm({ data, isEdit, label1, label2 }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewBlogSchema = Yup.object().shape({
    History: Yup.string().required('History Text is required'),
    Mission: Yup.string().required('Mission Text is required')
  });

  const formik = useFormik({
    initialValues: {
      History: data?.value.History || '',
      Mission: data?.value.Mission || ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('values', values);
      try {
        if (isEdit) {
          const formData = { ...data };
          formData.value = JSON.stringify(values);
          updateValueById(data.id, formData);
        }
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const result = await getValueByKey('home-overview');
  //       const value = JSON.parse(result.value);
  //       setFieldValue('History', value.History);
  //       setFieldValue('Mission', value.Mission);
  //       setData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);
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
                    multiline
                    minRows={3}
                    maxRows={5}
                    label={label1 ?? 'History'}
                    {...getFieldProps('History')}
                    error={Boolean(touched.History && errors.History)}
                    helperText={touched.History && errors.History}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label={label2 ?? 'Mission'}
                    {...getFieldProps('Mission')}
                    error={Boolean(touched.Mission && errors.Mission)}
                    helperText={touched.Mission && errors.Mission}
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
