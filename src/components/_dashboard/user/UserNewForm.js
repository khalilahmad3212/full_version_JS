import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  Autocomplete,
  Chip
} from '@mui/material';
import { useDispatch } from 'react-redux';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import { createUser, updateUser } from '../../../redux/slices/user';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser, departments }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const NewUserSchema = Yup.object().shape({
    FirstName: Yup.string().required('First Name is required'),
    LastName: Yup.string().required('Last Name is required'),
    EmployeeId: Yup.string().required('Employee ID is required'),
    Designation: Yup.string().required('Designation is required'),
    OfficeExtension: Yup.string().required('Office Extension is required'),
    Email: Yup.string().required('Email is required').email(),
    CMS_id: Yup.string().required('CMS ID is required'),
    Type: Yup.string().required('Type is required'),
    Skills: Yup.array().required('Skills are required'),
    CurrentStatus: Yup.string().required('Current Status is required'),
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
      avatarUrl: `http://localhost:5001/employee-images/${currentUser?.Image}` || null,
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

      const dptId = departments.filter((obj) => obj.Name === values.Department)[0].Id;
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
      const copiedObject = { ...values, Department: dptId };
      delete copiedObject.file;
      delete copiedObject.avatarUrl;
      delete copiedObject.Skills;
      delete copiedObject.isVerified;

      try {
        if (!isEdit) {
          dispatch(createUser(formData));
        } else {
          formData.delete('Message');
          Object.keys(copiedObject).forEach((key) => {
            formData.append(key, copiedObject[key]);
          });
          Array.from(formData.entries()).forEach((e) => {
            console.log(e[0], ' : ', e[1]);
          });
          dispatch(updateUser(currentUser?.Id, formData));
        }
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('file', file);
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    if (currentUser) {
      let department = departments?.filter((obj) => obj.Id === currentUser?.Department.Id);
      department = department ? department[0]?.Name : '';
      setFieldValue('Department', department);
    }
  }, [currentUser, departments]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              </Box>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) => setFieldValue('status', event.target.checked ? 'banned' : 'active')}
                      checked={values.status !== 'active'}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <FormControlLabel
                labelPlacement="start"
                control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...getFieldProps('FirstName')}
                    error={Boolean(touched.FirstName && errors.FirstName)}
                    helperText={touched.FirstName && errors.FirstName}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...getFieldProps('LastName')}
                    error={Boolean(touched.LastName && errors.LastName)}
                    helperText={touched.LastName && errors.LastName}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
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
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
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
                    label="Office Address"
                    {...getFieldProps('OfficeAddress')}
                    error={Boolean(touched.OfficeAddress && errors.OfficeAddress)}
                    helperText={touched.OfficeAddress && errors.OfficeAddress}
                  />
                  <TextField
                    fullWidth
                    label="BPS"
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
                    />
                  </div>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Department"
                    placeholder="Department"
                    {...getFieldProps('Department')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.Department && errors.Department)}
                    helperText={touched.Department && errors.Department}
                  >
                    <option value="" />
                    {departments?.map((option) => (
                      <option key={option.Id} value={option.Name}>
                        {option.Name}
                      </option>
                    ))}
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
                  />
                </Stack>
                <FormControlLabel
                  labelPlacement="end"
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
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
