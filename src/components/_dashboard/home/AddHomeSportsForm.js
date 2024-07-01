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

export default function AddHomeSportsForm({ data, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();

  /*
    facts: [{title: 'title', description: 'description'}]
    
  */
  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    Image: Yup.mixed().required('Image is required'),
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
      description: data?.value.description || '',
      Image: data?.value.Image ? `http://localhost:5001/file-data-images/${data.value.Image}` : null,
      links: data?.value.links || []
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };
      try {
        const formData = { ...data };
        if (values.file) {
          if (isEdit) {
            await deleteFile(data.value.Image, data.value.ImageId);
          }
          const fileUpload = new FormData();
          fileUpload.append('file', values.file);
          const fileData = await uploadFile(fileUpload);
          const fileMeta = {
            Image: fileData.filename,
            ImageId: fileData.id
          };
          delete temp.file;
          delete temp.Image;
          formData.value = { ...temp, ...fileMeta };
        } else {
          delete temp.file;
          delete temp.Image;
          formData.value = { ...data.value, ...temp };
        }
        formData.value = JSON.stringify(formData.value);

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

  const handleLinks = (links) => {
    setFieldValue('links', links);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3, mb: 2 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    label="description"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
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
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <AddLinkForm data={values.links} label1="Text" label2="Link" onChange={handleLinks} />
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
