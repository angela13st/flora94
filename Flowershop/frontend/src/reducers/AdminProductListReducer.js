import {
    ADMIN_PRODUCT_LIST_REQUEST,
    ADMIN_PRODUCT_LIST_SUCCESS,
    ADMIN_PRODUCT_LIST_FAIL,
  } from "../constants/adminConstants";
  
  export const adminProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ADMIN_PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case ADMIN_PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case ADMIN_PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  