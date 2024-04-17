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

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddAdmissionParaForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    // about: Yup.array().of(Yup.object().shape({ content: Yup.string() }))
    about: Yup.mixed().test('array', 'Must be an array of strings', (value) => {
      if (!value) {
        return false;
      }
      return value.every((item) => typeof item === 'string');
    })
  });

  const formik = useFormik({
    initialValues: {
      about: []
    },
    validationSchema: NewBlogSchema,
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
    const res = getValueByKey('admission-overview-paras');
    res.then((data) => {
      console.log('data', data);
      data.value = JSON.parse(data.value);
      console.log('data', data);
      setData(data);
      setIsEdit(true);
      setFieldValue('about', data?.value);
    });
  }, []);

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
    setFieldValue('about', [...values.about, '']);
  };
  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {values?.about.map((paragraph, index) => (
                    <>
                      <TextField
                        key={index}
                        fullWidth
                        rows={3}
                        multiline
                        value={paragraph}
                        onChange={(event) => handleParagraphChange(index, event)}
                        label={`Paragraph ${index + 1}`}
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
