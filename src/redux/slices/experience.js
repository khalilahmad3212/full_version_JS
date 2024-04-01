import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  experiences: [],
  experience: null
};

const slice = createSlice({
  name: 'experience',
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
    getExperiencesSuccess(state, action) {
      state.isLoading = false;
      state.experiences = action.payload;
    },

    // GET PRODUCT
    getExperienceSuccess(state, action) {
      state.isLoading = false;
      state.experience = action.payload;
    },

    // DELETE PRODUCT
    deleteExperienceSuccess(state, action) {
      state.experiences = reject(state.experiences, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getExperiencesSuccess, getExperienceSuccess, deleteExperienceSuccess } =
  slice.actions;

// ----------------------------------------------------------------------

export function getExperiences() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/experience`);
      console.log(response.data);
      dispatch(slice.actions.getExperiencesSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getExperience(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/experience/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getExperienceSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createExperience(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/experience`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateExperience(publicationId, formData) {
  console.log('ExperienceId: ', publicationId);
  console.log('data: ', formData);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/experience/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getExperienceSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteExperience(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/experience/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteExperienceSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
