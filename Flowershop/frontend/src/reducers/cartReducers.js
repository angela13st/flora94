import * as actionTypes from '../constants/cartConstants';
import { SET_ORDER_NOTE } from '../constants/cartConstants'

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
  napomena: "", 
};

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? { ...item, isCustomBouquet: x.isCustomBouquet } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    
      case SET_ORDER_NOTE:
      return { ...state, note: action.payload };

    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };


    case actionTypes.CART_ADD_CUSTOM_BOUQUET_REQUEST:
      return { ...state, loading: true };
    case actionTypes.CART_ADD_CUSTOM_BOUQUET_SUCCESS:
      const customBouquet = action.payload;
      customBouquet.isCustomBouquet = true; 
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, customBouquet],
      };
    case actionTypes.CART_ADD_CUSTOM_BOUQUET_FAIL:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.CART_REMOVE_CUSTOM_BOUQUET:
      const customBouquetId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !item._id.startsWith('custom_bouquet_') || item._id !== customBouquetId
        ),
      };

    default:
      return state;
  }
};
