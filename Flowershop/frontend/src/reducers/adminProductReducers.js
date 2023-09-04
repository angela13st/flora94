import {
    ADMIN_PRODUCT_CREATE_REQUEST,
    ADMIN_PRODUCT_CREATE_SUCCESS,
    ADMIN_PRODUCT_CREATE_FAIL,
    ADMIN_PRODUCT_CREATE_RESET,
  } from "../constants/adminProductConstants";
  
  export const adminProductCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN_PRODUCT_CREATE_REQUEST:
        return { loading: true };
      case ADMIN_PRODUCT_CREATE_SUCCESS:
        return { loading: false, success: true, createdProduct: action.payload };
      case ADMIN_PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ADMIN_PRODUCT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  