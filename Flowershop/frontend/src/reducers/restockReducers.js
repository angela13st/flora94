import {
    CREATE_RESTOCK_REQUEST,
    CREATE_RESTOCK_SUCCESS,
    CREATE_RESTOCK_FAIL,
    GET_ALL_RESTOCKS_REQUEST,
    GET_ALL_RESTOCKS_SUCCESS,
    GET_ALL_RESTOCKS_FAIL,
    GET_RESTOCK_BY_ID_REQUEST,
    GET_RESTOCK_BY_ID_SUCCESS,
    GET_RESTOCK_BY_ID_FAIL,
  } from '../constants/restockConstants';

  
  
  export const createRestockReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_RESTOCK_REQUEST:
        return { loading: true };
      case CREATE_RESTOCK_SUCCESS:
        return { loading: false, success: true, restock: action.payload };
      case CREATE_RESTOCK_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllRestocksReducer = (state = { restocks: [] }, action) => {
    switch (action.type) {
      case GET_ALL_RESTOCKS_REQUEST:
        return { loading: true };
      case GET_ALL_RESTOCKS_SUCCESS:
        return { loading: false, restocks: action.payload };
      case GET_ALL_RESTOCKS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getRestockByIdReducer = (state = { restock: {} }, action) => {
    switch (action.type) {
      case GET_RESTOCK_BY_ID_REQUEST:
        return { ...state, loading: true };
      case GET_RESTOCK_BY_ID_SUCCESS:
        return { loading: false, restock: action.payload };
      case GET_RESTOCK_BY_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  