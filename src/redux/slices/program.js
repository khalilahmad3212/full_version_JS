import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  programs: [],
  program: null
};

const slice = createSlice({
  name: 'program',
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
    getProgramsSuccess(state, action) {
      state.isLoading = false;
      state.programs = action.payload;
    },

    // GET PRODUCT
    getProgramSuccess(state, action) {
      state.isLoading = false;
      state.program = action.payload;
    },

    // DELETE PRODUCT
    deleteProgramSuccess(state, action) {
      state.programs = reject(state.programs, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getProgramsSuccess, getProgramSuccess, deleteProgramSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getPrograms() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/program`);
      console.log(response.data);
      dispatch(slice.actions.getProgramsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProgram(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/program/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getProgramSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createProgram(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/program`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateProgram(publicationId, formData) {
  console.log('programId: ', publicationId);
  console.log('data: ', formData);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/program/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getProgramSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteProgram(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/program/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteProgramSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
