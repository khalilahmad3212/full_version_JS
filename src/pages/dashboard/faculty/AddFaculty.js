import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { myAxios } from '../../../utils/axios';

const FacultyComponent = () => {
  const [faculties, setFaculties] = useState([]);
  const [open, setOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: '', dean: { name: '', employeeId: '' }, departments: [] });

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get('/faculty');
      setFaculties(response.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeanChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty((prevState) => ({
      ...prevState,
      dean: {
        ...prevState.dean,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await myAxios.post('/faculty', newFaculty);
      fetchFaculties();
      handleClose();
    } catch (error) {
      console.error('Error creating faculty:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Faculties
      </Typography>
      <Grid container spacing={3}>
        {faculties.map((faculty) => (
          <Grid item xs={12} md={6} lg={4} key={faculty.id}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">{faculty.name}</Typography>
              <Typography variant="subtitle1">Dean: {faculty.dean.name}</Typography>
              <Typography variant="subtitle2">Departments:</Typography>
              <List>
                {faculty.departments.map((department) => (
                  <ListItem key={department.id}>
                    <ListItemText primary={department.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginTop: '16px' }}>
        Add Faculty
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Faculty</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new faculty, please enter the faculty name and dean details here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Faculty Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFaculty.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Dean Name"
            type="text"
            fullWidth
            variant="standard"
            value={newFaculty.dean.name}
            onChange={handleDeanChange}
          />
          <TextField
            margin="dense"
            name="employeeId"
            label="Dean Employee ID"
            type="text"
            fullWidth
            variant="standard"
            value={newFaculty.dean.employeeId}
            onChange={handleDeanChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FacultyComponent;
