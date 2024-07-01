import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton, LocalizationProvider, MobileDateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
//
import { createExperience, updateExperience } from '../../../redux/slices/experience';
import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------
const TAGS_OPTION = ['UNDERGRADUATE', 'GRADUATE', 'POSTGRADUATE', 'FOUNDATION', 'SUMMER', 'WINTER'];
export default function AddExperienceForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    Position: Yup.string().required('Position is required'),
    // StartDate: Yup.date().required('Start Date is required').max(new Date(), "You can't start in future!"),
    // EndDate: Yup.date().required('End Date is required').max(new Date(), "You can't end in future!"),
    Organization: Yup.string().required('Organization is required')
  });

  const formik = useFormik({
    initialValues: {
      Position: currentSlider?.Position || '',
      // StartDate: currentSlider?.StartDate || '',
      // EndDate: currentSlider?.EndDate || '',
      Organization: currentSlider?.Organization || ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };
      delete temp.file;
      delete temp.Image;

      temp.StartDate = new Date();
      temp.EndDate = new Date();

      try {
        if (!isEdit) {
          dispatch(createExperience(temp));
        } else {
          dispatch(updateExperience(currentSlider?.Id, temp));
        }
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        navigate(PATH_DASHBOARD.experience);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  // write a function to fetch data

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
                    label="Position"
                    {...getFieldProps('Position')}
                    error={Boolean(touched.Position && errors.Position)}
                    helperText={touched.Position && errors.Position}
                  />

                  <TextField
                    fullWidth
                    label="Organization"
                    {...getFieldProps('Organization')}
                    error={Boolean(touched.Organization && errors.Organization)}
                    helperText={touched.Organization && errors.Organization}
                  />

                  <TextField
                    fullWidth
                    label="Start Date"
                    {...getFieldProps('StartDate')}
                    error={Boolean(touched.StartDate && errors.StartDate)}
                    helperText={touched.StartDate && errors.StartDate}
                  />

                  <TextField
                    fullWidth
                    label="End Date"
                    {...getFieldProps('EndDate')}
                    error={Boolean(touched.EndDate && errors.EndDate)}
                    helperText={touched.EndDate && errors.EndDate}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      label="Start Date"
                      value={values.StartDate}
                      inputFormat="dd/MM/yyyy"
                      onChange={(date) => setFieldValue('StartDate', date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />

                    <MobileDateTimePicker
                      label="End Date"
                      value={values.EndDate}
                      inputFormat="dd/MM/yyyy"
                      onChange={(date) => setFieldValue('EndDate', date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Add Experience' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
