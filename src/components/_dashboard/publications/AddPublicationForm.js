import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { DatePicker, LoadingButton } from '@mui/lab';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
import { deleteFile, getValueByKey, uploadFile } from '../../../utils/api';
//
import axiosInstance from '../../../utils/axios';
// import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
// import BlogNewPostPreview from './AddSliderItemPreview';
import { createPublication, updatePublication } from '../../../redux/slices/publications';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddPublicationForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [value, setValue] = useState(new Date());

  const NewBlogSchema = Yup.object().shape({
    year: Yup.string(),
    Title: Yup.string().required('Title is required'),
    Type: Yup.string().required('Type is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      year: currentSlider?.Year || '',
      Title: currentSlider?.Title || '',
      Type: currentSlider?.Type || '',
      Image: isEdit ? `http://localhost:5001/publication-images/${currentSlider?.Link}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      if (values.file) {
        formData.append('file', values.file);
      }
      formData.append('title', values.Title);
      formData.append('type', values.Type);
      formData.append('year', values.year);

      try {
        if (isEdit) {
          dispatch(updatePublication(currentSlider?.Id, formData));
        } else {
          dispatch(createPublication(formData));
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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const result = await getValueByKey('home-programs');
  //       result.value = JSON.parse(result.value);
  //       if (isEdit) {
  //         console.log(result);
  //         console.log('id: ', id);
  //         const index = result.value.findIndex((obj) => obj.id === +id);
  //         console.log('index: ', index);
  //         const temp = result.value[index];
  //         console.log('temp: ', temp);
  //         let imageUrl = '';
  //         if (index !== -1) {
  //           imageUrl = `http://localhost:5001/file-data-images/${temp.Image}`;
  //         }
  //         setFieldValue('year', temp.year);
  //         setFieldValue('Type', temp.Type);
  //         setFieldValue('Title', temp.Title);
  //         setFieldValue('Image', imageUrl);
  //       }
  //       setData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Custom Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} helperText="Select your date" />}
                      minDate={new Date('2023-01-01')}
                      maxDate={new Date('2024-12-31')}
                    />
                  </LocalizationProvider>

                  <TextField
                    fullWidth
                    label="Title"
                    {...getFieldProps('Title')}
                    error={Boolean(touched.Title && errors.Title)}
                    helperText={touched.Title && errors.Title}
                  />

                  <TextField
                    fullWidth
                    label="Type"
                    {...getFieldProps('Type')}
                    error={Boolean(touched.Type && errors.Type)}
                    helperText={touched.Type && errors.Type}
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
                  {!isEdit ? 'Create Publication' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
