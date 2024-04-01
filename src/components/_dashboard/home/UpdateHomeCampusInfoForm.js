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

export default function UpdateHomeCampusInfoForm({ isEdit, currentData }) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();

  const NewBlogSchema = Yup.object().shape({
    para: Yup.string().required('Title is required'),
    Image: Yup.mixed().required('Image is required')
  });

  const formik = useFormik({
    initialValues: {
      para: '',
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
              para: values.para,
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
              para: values.para
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
        const result = await getValueByKey('home-campus-info');
        result.value = JSON.parse(result.value);
        console.log(result);
        const imageUrl = `http://localhost:5001/file-data-images/${result.value.Image}`;
        setFieldValue('para', result.value.para);
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
                    label="Description"
                    {...getFieldProps('para')}
                    error={Boolean(touched.para && errors.para)}
                    helperText={touched.para && errors.para}
                  />

                  {/* <TextField
                    fullWidth
                    label="Heading"
                    {...getFieldProps('Headings')}
                    error={Boolean(touched.Headings && errors.Headings)}
                    helperText={touched.Headings && errors.Headings}
                  />

                  <TextField
                    fullWidth
                    label="Link"
                    {...getFieldProps('Link')}
                    error={Boolean(touched.Link && errors.Link)}
                    helperText={touched.Link && errors.Link}
                  /> */}

                  {/* <TextField
                    fullWidth
                    label="Link Title"
                    {...getFieldProps('LinkTitle')}
                    error={Boolean(touched.LinkTitle && errors.LinkTitle)}
                    helperText={touched.LinkTitle && errors.LinkTitle}
                  /> */}

                  {/* <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div> */}

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
