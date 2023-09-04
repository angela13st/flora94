import axios from 'axios';
import {
  CREATE_CUSTOM_BOUQUET_REQUEST,
  CREATE_CUSTOM_BOUQUET_SUCCESS,
  CREATE_CUSTOM_BOUQUET_FAIL,
  GET_CUSTOM_BOUQUET_REQUEST,
  GET_CUSTOM_BOUQUET_SUCCESS,
  GET_CUSTOM_BOUQUET_FAIL,
  ADD_PRODUCTS_TO_CUSTOM_BOUQUET_REQUEST,
  ADD_PRODUCTS_TO_CUSTOM_BOUQUET_SUCCESS,
  ADD_PRODUCTS_TO_CUSTOM_BOUQUET_FAIL,
} from '../constants/customBouquetConstants';

export const createCustomBouquet = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CUSTOM_BOUQUET_REQUEST });

    const { data } = await axios.post('http://localhost:5000/api/custombouquets');
    dispatch({ type: CREATE_CUSTOM_BOUQUET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CUSTOM_BOUQUET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomBouquetById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CUSTOM_BOUQUET_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/custombouquets/${id}`);
    dispatch({ type: GET_CUSTOM_BOUQUET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CUSTOM_BOUQUET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProductsToCustomBouquet = (id, products) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCTS_TO_CUSTOM_BOUQUET_REQUEST });

    const { data } = await axios.put(`http://localhost:5000/api/custombouquets/${id}/addproducts`, { products });
    dispatch({ type: ADD_PRODUCTS_TO_CUSTOM_BOUQUET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCTS_TO_CUSTOM_BOUQUET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
