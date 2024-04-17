import React, { seState, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import {
  TextField,
  Chip,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  Box,
  Grid,
  Stack
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { createSemester, updateSemester } from '../../../redux/slices/semester';

// Custom components for MUI + Formik integration
const FormikSelect = ({ label, children, form, field, ...props }) => (
  <TextField
    {...field}
    {...props}
    select
    label={label}
    fullWidth
    InputLabelProps={{
      shrink: true
    }}
  >
    {children}
  </TextField>
);

const FormikMultiSelect = ({ label, form, field, children, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    form.setFieldValue(field.name, value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        multiple
        value={field.value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {children}
      </Select>
    </FormControl>
  );
};

const validationSchema = Yup.object().shape({
  departmentName: Yup.string().required('Department name is required'),
  semesterNumber: Yup.number().min(0).max(12).required('Semester number is required'),
  courses: Yup.array().of(Yup.string()).required('At least one course is required')
});

const AddSemesterForm = ({ isEdit, currentProduct }) => {
  const dispatch = useDispatch();
  const enqueueSnackbar = useSnackbar();
  // TODO: Fetch departments and courses from API
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Electrical Engineering' }
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Data Structures' },
    { id: 2, name: 'Algorithms' },
    { id: 3, name: 'Computer Networks' },
    { id: 4, name: 'Operating Systems' },
    { id: 5, name: 'Digital Logic Design' },
    { id: 6, name: 'Signals and Systems' }
  ]);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const temp = { ...values };
    try {
      if (!isEdit) {
        dispatch(createSemester(temp));
      } else {
        dispatch(updateSemester(currentProduct?.Id, temp));
      }
      // resetForm();
      setSubmitting(false);
      enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      // navigate(PATH_DASHBOARD.home.root);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{
        departmentName: currentProduct?.departmentName || '',
        semesterNumber: currentProduct?.semesterNumber || '',
        courses: currentProduct?.courses || []
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Field name="departmentName" label="Department" component={FormikSelect}>
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.name}>
                    {department.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field type="number" name="semesterNumber" label="Semester Number" as={TextField} fullWidth />
            </Grid>

            <Grid item xs={12} md={8}>
              <Field name="courses" label="Courses" component={FormikMultiSelect}>
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>

            <Grid item xs={12} md={8}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Add Semester' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddSemesterForm;
