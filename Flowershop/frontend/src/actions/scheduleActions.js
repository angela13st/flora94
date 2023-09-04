import axios from 'axios';
import {
  CREATE_SHIFT_REQUEST,
  CREATE_SHIFT_SUCCESS,
  CREATE_SHIFT_FAIL,
  SCHEDULE_FETCH_REQUEST,
  SCHEDULE_FETCH_SUCCESS,
  SCHEDULE_FETCH_FAIL,
} from '../constants/scheduleConstants';



export const fetchUserSchedule = (userId) => async (dispatch) => {
  try {
    dispatch({ type: SCHEDULE_FETCH_REQUEST });

    const { data } = await axios.get(`/api/schedules/${userId}`);

    dispatch({
      type: SCHEDULE_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_FETCH_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const createSchedule = (userId, date, shift, task) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SHIFT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/schedules/', { userId, date, shift, task }, config);

    dispatch({
      type: CREATE_SHIFT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SHIFT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

