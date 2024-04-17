import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  semesters: [],
  semester: null
};

const slice = createSlice({
  name: 'semester',
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
    getSemestersSuccess(state, action) {
      state.isLoading = false;
      state.semesters = action.payload;
    },

    // GET PRODUCT
    getSemesterSuccess(state, action) {
      state.isLoading = false;
      state.semester = action.payload;
    },

    // DELETE PRODUCT
    deleteSemesterSuccess(state, action) {
      state.semester = reject(state.semester, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getSemestersSuccess, getSemesterSuccess, deleteSemesterSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getSemesters() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/semester`);
      console.log(response.data);
      dispatch(slice.actions.getSemestersSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSemester(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/semester/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getSemesterSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createSemester(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/semester`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateSemester(publicationId, formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/semester/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getSemesterSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteSemester(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/semester/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteSemesterSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
