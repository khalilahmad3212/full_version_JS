import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  newses: [],
  news: null
};

const slice = createSlice({
  name: 'news',
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
    getNewsesSuccess(state, action) {
      state.isLoading = false;
      state.newses = action.payload;
    },

    // GET PRODUCT
    getNewsSuccess(state, action) {
      state.isLoading = false;
      state.news = action.payload;
    },

    // DELETE PRODUCT
    deleteNewsSuccess(state, action) {
      state.newses = reject(state.newses, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getNewsesSuccess, getNewsSuccess, deleteNewsSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getNewses() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/news`);
      console.log(response.data);
      dispatch(slice.actions.getNewsesSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNews(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/news/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getNewsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createNews(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/news`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateNews(publicationId, formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/news/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getNewsSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteNews(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/news/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteNewsSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
