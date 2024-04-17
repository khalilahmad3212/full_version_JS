import axios from 'axios';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getAnnouncements, deleteAnnouncement } from '../../../redux/slices/announcement';
// utils
import { fDate } from '../../../utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import { CommonMoreMenu } from '../../../components/_dashboard/home/product-list';

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

export default function AnnouncementList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { announcements: products } = useSelector((state) => state.announcement);

  useEffect(async () => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteAnnouncement(productId));
  };

  const isProductNotFound = products.length === 0;

  return (
    <Page title="Ecommerce: Product List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h4" gutterBottom>
          Announcements
        </Typography>
        <Box py={2} textAlign="end">
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.newAnnouncements}
            startIcon={<Icon icon={plusFill} />}
          >
            New Announcement
          </Button>
        </Box>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableBody>
                  {products?.map((row) => {
                    const { Id, Title, File: Image, StartDate, EndDate } = row;
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row" padding="none">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'center'
                            }}
                          >
                            <ThumbImgStyle alt={Title} src={`http://localhost:5001/announcement-images/${Image}`} />
                            <Typography variant="subtitle2" noWrap>
                              {Title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(StartDate)}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(EndDate)}</TableCell>
                        <TableCell align="right">
                          <CommonMoreMenu
                            onDelete={() => handleDeleteProduct(Id)}
                            productName={`${PATH_DASHBOARD.announcements}/${Id}/edit`}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
