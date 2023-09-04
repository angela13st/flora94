import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userGetByIdReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";
import { productCreateReducer } from "./reducers/productReducers"; 

import { adminProductCreateReducer } from "./reducers/adminProductReducers";
import { shiftAddReducer, shiftListReducer, createScheduleReducer } from "./reducers/shiftReducers"
import { createRestockReducer, getAllRestocksReducer, getRestockByIdReducer } from "./reducers/restockReducers";
import {
  articleListReducer,
  articleDetailsReducer,
  articleCreateReducer,
  articleUpdateReducer,
  articleDeleteReducer,
} from './reducers/articleReducers';
import {
  createCustomBouquetReducer,
  getCustomBouquetReducer,
  addProductsToCustomBouquetReducer,} from "./reducers/customBouquetReducers"


const reducer = combineReducers({
  createSchedule: createScheduleReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer, 
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  productCreate: productCreateReducer,
  adminProductCreate: adminProductCreateReducer,
  userGetById: userGetByIdReducer,
  shiftList: shiftListReducer,
  shiftAdd: shiftAddReducer,
  createRestock: createRestockReducer, 
  getAllRestocks: getAllRestocksReducer, 
  getRestockById: getRestockByIdReducer,
  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
  articleDelete: articleDeleteReducer,
  createCustomBouquet: createCustomBouquetReducer,
  getCustomBouquet: getCustomBouquetReducer,
  addProductsToCustomBouquet: addProductsToCustomBouquetReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
