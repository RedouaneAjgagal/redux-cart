import { cartUiAction } from "./cartUI";
import { cartAction } from "./cart";

export const fetchCartData = () => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch('https://react-http-ae2f9-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
            if (!response.ok) throw new Error('Failed to fetch cart data');
            const cartData = await response.json();
            return cartData;
        }
        try {
            const cartData = await sendRequest();
            dispatch(cartAction.replaceItems({
                ...cartData,
                items: cartData.items || []
            }));
        } catch (error) {
            dispatch(cartUiAction.status({ status: 'error', title: 'Error', message: error.message }));
        }
    }
}

export const sendCartData = (cartReducer) => {
    return async (dispatch) => {
        dispatch(cartUiAction.status({ status: 'Pending', title: 'Sending', message: 'Sending data...' }));
        const sendRequest = async () => {
            const response = await fetch('https://react-http-ae2f9-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({ items: cartReducer.items, totalAmount: cartReducer.totalAmount, totalProducts: cartReducer.totalProducts })
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