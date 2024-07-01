import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER = 'http://localhost:5001';
const initialState = {
  isLoading: false,
  error: false,
  departments: [],
  department: null
};

const slice = createSlice({
  name: 'my_department',
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
    getMyDepartmentsSuccess(state, action) {
      state.isLoading = false;
      state.departments = action.payload;
    },

    // GET PRODUCT
    getMyDepartmentSuccess(state, action) {
      state.isLoading = false;
      state.department = action.payload;
    },

    // DELETE PRODUCT
    deleteMyDepartmentSuccess(state, action) {
      state.departments = reject(state.departments, { Id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getMyDepartmentsSuccess, getDepartmentSuccess, deleteMyDepartmentSuccess } =
  slice.actions;

// ----------------------------------------------------------------------

export function getMyDepartments() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/department`);
      console.log(response.data);
      dispatch(slice.actions.getMyDepartmentsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getDepartment(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/department/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getMyDepartmentSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createMyDepartment(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/department`, formData, {
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

export function updateMyDepartment(publicationId, formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${SERVER}/department/${publicationId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('data: ', response.data);
      dispatch(slice.actions.getMyDepartmentSuccess(response.data));
    } catch (error) {
      console.log('Error: ', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteMyDepartment(publicationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${SERVER}/department/${publicationId}`);
      console.log(response.data);
      dispatch(slice.actions.deleteMyDepartmentSuccess(publicationId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}