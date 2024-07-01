import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, TextField, Typography, FormHelperText, Autocomplete, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
// utils
import { UploadSingleFile } from '../../upload';
import { createResource, updateResource } from '../../../redux/slices/resource';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddResourceForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [departments, setDepartments] = useState([]);

  const NewBlogSchema = Yup.object({
    // Yup validation lines for Name, ShortName, and LinkLocation
    Name: Yup.string().required('Name is required'),
    ShortName: Yup.string().required('Short Name is required'),
    Link: Yup.string().required('Link is required'),
    LinkLocation: Yup.string(),
    DepartmentId: Yup.number().positive('Department is required').required('Department is required'),
    AltText: Yup.string().required('Alt text is required'),
    Image: Yup.mixed()
  });

  const getDeaprtmentsList = async () => {
    const response = await fetch('http://localhost:5001/department/list');
    const data = await response.json();
    console.log('data: ', data);
    setDepartments(data);
    return data;
  };

  useEffect(() => {
    getDeaprtmentsList();
  }, []);

  const formik = useFormik({
    initialValues: {
      // Initial values lines for Name, ShortName, and LinkLocation
      Name: currentSlider?.Name || '',
      ShortName: currentSlider?.ShortName || '',
      Link: currentSlider?.Link || '',
      LinkLocation: currentSlider?.LinkLocation || '',
      AltText: currentSlider?.AltText || '',
      DepartmentId: currentSlider?.DepartmentId || 1,
      Image: isEdit ? `http://localhost:5001/resource-images/${currentSlider?.LinkLocation}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values: ', values);
      const temp = { ...values };
      delete temp.Image;
      const formData = new FormData();
      Object.entries(temp).forEach(([key, val]) => {
        formData.append(key, val);
      });
      try {
        if (!isEdit) {
          dispatch(createResource(formData));
        } else {
          dispatch(updateResource(currentSlider?.Id, formData));
        }
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.home.root);
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
                      label="Name"
                      {...formik.getFieldProps('Name')}
                      error={Boolean(formik.touched.Name && formik.errors.Name)}
                      helperText={formik.touched.Name && formik.errors.Name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Short Name"
                      {...formik.getFieldProps('ShortName')}
                      error={Boolean(formik.touched.ShortName && formik.errors.ShortName)}
                      helperText={formik.touched.ShortName && formik.errors.ShortName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      fullWidth
                      options={['FILE', 'URL']}
                      getOptionLabel={(option) => option} // Assuming you want to use the option string itself as the label
                      renderInput={(params) => <TextField {...params} label="Link" />}
                      value={formik.values.Link}
                      onChange={(event, newValue) => {
                        setFieldValue('Link', newValue);
                      }}
                      error={Boolean(formik.touched.Link && formik.errors.Link)}
                      helperText={formik.touched.Link && formik.errors.Link}
                    />
                  </Grid>
                  {values.Link === 'URL' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Link Location"
                        {...formik.getFieldProps('LinkLocation')}
                        error={Boolean(formik.touched.LinkLocation && formik.errors.LinkLocation)}
                        helperText={formik.touched.LinkLocation && formik.errors.LinkLocation}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Alt Text"
                      {...formik.getFieldProps('AltText')}
                      error={Boolean(formik.touched.AltText && formik.errors.AltText)}
                      helperText={formik.touched.AltText && formik.errors.AltText}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="DepartmentId"
                      multiline
                      rows={4}
                      {...formik.getFieldProps('DepartmentId')}
                      error={Boolean(formik.touched.DepartmentId && formik.errors.DepartmentId)}
                      helperText={formik.touched.DepartmentId && formik.errors.DepartmentId}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <LabelStyle>Department</LabelStyle>
                    <Select
                      fullWidth
                      label="Department"
                      {...getFieldProps('DepartmentId')}
                      error={Boolean(touched.DepartmentId && errors.DepartmentId)}
                      helperText={touched.DepartmentId && errors.DepartmentId}
                    >
                      {departments?.map((department) => (
                        <MenuItem key={department.Id} value={department.Id}>
                          {department.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
                {values.Link === 'FILE' && (
                  <Stack spacing={3} mt={2}>
                    <div>
                      <LabelStyle>File</LabelStyle>
                      <UploadSingleFile
                        // maxSize={3145728}
                        // maxsize should be 50mb
                        maxSize={52428800}
                        // accept="image/*"
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
                )}
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Add Resource' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
