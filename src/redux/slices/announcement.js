import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  announcements: [],
  announcement: null
};

const slice = createSlice({
  name: 'announcement',
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
    getAnnouncementsSuccess(state, action) {
      state.isLoading = false;
      state.announcements = action.payload;
    },

    // GET PRODUCT
    getAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.announcement = action.payload;
    },

    // DELETE PRODUCT
    deleteAnnouncementSuccess(state, action) {
      state.announcements = reject(state.announcements, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getAnnouncementesSuccess, getAnnouncementSuccess, deleteAnnouncementSuccess } =
  slice.actions;

// ----------------------------------------------------------------------

export function getAnnouncements() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/announcement`);
      console.log(response.data);
      dispatch(slice.actions.getAnnouncementsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAnnouncement(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/announcement/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getAnnouncementSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createAnnouncement(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/announcement`, formData, {
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

export function updateAnnouncement(publicationId, formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/announcement/${publicationId}`, formData);
      console.log('data: ', response.data);
      dispatch(slice.actions.getAnnouncementSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteAnnouncement(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/announcement/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteAnnouncementSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
