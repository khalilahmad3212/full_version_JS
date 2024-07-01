import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { DatePicker, LoadingButton, MobileDateTimePicker } from '@mui/lab';
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
  FormControlLabel,
  Box,
  Icon,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
import { deleteFile, getValueByKey, uploadFile } from '../../../utils/api';
//
import axiosInstance, { myAxios } from '../../../utils/axios';
// import { QuillEditor } from '../../editor';
import { UploadAvatar, UploadMultiFile, UploadSingleFile } from '../../upload';
//
// import BlogNewPostPreview from './AddSliderItemPreview';
import { createMyDepartment, updateMyDepartment } from '../../../redux/slices/my-department';
import { fData } from '../../../utils/formatNumber';
import { SERVER } from '../../../utils/constants';
import { Close } from '@mui/icons-material';
import gallery from 'src/redux/slices/gallery';

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

export default function AddSubCampusForm({ isEdit, currentProduct: currentSlider }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const NewBlogSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Vision: Yup.string().required('Vision is required'),
    Mission: Yup.string().required('Mission is required'),
    // Objectives: Yup.string().required('Objectives is required'),
    History: Yup.string().required('Objectives is required'),
    Description: Yup.string().required('Description is required'),
    Accreditation: Yup.string().required('Accreditions is required'),
    // Catagory: Yup.string().required('Catagory is required'),
    Address: Yup.string().required('Address is required'),
    Phone: Yup.string().required('Phone is required'),
    Image: Yup.mixed().required('Image is required'),
    images: Yup.array().min(1, 'Gallery is Required'),
    missionImageUrl: Yup.mixed().required('Mission Image is required'),
    visionImageUrl: Yup.mixed().required('Vision Image is required')
  });

  const formik = useFormik({
    initialValues: {
      Name: currentSlider?.Name || '',
      Vision: currentSlider?.Vision || '',
      visionImageUrl: isEdit ? `${SERVER}/campus-images/${currentSlider?.VisionImage}` : null,
      Mission: currentSlider?.Mission || '',
      missionImageUrl: isEdit ? `${SERVER}/campus-images/${currentSlider?.MissionImage}` : null,
      // Objectives: currentSlider?.Objectives || '',
      History: currentSlider?.History || '',
      Description: currentSlider?.Description || '',
      Accreditation: currentSlider?.Accreditation || '',
      // Catagory: currentSlider?.Catagory || '',
      Address: currentSlider?.Address || '',
      Phone: currentSlider?.Phone || '',
      Image: isEdit ? `${SERVER}/campus-images/${currentSlider?.Cover}` : null,
      images: currentSlider?.Gallery?.split('###').map((e) => `${SERVER}/campus-images/${e}`) || [],
      gallery: [],
      // logo: isEdit ? `${SERVER}/campus-images/${currentSlider?.Logo}` : null,
      avatarUrl: isEdit ? `${SERVER}/campus-images/${currentSlider?.Logo}` : null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      if (values.file) {
        formData.append('file', values.file);
      }
      if (values.logo) {
        formData.append('logo', values.logo);
      }
      if (values.gallery) {
        for (let i = 0; i < values.gallery.length; i += 1) {
          formData.append('gallery', values.gallery[i]);
        }
      }
      const temp = { ...values };
      delete temp.file;
      delete temp.Image;
      delete temp.logo;
      delete temp.avatarUrl;
      delete temp.images;
      delete temp.gallery;
      delete temp.missionImageUrl;
      delete temp.visionImageUrl;

      Object.entries(temp).forEach((entry) => {
        const [key, value] = entry;
        formData.append(key, value);
      });

      try {
        if (isEdit) {
          formData.append('oldImages', values.images.filter((e) => {
            if (!(e instanceof File) && e.includes('http')) {
              let temp = e.split('/');
              return temp[temp.length - 1];
            }
          }).join('###'));
          const res = await myAxios.patch(`/campus/${currentSlider?.Id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          const res = await myAxios.post('/campus', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
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

  const handleLogoDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('logo', file);
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', file);
        setFieldValue('Image', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleDropMission = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('MissionImage', file);
        setFieldValue('missionImageUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleDropVision = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('VisionImage', file);
        setFieldValue('visionImageUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleMultiDrop = useCallback(
    (acceptedFiles) => {
      console.log(
        'images: ',
        acceptedFiles.map((file) => URL.createObjectURL(file))
      );
      setFieldValue('gallery', acceptedFiles);
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleLogoDrop}
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
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>Cover</LabelStyle>
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

                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps('Name')}
                    error={Boolean(touched.Name && errors.Name)}
                    helperText={touched.Name && errors.Name}
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>

                    <TextField
                      fullWidth
                      label="Vision"
                      multiline
                      rows={10}
                      {...getFieldProps('Vision')}
                      error={Boolean(touched.Vision && errors.Vision)}
                      helperText={touched.Vision && errors.Vision}
                    />
                    <div>
                      {/* <LabelStyle>Image</LabelStyle> */}
                      <UploadSingleFile
                        maxSize={3145728}
                        accept="image/*"
                        file={values.visionImageUrl}
                        onDrop={handleDropVision}
                        error={Boolean(touched.visionImageUrl && errors.visionImageUrl)}
                      />
                      {touched.visionImageUrl && errors.visionImageUrl && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.visionImageUrl && errors.visionImageUrl}
                        </FormHelperText>
                      )}
                    </div>
                  </Stack>
                  {/* this is row */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Mission"
                      multiline
                      rows={10}
                      {...getFieldProps('Mission')}
                      error={Boolean(touched.Mission && errors.Mission)}
                      helperText={touched.Mission && errors.Mission}
                    />
                    <div>
                      {/* <LabelStyle>Image</LabelStyle> */}
                      <UploadSingleFile
                        maxSize={3145728}
                        accept="image/*"
                        file={values.missionImageUrl}
                        onDrop={handleDropMission}
                        error={Boolean(touched.missionImageUrl && errors.missionImageUrl)}
                      />
                      {touched.missionImageUrl && errors.missionImageUrl && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.missionImageUrl && errors.missionImageUrl}
                        </FormHelperText>
                      )}
                    </div>
                  </Stack>
                  {/* <TextField
                    fullWidth
                    label="Objectives"
                    {...getFieldProps('Objectives')}
                    error={Boolean(touched.Objectives && errors.Objectives)}
                    helperText={touched.Objectives && errors.Objectives}
                  /> */}
                  <TextField
                    fullWidth
                    label="History"
                    multiline
                    rows={6}
                    {...getFieldProps('History')}
                    error={Boolean(touched.History && errors.History)}
                    helperText={touched.History && errors.History}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={5}
                    {...getFieldProps('Description')}
                    error={Boolean(touched.Description && errors.Description)}
                    helperText={touched.Description && errors.Description}
                  />
                  {/* TODO:
                    - Make it a dropdown as you have added for tagsupl
                  */}
                  <TextField
                    fullWidth
                    label="Accreditation"
                    {...getFieldProps('Accreditation')}
                    error={Boolean(touched.Accredition && errors.Accreditation)}
                    helperText={touched.Accreditation && errors.Accreditation}
                  />
                  {/* Also make it a dropdown */}
                  {/* <TextField
                    fullWidth
                    label="Catagory"
                    {...getFieldProps('Catagory')}
                    error={Boolean(touched.Catagory && errors.Catagory)}
                    helperText={touched.Catagory && errors.Catagory}
                  /> */}

                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    {...getFieldProps('Address')}
                    error={Boolean(touched.Address && errors.Address)}
                    helperText={touched.Address && errors.Address}
                  />

                  <TextField
                    fullWidth
                    label="Phone"
                    type="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    {...getFieldProps('Phone')}
                    error={Boolean(touched.Phone && errors.Phone)}
                    helperText={touched.Phone && errors.Phone}
                  />
                  {/* <div>
                    <LabelStyle>Gallery</LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={3145728}
                      accept="image/*"
                      files={values.images}
                      onDrop={handleMultiDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      error={Boolean(touched.images && errors.images)}
                    />
                    {touched.images && errors.images && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.images && errors.images}
                      </FormHelperText>
                    )}
                  </div> */}
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files);
                        console.log('e.target.files: ', selectedFiles);
                        setFieldValue('gallery', [...values.gallery, ...selectedFiles]);
                        setFieldValue(
                          'images',
                          [...values.images, ...selectedFiles]
                        );
                        // setFieldValue(
                        //   'images',
                        //   e.target.files.map((file) => URL.createObjectURL(file))
                        // );
                      }}
                    />
                  </div>
                  <Grid container spacing={2}>
                    {values.images.map((e) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={e} position="relative">
                        <IconButton
                          onClick={() => {
                            let temp = values.images.filter((file) => file !== e);

                            if (e instanceof File) {
                              console.log('file: ', e);
                              setFieldValue('gallery', values.gallery.filter((file) => file !== e));
                              console.log('gallery: ', values.gallery.filter((file) => file !== e));
                            }
                            setFieldValue('images', temp);
                          }}
                          sx={{
                            position: 'absolute',
                            zIndex: 9,
                            top: 0,
                            right: 0
                          }}
                        >
                          <Icon icon={Close} color='black' width={20} height={20} />
                        </IconButton>
                        <img src={typeof e === 'object' ? URL.createObjectURL(e) : e} className="h-full w-full" style={{ zIndex: 1 }} alt="prop" />
                      </Grid>
                    ))}
                  </Grid>
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
      </FormikProvider >
    </>
  );
}
