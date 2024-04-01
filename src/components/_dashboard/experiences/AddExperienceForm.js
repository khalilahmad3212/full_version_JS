import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
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
    StartDate: Yup.date().required('Start Date is required').max(new Date(), "You can't start in future!"),
    EndDate: Yup.date().required('End Date is required').max(new Date(), "You can't end in future!"),
    Organization: Yup.string().required('Organization is required')
  });

  const formik = useFormik({
    initialValues: {
      Position: currentSlider?.Position || '',
      StartDate: currentSlider?.StartDate || '',
      EndDate: currentSlider?.EndDate || '',
      Organization: currentSlider?.Organization || ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const temp = { ...values };
      delete temp.file;
      delete temp.Image;

      try {
        if (!isEdit) {
          dispatch(createExperience(temp));
        } else {
          dispatch(updateExperience(currentSlider?.Id, temp));
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

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
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
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  />

                  <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaDescription')}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('metaKeywords', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Meta keywords" />}
                  />
                </Stack>
              </Card> */}

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
