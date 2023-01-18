import { createSlice } from "@reduxjs/toolkit";

const initialcartState = {
    open: false,
    notifications: null
}

const cartUiSlice = createSlice({
    name: 'cartUI',
    initialState: initialcartState,
    reducers: {
        toggle(state) {
            state.open = !state.open
        },
        status(state, action) {
            state.notifications = { status: action.payload.status, title: action.payload.title, message: action.payload.message }
        },
    }
});
export const cartUiAction = cartUiSlice.actions;
export default cartUiSlice.reducer;