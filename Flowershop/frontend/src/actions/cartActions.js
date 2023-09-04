import axios from 'axios';
import * as actionTypes from '../constants/cartConstants';
import { SET_ORDER_NOTE } from "../constants/cartConstants"

export const addToCart = (id, qty, isCustomBouquet = false) => async (
  dispatch,
  getState
) => {
  try {
    let productData;

    if (isCustomBouquet) {
      const { data: customBouquetData } = await axios.get(
        `/api/custombouquets/${id}`
      );
      const productIds = customBouquetData.products.map((product) => product.product);

      const productRequests = productIds.map((productId) =>
        axios.get(`/api/products/${productId}`)
      );

      const productResponses = await Promise.all(productRequests);

      const products = productResponses.map((response) => response.data);

      productData = products;
    } else {
      const { data: regularProductData } = await axios.get(
        `/api/products/${id}`
      );

      productData = [regularProductData];
    }

    dispatch({
      type: actionTypes.CART_ADD_ITEM,
      payload: {
        product: productData[0]._id,
        name: productData[0].name,
        image: productData[0].image,
        price: productData[0].price,
        countInStock: productData[0].countInStock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};


export const addCustomBouquetToCart = (customBouquet) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.CART_ADD_CUSTOM_BOUQUET_REQUEST,
  });

  try {
    dispatch({
      type: actionTypes.CART_ADD_CUSTOM_BOUQUET_SUCCESS,
      payload: customBouquet,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: actionTypes.CART_ADD_CUSTOM_BOUQUET_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const removeCustomBouquetFromCart = (customBouquetId) => (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.CART_REMOVE_CUSTOM_BOUQUET,
      payload: customBouquetId,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error('Error removing custom bouquet from cart:', error);
  }
};

export const setOrderNote = (note) => (dispatch) => {
  dispatch({ type: SET_ORDER_NOTE, payload: note });
};