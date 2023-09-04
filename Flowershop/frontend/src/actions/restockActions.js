import axios from 'axios';
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


export const createRestock = (restockData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_RESTOCK_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/restocks', restockData, config);

    dispatch({
      type: CREATE_RESTOCK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_RESTOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getAllRestocks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_RESTOCKS_REQUEST });

    const { data } = await axios.get('/api/restocks');

    dispatch({
      type: GET_ALL_RESTOCKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_RESTOCKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getRestockById = (restockId) => async (dispatch) => {
  try {
    dispatch({ type: GET_RESTOCK_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/restocks/${restockId}`);

    dispatch({
      type: GET_RESTOCK_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTOCK_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
