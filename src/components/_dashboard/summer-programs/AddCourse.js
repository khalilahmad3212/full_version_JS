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
// utils
// ----------------------------------------------------------------------

export default function AddCourse({ data, onChange, isEdit, label1, label2, buttonText }) {
  const NewBlogSchema = Yup.object().shape({
    facts: Yup.array().of(
      Yup.object().shape({
        text: Yup.string().required('text is required')
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      facts: data || []
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      onChange(values.facts);
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
    onChange(newParagraphs);
  };
  // Function to add a new paragraph
  const addParagraph = () => {
    setFieldValue('facts', [...values.facts, { text: '' }]);
    onChange([...values.facts, { link: '', text: '' }]);
  };

  // Function to remove paragraph
  const removeParagraph = (index) => {
    const newParagraphs = values.facts.filter((_, i) => i !== index);
    setFieldValue('facts', newParagraphs);
    onChange(newParagraphs);
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
                          name="text"
                          value={paragraph.text}
                          onChange={(event) => handleParagraphChange(index, event)}
                          label="Name"
                          variant="outlined"
                        />
                      </Stack>
                    </div>
                  ))}
                  <FormHelperText error={Boolean(touched.about && errors.about)}>
                    {touched.about && errors.about}
                  </FormHelperText>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Button variant="contained" onClick={addParagraph}>
                    {buttonText ?? 'Add Course'}
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
