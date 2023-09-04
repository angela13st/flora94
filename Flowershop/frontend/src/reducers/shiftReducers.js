import {
    SHIFT_ADD_REQUEST,
    SHIFT_ADD_SUCCESS,
    SHIFT_ADD_FAIL,
    SHIFT_LIST_REQUEST,
    SHIFT_LIST_SUCCESS,
    SHIFT_LIST_FAIL,
    CREATE_SHIFT_REQUEST,
    CREATE_SHIFT_SUCCESS,
    CREATE_SHIFT_FAIL,
    SCHEDULE_CREATE_REQUEST,
    SCHEDULE_CREATE_SUCCESS,
    SCHEDULE_CREATE_FAIL,
    SCHEDULE_FETCH_REQUEST,
    SCHEDULE_FETCH_SUCCESS,
    SCHEDULE_FETCH_FAIL,
    SCHEDULE_LIST_REQUEST,
    SCHEDULE_LIST_SUCCESS,
    SCHEDULE_LIST_FAIL,
  } from '../constants/scheduleConstants';
  
  export const shiftAddReducer = (state = {}, action) => {
    switch (action.type) {
      case SHIFT_ADD_REQUEST:
        return { loading: true };
      case SHIFT_ADD_SUCCESS:
        return { loading: false, success: true, shift: action.payload };
      case SHIFT_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const shiftListReducer = (state = { shifts: [] }, action) => {
    switch (action.type) {
      case SHIFT_LIST_REQUEST:
        return { loading: true };
      case SHIFT_LIST_SUCCESS:
        return { loading: false, shifts: action.payload };
      case SHIFT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const createScheduleReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_SHIFT_REQUEST:
        return { loading: true };
      case CREATE_SHIFT_SUCCESS:
        return { loading: false, success: true, shift: action.payload };
      case CREATE_SHIFT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const scheduleListReducer = (state = { schedules: [] }, action) => {
    switch (action.type) {
      case SCHEDULE_FETCH_REQUEST:
        return { loading: true };
      case SCHEDULE_FETCH_SUCCESS:
        return { loading: false, schedules: action.payload };
      case SCHEDULE_FETCH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };