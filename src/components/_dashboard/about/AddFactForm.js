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
  FormControlLabel,
  IconButton,
  Icon
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
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

export default function AddFactForm({ data, isEdit, limit }) {
  const { enqueueSnackbar } = useSnackbar();

  /*
    facts: [{title: 'title', description: 'description'}]
    
  */
  const NewBlogSchema = Yup.object().shape({
    facts: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      facts: data?.value || []
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values', values);
      try {
        if (isEdit) {
          const formData = { ...data };
          formData.value = JSON.stringify(values.facts);
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

  const handleParagraphChange = (index, event) => {
    const newParagraphs = values.facts.map((paragraph, i) => {
      if (i === index) {
        return { ...paragraph, [event.target.name]: event.target.value };
      }
      return paragraph;
    });
    setFieldValue('facts', newParagraphs);
  };
  // Function to add a new paragraph
  const addParagraph = () => {
    setFieldValue('facts', [...values.facts, { title: '', description: '' }]);
  };

  // Function to remove paragraph
  const removeParagraph = (index) => {
    const newParagraphs = values.facts.filter((_, i) => i !== index);
    setFieldValue('facts', newParagraphs);
  };
  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {values?.facts.map((paragraph, index) => (
                    <div key={index}>
                      <Stack direction="column" gap={2} justifyContent="flex-end" sx={{ position: 'relative' }}>
                        <IconButton
                          sx={{ position: 'absolute', right: 0, top: 0, zIndex: 2, cursor: 'pointer' }}
                          onClick={() => removeParagraph(index)}
                        >
                          <DeleteOutline />
                        </IconButton>

                        <TextField
                          key={index}
                          fullWidth
                          multiline
                          name="title"
                          value={paragraph.title}
                          onChange={(event) => handleParagraphChange(index, event)}
                          label="Title"
                          variant="outlined"
                        />
                        <TextField
                          key={index}
                          fullWidth
                          name="description"
                          rows={2}
                          multiline
                          value={paragraph.description}
                          onChange={(event) => handleParagraphChange(index, event)}
                          label="Description"
                          variant="outlined"
                        />
                      </Stack>
                    </div>
                  ))}
                  <FormHelperText error={Boolean(touched.about && errors.about)}>
                    {touched.about && errors.about}
                  </FormHelperText>
                </Stack>
                {!limit && (
                  <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={addParagraph}>
                      Add Entry
                    </Button>
                  </Stack>
                )}
                {limit && limit !== values.facts.length && (
                  <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={addParagraph}>
                      Add Entry
                    </Button>
                  </Stack>
                )}
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
