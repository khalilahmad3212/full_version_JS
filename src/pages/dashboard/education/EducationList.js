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
import { deleteEducation, getEducations } from '../../../redux/slices/education';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { EducationMoreMenu } from '../../../components/_dashboard/home/product-list';
// ----------------------------------------------------------------------

export default function RecognitionList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { educations: products } = useSelector((state) => state.education);

  useEffect(async () => {
    dispatch(getEducations());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`${PATH_DASHBOARD.recognition}/${id}/edit`, { replace: true });
  };

  const handleDelete = (id) => {
    dispatch(deleteEducation(id));
  };

  const isProductNotFound = products?.length === 0;

  return (
    <Page title="Ecommerce: Product List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" gutterBottom>
          Educations
        </Typography>
        <Box py={2} textAlign="end">
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.newEducation}
            startIcon={<Icon icon={plusFill} />}
          >
            Add Education
          </Button>
        </Box>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Link</TableCell>
                    <TableCell>Major</TableCell>
                    <TableCell>Degree Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Institute</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.map((education) => (
                    <TableRow key={education.Id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <a href={education.Link} target="_blank" rel="noopener noreferrer">
                          {education.Link}
                        </a>
                      </TableCell>
                      <TableCell>{education.Major}</TableCell>
                      <TableCell>{education.DegreeType}</TableCell>
                      <TableCell>{education.Descripiton}</TableCell>
                      <TableCell>{education.Institute}</TableCell>
                      <TableCell>
                        {education.StartDate ? new Date(education.StartDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {education.EndDate ? new Date(education.EndDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell align="right">
                        <EducationMoreMenu onDelete={() => handleDelete(education.Id)} productName={education.Id} />
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
