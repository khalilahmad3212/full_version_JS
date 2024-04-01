import { useCallback, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Box,
  Stack,
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  DialogActions,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { useSelector } from 'react-redux';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent, updateEvent2, createEvent2 } from '../../../redux/slices/calendar';
//
import ColorSinglePicker from '../../ColorSinglePicker';
import { UploadSingleFile } from '../../upload';
import { LabelStyle } from '../blog/BlogNewPostForm';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#94D82D', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E' // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    cost: 100000,
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

export default function CalendarForm({ event, range, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { myUser: user, getProfile } = useAuth();

  const isCreating = !event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
    end: Yup.date().when(
      'start',
      (start, schema) => start && schema.min(start, 'End date must be later than start date')
    ),
    start: Yup.date()
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          title: values.title,
          description: values.description,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end
        };
        console.log('values: ', values);
        const formData = new FormData();

        // formdata attibutes. It is easy to debug from here
        formData.append('title', values.title);
        formData.append('cost', values.cost);
        formData.append('organizorEmail', values.organizorEmail);
        formData.append('organizorPhone', values.organizorPhone);
        formData.append('organizorName', values.organizorName);
        formData.append('start', values.end);
        formData.append('end', values.start);
        formData.append('eventType', values.eventType);
        if (values.Image) {
          formData.append('image', values.Image);
        }
        if (values.PosterImage) {
          formData.append('posterImage', values.PosterImage);
        }
        formData.append('venue', values.venue);
        formData.append('sort', values.sort);
        formData.append('embeddedCode', values.embeddedCode);
        formData.append('allDay', values.allDay);
        formData.append('textColor', values.textColor);
        if (event) {
          dispatch(updateEvent(event.id, newEvent));
          dispatch(updateEvent2(event.id, formData));
          enqueueSnackbar('Update event success', { variant: 'success' });
        } else {
          dispatch(createEvent(newEvent));
          dispatch(createEvent2(formData));
          enqueueSnackbar('Create event success', { variant: 'success' });
        }
        // resetForm();
        // onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const handleDelete = async () => {
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile(8);
  }, []);

  const handleDropImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('Image', file);
        setFieldValue('image', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );
  const handleDropPosterImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('PosterImage', file);
        setFieldValue('posterImage', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Title"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <TextField
            fullWidth
            label="Cost"
            inputProps={{ type: 'number' }}
            {...getFieldProps('cost')}
            error={Boolean(touched.cost && errors.cost)}
            helperText={touched.cost && errors.cost}
          />

          <TextField
            fullWidth
            label="Organizor Name"
            {...getFieldProps('organizorName')}
            error={Boolean(touched.organizorName && errors.organizorName)}
            helperText={touched.organizorName && errors.organizorName}
          />

          <TextField
            fullWidth
            label="Organizor Phone"
            {...getFieldProps('organizorPhone')}
            error={Boolean(touched.organizorPhone && errors.organizorPhone)}
            helperText={touched.organizorPhone && errors.organizorPhone}
          />

          <TextField
            fullWidth
            label="Organizor Email"
            {...getFieldProps('organizorEmail')}
            error={Boolean(touched.organizorEmail && errors.organizoEmaile)}
            helperText={touched.organizorEmail && errors.organizorEmail}
          />

          <TextField
            select
            fullWidth
            label="Event Type"
            placeholder="eventType"
            {...getFieldProps('eventType')}
            SelectProps={{ native: true }}
            error={Boolean(touched.eventType && errors.eventType)}
            helperText={touched.eventType && errors.eventType}
          >
            <option value="" />
            {['WORKSHOP', 'DIPLOMA', 'COURSE', 'CONFERENCE'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>

          <div>
            <LabelStyle>Image</LabelStyle>
            <UploadSingleFile
              maxSize={3145728}
              accept="image/*"
              file={values.image}
              onDrop={handleDropImage}
              error={Boolean(touched.image && errors.image)}
            />
            {touched.image && errors.cover && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.image && errors.image}
              </FormHelperText>
            )}
          </div>

          <div>
            <LabelStyle>Poster Image</LabelStyle>
            <UploadSingleFile
              maxSize={3145728}
              accept="image/*"
              file={values.posterImage}
              onDrop={handleDropPosterImage}
              error={Boolean(touched.posterImage && errors.posterImage)}
            />
            {touched.posterImage && errors.posterImage && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.posterImage && errors.posterImage}
              </FormHelperText>
            )}
          </div>

          <TextField
            fullWidth
            label="Venue"
            {...getFieldProps('venue')}
            error={Boolean(touched.venue && errors.venue)}
            helperText={touched.venue && errors.venue}
          />

          <TextField
            fullWidth
            label="Sort"
            inputProps={{ type: 'number' }}
            {...getFieldProps('sort')}
            error={Boolean(touched.sort && errors.sort)}
            helperText={touched.sort && errors.sort}
          />

          <TextField
            fullWidth
            label="Embedded Code"
            {...getFieldProps('embeddedCode')}
            error={Boolean(touched.embeddedCode && errors.embeddedCode)}
            helperText={touched.embeddedCode && errors.embeddedCode}
          />

          <TextField
            select
            fullWidth
            label="Department"
            placeholder="Department"
            {...getFieldProps('department')}
            SelectProps={{ native: true }}
            error={Boolean(touched.department && errors.department)}
            helperText={touched.department && errors.department}
          >
            <option value={user?.Department.Name}>{user?.Department.Name}</option>
            {/* {departments?.map((option) => (
              <option key={option.Id} value={option.Name}>
                {option.Name}
              </option>
            ))} */}
          </TextField>
          <FormControlLabel control={<Switch checked={values.allDay} {...getFieldProps('allDay')} />} label="All day" />

          <MobileDateTimePicker
            label="Start date"
            value={values.start}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('start', date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />

          <MobileDateTimePicker
            label="End date"
            value={values.end}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('end', date)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={Boolean(touched.end && errors.end)}
                helperText={touched.end && errors.end}
                sx={{ mb: 3 }}
              />
            )}
          />

          <ColorSinglePicker {...getFieldProps('textColor')} colors={COLOR_OPTIONS} />
        </Stack>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="Delete Event">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
            Add
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
