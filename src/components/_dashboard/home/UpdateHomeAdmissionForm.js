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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
//
import axios from 'axios';
import axiosInstance from '../../../utils/axios';
import { deleteFile, getValueByKey, uploadFile } from '../../../utils/api';
// import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
import BlogNewPostPreview from './AddSliderItemPreview';
import { createSlider, updateSlider } from '../../../redux/slices/slider';
import { PATH_DASHBOARD } from '../../../routes/paths';

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

export default function UpdateHomeAdmissionForm({ isEdit, currentData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();

  const NewBlogSchema = Yup.object().shape({
    para: Yup.string().required('Description is required'),
    link: Yup.string().required('Link is required'),
    linkText: Yup.string().required('Title is required'),
    heading: Yup.string().required('Heading is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      heading: '',
      para: '',
      linkText: '',
      link: '',
      Image: null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const fileUpload = new FormData();
      fileUpload.append('file', values.file);

      try {
        let formData;
        if (values.file) {
          await deleteFile(data.value.Image, data.value.ImageId);
          const fileData = await uploadFile(fileUpload);
          formData = {
            key: data.key,
            value: JSON.stringify({
              heading: values.heading,
              para: values.para,
              linkText: values.linkText,
              link: values.link,
              Image: fileData.filename,
              ImageId: fileData.id
            })
          };
        } else {
          console.log('file not selected');
          formData = {
            key: data.key,
            value: JSON.stringify({
              ...data.value,
              heading: values.heading,
              para: values.para,
              linkText: values.linkText,
              link: values.link
            })
          };
        }
        console.log('updated content: ', formData);
        const response2 = await axios.patch(`http://localhost:5001/map-resources/${data.id}`, formData);
        console.log('Map Resource Updated: ', response2);
        setSubmitting(false);
        enqueueSnackbar('Update success', { variant: 'success' });
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

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getValueByKey('home-admission-aid');
        result.value = JSON.parse(result.value);
        console.log(result);
        const imageUrl = `http://localhost:5001/file-data-images/${result.value.Image}`;

        setFieldValue('heading', result.value.heading);
        setFieldValue('para', result.value.para);
        setFieldValue('linkText', result.value.linkText);
        setFieldValue('link', result.value.link);
        setFieldValue('Image', imageUrl);

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
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
                    label="Heading"
                    {...getFieldProps('heading')}
                    error={Boolean(touched.heading && errors.heading)}
                    helperText={touched.heading && errors.heading}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    {...getFieldProps('para')}
                    error={Boolean(touched.para && errors.para)}
                    helperText={touched.para && errors.para}
                  />

                  <TextField
                    fullWidth
                    label="Link"
                    {...getFieldProps('link')}
                    error={Boolean(touched.link && errors.link)}
                    helperText={touched.link && errors.link}
                  />

                  <TextField
                    fullWidth
                    label="Link Text"
                    {...getFieldProps('linkText')}
                    error={Boolean(touched.linkText && errors.linkText)}
                    helperText={touched.linkText && errors.linkText}
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
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
