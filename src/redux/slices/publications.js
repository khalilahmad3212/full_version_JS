import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { myAxios } from '../../utils/axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  publications: [],
  publication: null
};

const slice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getPublicationsSuccess(state, action) {
      state.isLoading = false;
      state.publications = action.payload;
    },

    // GET PRODUCT
    getPublicationSuccess(state, action) {
      state.isLoading = false;
      state.publication = action.payload;
    },

    // DELETE PRODUCT
    deletePublicationSuccess(state, action) {
      state.departments = reject(state.departments, { id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getPublicationsSuccess, getPublicationSuccess, deletePublicationSuccess } =
  slice.actions;
// ----------------------------------------------------------------------

export function getPublications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/publication`);
      console.log(response.data);
      dispatch(slice.actions.getPublicationsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPublication(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/publication/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.getPublicationSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createPublication(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.post(`/publication`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updatePublication(publicationId, formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/publication/${publicationId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('data: ', response.data);
      dispatch(slice.actions.getPublicationSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deletePublication(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/publication/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deletePublicationSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
