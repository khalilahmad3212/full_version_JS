/*
[{"title":"Scholarships","description":"The Estudiar awards scholarships based on academic merit and resonance with our mission, and third-party scholarships provide another way to fund your education.","Image":"how to apply_20240421214201385Z.webp","ImageId":78}]
component to display this list as a cards in grid(4 columns)
*/
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Delete, Edit, EditNotifications } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { getValueByKey, updateValueById } from '../../../../utils/api';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

const ListFinancialAid = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const fetchFinancialAids = async () => {
    try {
      const data = await getValueByKey('FINANCIAL_AID_TYPE');
      data.value = JSON.parse(data.value);
      console.log('parsedData: ', data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFinancialAids();
  }, []);

  const handleDelete = (index) => {
    const values = data.value
      .map((item, i) => {
        if (i !== index) {
          return item;
        }
        return null;
      })
      .filter((item) => item !== null);

    data.value = JSON.stringify(values);
    updateValueById(data.id, data);
  };

  const handleEdit = (index) => {
    navigate(`/dashboard/financial-aid/aid/${index + 1}/edit`);
  };

  return (
    <Box>
      <HeaderBreadcrumbs
        heading="Financial Aid"
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/dashboard/financial-aid/aid/new');
            }}
          >
            Add Financial Aid
          </Button>
        }
      />
      <Grid container spacing={3}>
        {data?.value?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5001/file-data-images/${item?.Image}`}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleEdit(index)}>
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

export default ListFinancialAid;
