import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./Cart/cart.reducer";
// import directoryReducer from './directory/directory.reducer';
import shopReducer from "./shop/shop.reducer";
// import productReducer from './Admin/Products/product.reducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  // directory: directoryReducer,
  shop: shopReducer,
  // admin: productReducer
});

export default persistReducer(persistConfig, rootReducer);
