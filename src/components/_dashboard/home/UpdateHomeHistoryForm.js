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

export default function UpdateHomeHistoryForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();

  const NewBlogSchema = Yup.object().shape({
    percentage: Yup.number().required('Percentage is required'),
    describe: Yup.string().required('Describe Text is required'),
    job: Yup.string().required('Job Text is required'),
    percentageGraduate: Yup.number().required('Percentage Graduate is required'),
    describeGraduate: Yup.string().required('Describe Graduate Text is required'),
    jobGraduate: Yup.string().required('Job Graduate Text is required'),
    percentageUnderGraduate: Yup.number().required('Percentage Under Graduate is required'),
    describeUnderGraduate: Yup.string().required('Describe Under Graduate Text is required'),
    jobUnderGraduate: Yup.string().required('Job Under Graduate Text is required')
  });

  const formik = useFormik({
    initialValues: {
      percentage: null,
      describe: '',
      job: '',
      percentageGraduate: null,
      describeGraduate: '',
      jobGraduate: '',
      percentageUnderGraduate: null,
      describeUnderGraduate: '',
      jobUnderGraduate: ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = {
        key: data.key,
        value: JSON.stringify({
          percentage: values.percentage,
          describe: values.describe,
          job: values.job,
          percentageGraduate: values.percentageGraduate,
          describeGraduate: values.describeGraduate,
          jobGraduate: values.jobGraduate,
          percentageUnderGraduate: values.percentageUnderGraduate,
          describeUnderGraduate: values.describeUnderGraduate,
          jobUnderGraduate: values.jobUnderGraduate
        })
      };

      try {
        await updateValueById(data.id, formData);
        setSubmitting(false);
        enqueueSnackbar('Update success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getValueByKey('home-history-data');
        const value = JSON.parse(result.value);
        setFieldValue('percentage', value.percentage);
        setFieldValue('describe', value.describe);
        setFieldValue('job', value.job);

        setFieldValue('percentageGraduate', value.percentageGraduate);
        setFieldValue('describeGraduate', value.describeGraduate);
        setFieldValue('jobGraduate', value.jobGraduate);

        setFieldValue('percentageUnderGraduate', value.percentageUnderGraduate);
        setFieldValue('describeUnderGraduate', value.describeUnderGraduate);
        setFieldValue('jobUnderGraduate', value.jobUnderGraduate);

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

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
                    label="Percentage"
                    {...getFieldProps('percentage')}
                    error={Boolean(touched.percentage && errors.percentage)}
                    helperText={touched.percentage && errors.percentage}
                    type="number"
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Describe"
                    {...getFieldProps('describe')}
                    error={Boolean(touched.describe && errors.describe)}
                    helperText={touched.describe && errors.describe}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Job"
                    {...getFieldProps('job')}
                    error={Boolean(touched.job && errors.job)}
                    helperText={touched.job && errors.job}
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Percentage Graduate"
                    {...getFieldProps('percentageGraduate')}
                    error={Boolean(touched.percentageGraduate && errors.percentageGraduate)}
                    helperText={touched.percentageGraduate && errors.percentageGraduate}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Describe Graduate"
                    {...getFieldProps('describeGraduate')}
                    error={Boolean(touched.describeGraduate && errors.describeGraduate)}
                    helperText={touched.describeGraduate && errors.describeGraduate}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Job Graduate"
                    {...getFieldProps('jobGraduate')}
                    error={Boolean(touched.jobGraduate && errors.jobGraduate)}
                    helperText={touched.jobGraduate && errors.jobGraduate}
                  />
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Percentage Under Graduate"
                    {...getFieldProps('percentageUnderGraduate')}
                    error={Boolean(touched.percentageUnderGraduate && errors.percentageUnderGraduate)}
                    helperText={touched.percentageUnderGraduate && errors.percentageUnderGraduate}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Describe Under Graduate"
                    {...getFieldProps('describeGraduate')}
                    error={Boolean(touched.describeUnderGraduate && errors.describeUnderGraduate)}
                    helperText={touched.describeUnderGraduate && errors.describeUnderGraduate}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Job Under Graduate"
                    {...getFieldProps('jobUnderGraduate')}
                    error={Boolean(touched.jobUnderGraduate && errors.jobUnderGraduate)}
                    helperText={touched.jobUnderGraduate && errors.jobUnderGraduate}
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
