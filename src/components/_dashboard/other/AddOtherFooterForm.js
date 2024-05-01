import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Button, TextField, Typography, FormHelperText, IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import AddLinkForm from '../about/AddLinksForm';
import { updateValueById } from '../../../utils/api';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function AddOtherFooterForm({ data, isEdit, limit }) {
  const { enqueueSnackbar } = useSnackbar();

  /*
    facts: [{title: 'title', description: 'description'}]
    
  */
  const NewBlogSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is required'),
    phone: Yup.string().required('Phone is required'),
    sections: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Title is required'),
        links: Yup.array().of(
          Yup.object().shape({
            link: Yup.string().required('Link is required'),
            text: Yup.string().required('Text is required')
          })
        )
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      heading: data?.value.heading || '',
      phone: data?.value.phone || '',
      sections: data?.value.sections || []
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values', values);
      try {
        if (isEdit) {
          const formData = { ...data };
          formData.value = JSON.stringify(values);
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
    const newParagraphs = values.sections.map((paragraph, i) => {
      if (i === index) {
        return { ...paragraph, [event.target.name]: event.target.value };
      }
      return paragraph;
    });
    setFieldValue('sections', newParagraphs);
  };
  // Function to add a new paragraph
  const addParagraph = () => {
    setFieldValue('sections', [...values.sections, { title: '', links: [] }]);
  };

  // Function to remove paragraph
  const removeParagraph = (index) => {
    const newParagraphs = values.sections.filter((_, i) => i !== index);
    setFieldValue('sections', newParagraphs);
  };

  const handleLinks = (index) => (links) => {
    const newParagraphs = values?.sections.map((paragraph, i) => {
      if (i === index) {
        return { ...paragraph, links };
      }
      return paragraph;
    });
    setFieldValue('sections', newParagraphs);
  };
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
                    label="Phone"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  {values?.sections.map((paragraph, index) => (
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
                          label={`Title `}
                          variant="outlined"
                        />

                        <AddLinkForm
                          label1="Program"
                          label2="Fee"
                          buttonText="Add Program"
                          data={paragraph?.links}
                          onChange={handleLinks(index)}
                        />
                      </Stack>
                    </div>
                  ))}
                  <FormHelperText error={Boolean(touched.about && errors.about)}>
                    {touched.about && errors.about}
                  </FormHelperText>
                </Stack>
                {limit && values.sections.length < limit && (
                  <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={addParagraph}>
                      Add Section
                    </Button>
                  </Stack>
                )}
                {!limit && (
                  <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={addParagraph}>
                      Add Section
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
