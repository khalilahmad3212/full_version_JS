import axios from 'axios';

const SERVER = 'http://localhost:5001';
export const getValueByKey = async (key) => {
  const result = await fetch(`${SERVER}/map-resources/key/${key}`);
  console.log('check: ', result);
  // alert('check')
  try {
    const json = await result.json();
    return json;
  } catch (error) {
    return false;
  }
};

// ----------------------------------------

export const updateValueById = async (id, formData) => {
  try {
    console.log('updating....');
    const result = await axios.patch(`${SERVER}/map-resources/${id}`, formData);
    console.log('updated: ', result);
  } catch (error) {
    console.log('error while updating: ', error);
  }
};

// ----------------------------------------

export const uploadFile = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5001/file-data', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------

export const deleteFile = async (filename, id) => {
  try {
    const deleteUrl = `http://localhost:5001/file-data/${filename}/${id}`;
    const deleteResponse = await axios.delete(deleteUrl);
    console.log('Image deleted successfuly: ', deleteResponse);
    return deleteResponse.data;
  } catch (error) {
    console.log(error);
  }
};
