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

export default function UpdateHomeAboutForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();

  const NewBlogSchema = Yup.object().shape({
    about: Yup.string().required('About Text is required')
  });

  const formik = useFormik({
    initialValues: {
      about: ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = {
        key: data.key,
        value: values.about
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
        const result = await getValueByKey('About-the-University');
        console.log(result);
        setFieldValue('about', result.value);
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
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="About University"
                    {...getFieldProps('about')}
                    error={Boolean(touched.about && errors.about)}
                    helperText={touched.about && errors.about}
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
