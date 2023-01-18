import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";

const store = configureStore({
    reducer: { cartReducer: cart }
});
export default store;