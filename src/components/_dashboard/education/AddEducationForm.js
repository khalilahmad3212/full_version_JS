import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, MenuItem, Stack, Box, FormHelperText } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

// redux
import { createEducation, updateEducation } from '../../../redux/slices/education';
import { KhalilDatePicker } from '../../../components/KhalilDatePicker';

const educationSchema = Yup.object().shape({
  Link: Yup.string().required('Link is required').url('Invalid URL'),
  Major: Yup.string().required('Major is required'),
  DegreeType: Yup.string().required('Degree Type is required'),
  Descripiton: Yup.string().required('Description is required'),
  Institute: Yup.string().required('Institute is required'),
  StartDate: Yup.date().required('Start Date is required'),
  EndDate: Yup.date().required('End Date is required')
});

export default function AddEducationForm({ isEdit, currentSlider: currentEducation }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      Link: currentEducation?.Link || '',
      Major: currentEducation?.Major || '',
      DegreeType: currentEducation?.DegreeType || '',
      Descripiton: currentEducation?.Descripiton || '',
      Institute: currentEducation?.Institute || '',
      StartDate: currentEducation?.StartDate || Date.now(),
      EndDate: currentEducation?.EndDate || Date.now()
    },
    validationSchema: educationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };

      try {
        if (!isEdit) {
          dispatch(createEducation(temp));
        } else {
          dispatch(updateEducation(currentEducation?.Id, temp));
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
            label="Major"
            {...formik.getFieldProps('Major')}
            error={Boolean(formik.touched.Major && formik.errors.Major)}
            helperText={formik.touched.Major && formik.errors.Major}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Degree Type"
            {...formik.getFieldProps('DegreeType')}
            error={Boolean(formik.touched.DegreeType && formik.errors.DegreeType)}
            helperText={formik.touched.DegreeType && formik.errors.DegreeType}
          >
            {['MATRIC', 'INTERMEDIATE', 'BS'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            {...formik.getFieldProps('Descripiton')}
            error={Boolean(formik.touched.Descripiton && formik.errors.Descripiton)}
            helperText={formik.touched.Descripiton && formik.errors.Descripiton}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Institute"
            {...formik.getFieldProps('Institute')}
            error={Boolean(formik.touched.Institute && formik.errors.Institute)}
            helperText={formik.touched.Institute && formik.errors.Institute}
          />
        </Grid>
        <Stack direction={{ xs: 'column', md: 'row' }} p={3} spacing={3}>
          <Box>
            <KhalilDatePicker
              value={formik.values.StartDate}
              onChange={(e) => {
                formik.setFieldValue('StartDate', e.target.value);
              }} />
            {formik.touched.StartDate && formik.errors.StartDate && (
              <FormHelperText error>{formik.errors.StartDate}</FormHelperText>
            )}
          </Box>
          <Box>
            <KhalilDatePicker
              value={formik.values.EndDate}
              onChange={(e) => {
                alert(e.target.value);
                formik.setFieldValue('EndDate', e.target.value);
              }} />
            {formik.touched.EndDate && formik.errors.EndDate && (
              <FormHelperText error>{formik.errors.EndDate}</FormHelperText>
            )}
          </Box>
        </Stack>
        {/*        <Grid item xs={12}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Grid>
          */}
        {/* <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          </LocalizationProvider>
        </Grid> */}
        {/* <Grid item xs={12}>
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
        </Grid> */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form >

    // </LocalizationProvider>
  );
}
