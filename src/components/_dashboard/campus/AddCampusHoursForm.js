import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Button, TextField, Typography, FormHelperText, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { updateValueById } from '../../../utils/api';
import AddLinkForm from '../about/AddLinksForm';
import { QuillEditor } from '../../editor';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddCampusHoursForm({ data, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();

  /*
    facts: [{title: 'title', description: 'description'}]
    
  */
  const NewBlogSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is required'),
    content: Yup.string().required('Content is required')
  });

  const formik = useFormik({
    initialValues: {
      heading: data?.value.heading || '',
      content: data?.value.content || ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
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
                    label="Heading"
                    {...getFieldProps('heading')}
                    error={Boolean(touched.heading && errors.heading)}
                    helperText={touched.heading && errors.heading}
                  />
                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="campus-hours-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Banner' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
