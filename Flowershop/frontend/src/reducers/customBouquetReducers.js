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
  
  export const createCustomBouquetReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CUSTOM_BOUQUET_REQUEST:
        return { loading: true };
      case CREATE_CUSTOM_BOUQUET_SUCCESS:
        return { loading: false, success: true, customBouquet: action.payload };
      case CREATE_CUSTOM_BOUQUET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getCustomBouquetReducer = (state = { customBouquet: {} }, action) => {
    switch (action.type) {
      case GET_CUSTOM_BOUQUET_REQUEST:
        return { ...state, loading: true };
      case GET_CUSTOM_BOUQUET_SUCCESS:
        return { loading: false, customBouquet: action.payload };
      case GET_CUSTOM_BOUQUET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const addProductsToCustomBouquetReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_PRODUCTS_TO_CUSTOM_BOUQUET_REQUEST:
        return { loading: true };
      case ADD_PRODUCTS_TO_CUSTOM_BOUQUET_SUCCESS:
        return { loading: false, success: true, customBouquet: action.payload };
      case ADD_PRODUCTS_TO_CUSTOM_BOUQUET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  