import axios from 'axios';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
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
// utils
// import fakeRequest from '../../../utils/fakeRequest';
import { deleteFile, getValueByKey, updateValueById, uploadFile } from '../../../utils/api';
import { UploadSingleFile } from '../../upload';
import { QuillEditor } from '../../editor';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddPageForm({ data, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();
  // const [data, setData] = useState();
  // const [isEdit, setIsEdit] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    Image: Yup.mixed().required('Image is required'),
    link: Yup.string().required('Link is required'),
    content: Yup.string().required('Content is required')
  });

  const formik = useFormik({
    initialValues: {
      title: data?.value.name || '',
      description: data?.value.description || '',
      content: data?.value.content || '',
      link: data?.value.link || '',
      Image: data?.value.image ? `http://localhost:5001/dynamic-page-images/${data.value.image}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };

      delete temp.Image;
      delete temp.file;

      try {
        const formData = new FormData();
        if (!values.file) {
          temp.image = data.value.Image;
        } else {
          formData.append('file', values.file);
        }
        formData.append('name', values.title);
        formData.append('description', values.description);
        formData.append('link', values.link);
        formData.append('content', values.content);
        if (isEdit) {
          const res = await axios.patch(`http://localhost:5001/dynamic-page/${data.value.Id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('res: ', res);
        } else {
          const res = await axios.post('http://localhost:5001/dynamic-page', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('res: ', res);
        }
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error) {
        alert('hello');
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

  useEffect(() => {
    console.log('first: ', data);
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

                  <TextField
                    fullWidth
                    label="Link"
                    {...getFieldProps('link')}
                    error={Boolean(touched.link && errors.link)}
                    helperText={touched.link && errors.link}
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
