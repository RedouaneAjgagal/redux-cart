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

export const sendCartData = (cartReducer) => {
    return async (dispatch) => {
        dispatch(cartUiAction.status({ status: 'Pending', title: 'Sending', message: 'Sending data...' }));
        const sendRequest = async () => {
            const response = await fetch('https://react-http-ae2f9-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cartReducer)
            });
            if (!response.ok) throw new Error('Something went wrong!');
        }
        try {
            await sendRequest();
            dispatch(cartUiAction.status({ status: 'success', title: 'Succeed!', message: 'Sent cart data successfully' }));
        } catch (error) {
            dispatch(cartUiAction.status({ status: 'error', title: 'Error', message: 'Sending cart data failed!' }));
        }
    }
}

export const cartUiAction = cartUiSlice.actions;
export default cartUiSlice.reducer;