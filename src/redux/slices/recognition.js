import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  recognitions: [],
  recognition: null
};

const slice = createSlice({
  name: 'recognition',
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
    getRecognitionsSuccess(state, action) {
      state.isLoading = false;
      state.recognitions = action.payload;
    },

    // GET PRODUCT
    getRecognitionSuccess(state, action) {
      state.isLoading = false;
      state.recognition = action.payload;
    },

    // DELETE PRODUCT
    deleteRecognitionSuccess(state, action) {
      state.recognitions = reject(state.recognitions, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getRecognitionsSuccess, getRecognitionSuccess, deleteRecognitionSuccess } =
  slice.actions;

// ----------------------------------------------------------------------

export function getRecognitions() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/recognition`);
      console.log(response.data);
      dispatch(slice.actions.getRecognitionsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getRecognition(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/recognition/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getRecognitionSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createRecognition(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/recognition`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateRecognition(publicationId, formData) {
  console.log('RecognitionId: ', publicationId);
  console.log('data: ', formData);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/recognition/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getRecognitionSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteRecognition(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/recognition/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteRecognitionSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
