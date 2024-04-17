import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  IconButton
} from '@mui/material';
// icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { deleteRecognition, getRecognitions } from '../../../redux/slices/recognition';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { RecognitionMoreMenu } from '../../../components/_dashboard/home/product-list';

// ----------------------------------------------------------------------

export default function RecognitionList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { recognitions: products } = useSelector((state) => state.recognition);

  useEffect(async () => {
    dispatch(getRecognitions());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`${PATH_DASHBOARD.recognition}/${id}/edit`, { replace: true });
  };

  const handleDelete = (id) => {
    dispatch(deleteRecognition(id));
  };

  const isProductNotFound = products?.length === 0;

  return (
    <Page title="Ecommerce: Product List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" gutterBottom>
          Recognitions
        </Typography>
        <Box py={2} textAlign="end">
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.newRecognition}
            startIcon={<Icon icon={plusFill} />}
          >
            Add Recognition
          </Button>
        </Box>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.map((recognition) => (
                    <TableRow key={recognition.Id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {recognition.Title}
                      </TableCell>
                      <TableCell>{recognition.Designation || 'N/A'}</TableCell>
                      <TableCell>
                        {recognition.Link ? (
                          <a href={recognition.Link} target="_blank" rel="noopener noreferrer">
                            Link
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>{recognition.Organization}</TableCell>
                      <TableCell>{recognition.Type}</TableCell>
                      <TableCell>
                        {recognition.StartDate ? new Date(recognition.StartDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>{new Date(recognition.EndDate).toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <RecognitionMoreMenu
                          onDelete={() => handleDelete(recognition.Id)}
                          productName={recognition.Id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={products.length} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
