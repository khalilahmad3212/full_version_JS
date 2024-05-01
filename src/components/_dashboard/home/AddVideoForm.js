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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
//
import axios from 'axios';
import axiosInstance from '../../../utils/axios';
import { deleteFile, getValueByKey, uploadFile } from '../../../utils/api';
// import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
import BlogNewPostPreview from './AddSliderItemPreview';
import { createSlider, updateSlider } from '../../../redux/slices/slider';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddVideoForm({ isEdit, data }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewBlogSchema = Yup.object().shape({
    videoLink: Yup.string().required('Video Link is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      videoLink: data?.value?.videoLink || '',
      Image: `http://localhost:5001/file-data-images/${data?.value?.Image}`
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const fileUpload = new FormData();
      fileUpload.append('file', values.file);

      try {
        const formData = { ...data };
        let value = {};
        if (values.file) {
          await deleteFile(data.value.Image, data.value.ImageId);
          const fileData = await uploadFile(fileUpload);
          value = {
            ...data.value,
            Image: fileData.filename,
            ImageId: fileData.id
          };
        } else {
          console.log('file not selected');
          value = {
            ...data.value
          };
        }

        value.videoLink = values.videoLink;
        formData.value = JSON.stringify(value);
        console.log('updated content: ', formData);
        const response2 = await axios.patch(`http://localhost:5001/map-resources/${data.id}`, formData);
        console.log('Map Resource Updated: ', response2);
        setSubmitting(false);
        enqueueSnackbar('Update success', { variant: 'success' });
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
                  <div>
                    <TextField
                      fullWidth
                      label="Video Link"
                      {...getFieldProps('videoLink')}
                      error={Boolean(touched.videoLink && errors.videoLink)}
                      helperText={touched.videoLink && errors.videoLink}
                    />
                  </div>
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
