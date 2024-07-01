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

import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
// utils
import { deleteFile, getValueByKey, uploadFile } from '../../../../utils/api';
import { UploadSingleFile } from '../../../upload';
import { myAxios } from '../../../../utils/axios';
import { SERVER } from '../../../../utils/constants';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddSyndicateForm({ data, currentItem, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const NewBlogSchema = Yup.object().shape({
    Role: Yup.string().required('Title is required'),
    Name: Yup.array().required('Name is required'),
    Status: Yup.string().required('Link is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      Role: currentItem?.Role || '',
      Name: currentItem?.Name || [],
      Status: currentItem?.Status || '',
      Image: isEdit ? `${SERVER}/file-data-images/${currentItem?.Image}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const fileUpload = new FormData();
      fileUpload.append('file', values.file);

      try {
        const formData = { key: data.key };
        let fileData;
        let fileMeta = {};
        if (values.file) {
          if (isEdit) {
            await deleteFile(data.value.Image, data.value.ImageId);
          }
          fileData = await uploadFile(fileUpload);
          fileMeta = {
            Image: fileData.filename,
            ImageId: fileData.id
          };
        }
        if (isEdit) {
          const temp = [...data.value];
          const index = temp.findIndex((obj) => obj.id === +id);

          if (index !== -1) {
            // Object found, update it
            temp[index] = {
              ...temp[index],
              ...fileMeta,
              Role: values.Role,
              Name: values.Name,
              Status: values.Status
            };
            formData.value = JSON.stringify(temp);
          } else {
            // Object not found, handle accordingly (throw an error, log a message, etc.)
            console.error(`Object with ID ${id} not found`);
          }
        } else {
          const temp = [...data.value];

          const newItem = {
            id: temp.length + 1,
            ...fileMeta,
            Role: values.Role,
            Name: values.Name,
            Status: values.Status
          };
          temp.push(newItem);
          formData.value = JSON.stringify(temp);
          console.log('from data: ', formData);
        }

        const response = await myAxios.patch(`/map-resources/${data.id}`, formData);
        console.log('Map Resource Updated: ', response);

        resetForm();
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
                    label="Role"
                    {...getFieldProps('Role')}
                    error={Boolean(touched.Role && errors.Role)}
                    helperText={touched.Role && errors.Role}
                  />

                  <div style={{ flex: 1 }}>
                    <Autocomplete
                      fullWidth
                      multiple
                      freeSolo
                      value={values.Name}
                      onChange={(event, newValue) => {
                        setFieldValue('Name', newValue);
                      }}
                      options={['Name'].map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          option &&
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField {...params} label="Name" />}
                    />
                  </div>

                  <TextField
                    fullWidth
                    label="Status"
                    {...getFieldProps('Status')}
                    error={Boolean(touched.Status && errors.Status)}
                    helperText={touched.Status && errors.Status}
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
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Slider' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
