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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
import { deleteFile, getValueByKey, updateValueById, uploadFile } from '../../../utils/api';
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddGalleryForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const ImageSchema = Yup.object().shape({
    images: Yup.array().of(
      Yup.object().shape({
        file: Yup.mixed()
          .required('A file is required')
          .test(
            'fileSize',
            'File too large',
            (value) => value && value.size <= 1024 * 1024 * 5 // 5 MB
          )
          .test(
            'fileType',
            'Unsupported file format',
            (value) => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
          ),
        caption: Yup.string().required('A caption is required')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      images: [
        { file: null, caption: '' },
        { file: null, caption: '' },
        { file: null, caption: '' }
      ]
    },
    validationSchema: ImageSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values', values);
      try {
        if (isEdit) {
          const formData = { ...data };
          formData.value = JSON.stringify(values.about);
          updateValueById(data.id, formData);
        }
        // resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    const res = getValueByKey('GALLERY_IMAGES');

    res
      .then((data) => {
        console.log('data', data);
        data.value = JSON.parse(data.value);
        console.log('data', data);
        setData(data);
        setIsEdit(true);
        setFieldValue('about', data?.value);
      })
      .catch((error) => {
        console.error(error);
        setIsEdit(false);
      });
  }, []);

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

  const handleParagraphChange = (index, event) => {
    const newParagraphs = values.about.map((paragraph, i) => {
      if (i === index) {
        return event.target.value;
      }
      return paragraph;
    });
    setFieldValue('about', newParagraphs);
  };
  // Function to add a new paragraph
  const addParagraph = () => {
    setFieldValue('about', [...values.about, { file: null, caption: '' }]);
  };
  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {values?.images.map((paragraph, index) => (
                    <>
                      <div>
                        <LabelStyle>Image</LabelStyle>
                        <UploadSingleFile
                          maxSize={3145728}
                          accept="image/*"
                          file={paragraph.file}
                          onDrop={handleDrop}
                        />
                      </div>
                      <TextField
                        key={index}
                        fullWidth
                        value={paragraph.caption}
                        onChange={(event) => handleParagraphChange(index, event)}
                        label={`Alt Text for Image ${index + 1}`}
                        variant="outlined"
                      />
                    </>
                  ))}
                  <FormHelperText error={Boolean(touched.about && errors.about)}>
                    {touched.about && errors.about}
                  </FormHelperText>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Button variant="contained" onClick={addParagraph}>
                    Add Paragraph
                  </Button>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Banner' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
