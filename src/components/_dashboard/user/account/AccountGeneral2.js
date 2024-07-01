import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Autocomplete,
  Chip
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
import countries from '../countries';

// ----------------------------------------------------------------------

export default function AccountGeneral2() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user: currentUser, updateProfile, getProfile } = useAuth();

  const [edit, setEdit] = useState(false);

  const NewUserSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name is required'),
    LastName: Yup.string().required('Last Name is required'),
    EmployeeId: Yup.string().required('Employee ID is required'),
    Designation: Yup.string().required('Designation is required'),
    OfficeExtension: Yup.string(),
    Email: Yup.string().required('Email is required').email(),
    CMS_id: Yup.string().required('CMS ID is required'),
    Type: Yup.string().required('Type is required'),
    Skills: Yup.array().required('Skills are required'),
    CurrentStatus: Yup.string(),
    BPS: Yup.number().required('BPS is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      FirstName: currentUser?.FirstName || '',
      LastName: currentUser?.LastName || '',
      EmployeeId: currentUser?.EmployeeId || '',
      Designation: currentUser?.Designation || '',
      Department: '',
      OfficeExtension: currentUser?.OfficeExtension || '',
      OfficeAddress: currentUser?.OfficeAddress || '',
      CMS_id: currentUser?.CMS_id || '',
      Email: currentUser?.Email || '',
      Type: currentUser?.Type || '',
      Skills: currentUser?.Skills?.split(',') || [],
      photoURL: `http://localhost:5001/employee-images/${currentUser?.Image}` || null,
      isVerified: currentUser?.isVerified || true,
      Phd: currentUser?.Phd || false,
      Biography: currentUser?.Biography || '',
      Message: currentUser?.Message || '',
      CurrentStatus: currentUser?.CurrentStatus || '',
      BPS: currentUser?.BPS || null
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const formData = new FormData();
      if (values.file) {
        formData.append('file', values.file);
      } else {
        formData.append('Image', currentUser?.Image);
      }
      // skills from array to string
      let skills = '';
      values.Skills.forEach((obj, index) => {
        if (index !== 0) {
          skills += `,${obj}`;
        } else {
          skills += `${obj}`;
        }
      });
      formData.append('Skills', skills);
      formData.append('FirstName', values.FirstName);
      formData.append('LastName', values.LastName);
      formData.append('Email', values.Email);
      formData.append('Biography', values.Biography);
      formData.append('Message', values.Message);
      formData.append('Phd', values.Phd);

      try {
        updateProfile(currentUser.Id, formData);
        setSubmitting(false);
        enqueueSnackbar('Save Changes', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('file', file);
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    getProfile(8);
    setFieldValue('Department', currentUser?.Department.Name);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setFieldValue('Department', currentUser?.Department.Name);
    }
  }, [currentUser]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center', position: 'relative' }}>
              {!edit && (
                <EditIcon
                  sx={{ cursor: 'pointer', position: 'absolute', top: 12, right: 10 }}
                  onClick={() => setEdit(true)}
                />
              )}
              <UploadAvatar
                disabled={!edit}
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>

              {/* <FormControlLabel
                control={<Switch {...getFieldProps('isPublic')} color="primary" />}
                labelPlacement="start"
                label="Public Profile"
                sx={{ mt: 5 }}
              /> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, position: 'relative' }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...getFieldProps('FirstName')}
                    error={Boolean(touched.FirstName && errors.FirstName)}
                    helperText={touched.FirstName && errors.FirstName}
                    disabled={!edit}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...getFieldProps('LastName')}
                    error={Boolean(touched.LastName && errors.LastName)}
                    helperText={touched.LastName && errors.LastName}
                    disabled={!edit}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    label="Employee ID"
                    {...getFieldProps('EmployeeId')}
                    error={Boolean(touched.EmployeeId && errors.EmployeeId)}
                    helperText={touched.EmployeeId && errors.EmployeeId}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('Email')}
                    error={Boolean(touched.Email && errors.Email)}
                    helperText={touched.Email && errors.Email}
                    disabled={!edit}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    label="CMS ID"
                    {...getFieldProps('CMS_id')}
                    error={Boolean(touched.CMS_id && errors.CMS_id)}
                    helperText={touched.CMS_id && errors.CMS_id}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Designation"
                    placeholder="Designation"
                    {...getFieldProps('Designation')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.Designation && errors.Designation)}
                    helperText={touched.Designation && errors.Designation}
                    disabled
                  >
                    <option value="" />
                    {['Lecturer', 'Assistant Professor', 'Professor'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    label="Office Extension"
                    {...getFieldProps('OfficeExtension')}
                    error={Boolean(touched.OfficeExtension && errors.OfficeExtension)}
                    helperText={touched.OfficeExtension && errors.OfficeExtension}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Type"
                    placeholder="Type"
                    {...getFieldProps('Type')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.Type && errors.Type)}
                    helperText={touched.Type && errors.Type}
                    disabled
                  >
                    <option value="" />
                    {['PERMANENT', 'CONTRACTUAL'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    label="Office Address"
                    {...getFieldProps('OfficeAddress')}
                    error={Boolean(touched.OfficeAddress && errors.OfficeAddress)}
                    helperText={touched.OfficeAddress && errors.OfficeAddress}
                  />
                  <TextField
                    fullWidth
                    label="BPS"
                    disabled
                    inputProps={{ type: 'number' }}
                    {...getFieldProps('BPS')}
                    error={Boolean(touched.BPS && errors.BPS)}
                    helperText={touched.BPS && errors.BPS}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      disabled
                      label="Current Status"
                      {...getFieldProps('CurrentStatus')}
                      error={Boolean(touched.CurrentStatus && errors.CurrentStatus)}
                      helperText={touched.CurrentStatus && errors.CurrentStatus}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Autocomplete
                      fullWidth
                      multiple
                      freeSolo
                      value={values.Skills}
                      onChange={(event, newValue) => {
                        setFieldValue('Skills', newValue);
                      }}
                      options={['Teaching', 'Evaluation'].map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField {...params} label="Skills" />}
                      disabled={!edit}
                    />
                  </div>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    disabled
                    fullWidth
                    label="Department"
                    placeholder="Department"
                    {...getFieldProps('Department')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.Department && errors.Department)}
                    helperText={touched.Department && errors.Department}
                  >
                    {/* <option value="" />
                    {departments?.map((option) => (
                      <option key={option.Id} value={option.Name}>
                        {option.Name}
                      </option>
                    ))} */}
                    <option key={values.Department} value={values.Department}>
                      {values.Department}
                    </option>
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Biography"
                    {...getFieldProps('Biography')}
                    error={Boolean(touched.Biography && errors.Biography)}
                    helperText={touched.Biography && errors.Biography}
                    disabled={!edit}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Message"
                    {...getFieldProps('Message')}
                    error={Boolean(touched.Message && errors.Message)}
                    helperText={touched.Message && errors.Message}
                    disabled={!edit}
                  />
                </Stack>
                <FormControlLabel
                  labelPlacement="end"
                  disabled={!edit}
                  control={<Switch {...getFieldProps('Phd')} checked={values.Phd} />}
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        is PHD?
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, width: 1 }}
                />
                {edit && (
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Save Changes
                    </LoadingButton>
                  </Box>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
