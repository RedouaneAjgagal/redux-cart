import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import cartUI from "./cartUI";

const store = configureStore({
    reducer: { cartReducer: cart, cartUiReducer: cartUI }
});
export default store;