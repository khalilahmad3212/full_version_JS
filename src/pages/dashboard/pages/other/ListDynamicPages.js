import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Delete, Edit, EditNotifications } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { getValueByKey, updateValueById } from '../../../../utils/api';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

const ListDynamicPages = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const fetchPagesData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/dynamic-page');
      console.log('parsedData: ', data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPagesData();
  }, []);

  const handleDelete = async (pageId) => {
    try {
      const res = await axios.delete(`http://localhost:5001/dynamic-page/${pageId}`);
      console.log('res: ', res);
      enqueueSnackbar('Page deleted successfully', { variant: 'success' });
      fetchPagesData();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error deleting page', { variant: 'error' });
    }
  };

  const handleEdit = (pageId) => {
    navigate(`/dashboard/other/add-page/${pageId}/edit`);
  };

  return (
    <Box>
      <HeaderBreadcrumbs
        heading="Dynamic Pages"
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/dashboard/other/add-page');
            }}
          >
            New Page
          </Button>
        }
      />
      <Grid container spacing={3}>
        {data?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5001/dynamic-page-images/${item?.image}`}
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="delete" onClick={() => handleDelete(item.Id)}>
                  <Delete />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleEdit(item.Id)}>
                  <Edit />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListDynamicPages;
