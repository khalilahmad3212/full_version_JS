import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Button, TextField, Typography, FormHelperText, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { deleteFile, updateValueById, uploadFile } from '../../../utils/api';
import AddLinkForm from '../about/AddLinksForm';
import { UploadSingleFile } from '../../upload';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddGraduateFeeForm({ data, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();

  /*
    facts: [{title: 'title', description: 'description'}]
    
  */
  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    links: Yup.array().of(
      Yup.object().shape({
        link: Yup.string().required('Link is required'),
        text: Yup.string().required('Text is required')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      title: data?.value.title || '',
      links: data?.value.links || []
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = { ...data };

        formData.value = JSON.stringify(values);

        if (isEdit) {
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

  const handleLinks = (links) => {
    setFieldValue('links', links);
  };

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
                    label="Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Stack>
                <Stack spacing={3}>
                  <AddLinkForm
                    label1="Program"
                    label2="Fee"
                    buttonText="Add Program"
                    data={values.links}
                    onChange={handleLinks}
                  />
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
