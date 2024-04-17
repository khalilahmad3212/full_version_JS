import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Paper, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
// redux
import { createRecognition, updateRecognition } from '../../../redux/slices/recognition';

const validationSchema = Yup.object({
  Title: Yup.string().required('Title is required'),
  Designation: Yup.string().required('Designation is required'),
  Link: Yup.string().required('Link is required').url('Must be a valid URL'),
  Organization: Yup.string().required('Organization is required'),
  Type: Yup.string().required('Type is required')
  // StartDate: Yup.date().required('Start date is required'),
  // EndDate: Yup.date().required('End date is required'),
});

export default function AddRecognitionForm({ isEdit, currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Title: currentSlider?.Title || '',
      Designation: currentSlider?.Designation || '',
      Link: currentSlider?.Link || '',
      Organization: currentSlider?.Organization || '',
      Type: currentSlider?.Type || ''
      // StartDate: currentSlider?.StartDate || new Date(),
      // EndDate: currentSlider?.EndDate || new Date(),
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };
      temp.StartDate = new Date();
      temp.EndDate = new Date();

      try {
        if (!isEdit) {
          dispatch(createRecognition(temp));
        } else {
          dispatch(updateRecognition(currentSlider?.Id, temp));
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

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Text Fields for Title, Designation, Link, Organization, Type, EmployeeId */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            {...formik.getFieldProps('Title')}
            error={Boolean(formik.touched.Title && formik.errors.Title)}
            helperText={formik.touched.Title && formik.errors.Title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Designation"
            {...formik.getFieldProps('Designation')}
            error={Boolean(formik.touched.Designation && formik.errors.Designation)}
            helperText={formik.touched.Designation && formik.errors.Designation}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Link"
            {...formik.getFieldProps('Link')}
            error={Boolean(formik.touched.Link && formik.errors.Link)}
            helperText={formik.touched.Link && formik.errors.Link}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Organization"
            {...formik.getFieldProps('Organization')}
            error={Boolean(formik.touched.Organization && formik.errors.Organization)}
            helperText={formik.touched.Organization && formik.errors.Organization}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            options={['AWARD', 'ACHEIVEMENT', 'CERTIFICATIE', 'MEDAL', 'MEMBERSHIP']}
            getOptionLabel={(option) => option} // Assuming you want to use the option string itself as the label
            renderInput={(params) => <TextField {...params} label="Type" />}
            value={formik.values.Type}
            onChange={(event, newValue) => {
              formik.setFieldValue('Type', newValue);
            }}
            error={Boolean(formik.touched.Type && formik.errors.Type)}
            helperText={formik.touched.Type && formik.errors.Type}
          />
        </Grid>

        {/* Date Pickers for StartDate and EndDate */}
        <Grid item xs={12}>
          <DatePicker
            label="Start Date"
            value={formik.values.StartDate}
            onChange={(value) => formik.setFieldValue('StartDate', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(formik.touched.StartDate && formik.errors.StartDate)}
                helperText={formik.touched.StartDate && formik.errors.StartDate}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="End Date"
            value={formik.values.EndDate}
            onChange={(value) => formik.setFieldValue('EndDate', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(formik.touched.EndDate && formik.errors.EndDate)}
                helperText={formik.touched.EndDate && formik.errors.EndDate}
              />
            )}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>

    // </LocalizationProvider>
  );
}
