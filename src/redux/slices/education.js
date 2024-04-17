import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  educations: [],
  education: null
};

const slice = createSlice({
  name: 'education',
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
    getEducationsSuccess(state, action) {
      state.isLoading = false;
      state.educations = action.payload;
    },

    // GET PRODUCT
    getEducationSuccess(state, action) {
      state.isLoading = false;
      state.education = action.payload;
    },

    // DELETE PRODUCT
    deleteEducationSuccess(state, action) {
      state.educations = reject(state.educations, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getEducationsSuccess, getEducationSuccess, deleteEducationSuccess } =
  slice.actions;

// ----------------------------------------------------------------------

export function getEducations() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/education`);
      console.log(response.data);
      dispatch(slice.actions.getEducationsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEducation(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/education/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getEducationSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEducation(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/education`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEducation(publicationId, formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/education/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getEducationSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEducation(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/education/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteEducationSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
