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
  name: 'home_department',
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
    getDepartmentsSuccess(state, action) {
      state.isLoading = false;
      state.departments = action.payload;
    },

    // GET PRODUCT
    getDepartmentSuccess(state, action) {
      state.isLoading = false;
      state.department = action.payload;
    },

    // DELETE PRODUCT
    deleteDepartment(state, action) {
      state.departments = reject(state.departments, { id: action.payload });
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getDepartmentsSuccess, getDepartmentSuccess, deleteDepartment } = slice.actions;

// ----------------------------------------------------------------------

export function getDepartments() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/department`);
      console.log(response.data);
      dispatch(slice.actions.getDepartmentsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSlider(sliderId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${SERVER}/slider/${sliderId}`);
      console.log(response.data);
      dispatch(slice.actions.getSlideSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createDepartment(formData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${SERVER}/slider`, formData, {
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
