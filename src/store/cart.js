import { createSlice } from "@reduxjs/toolkit";
const initialCartState = {
    items: [],
    totalAmount: 0,
    totalProducts: 0,
    touched: false
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceItems(state, action) {
            state.items = action.payload.items || [];
            state.totalAmount = action.payload.totalAmount;
            state.totalProducts = action.payload.totalProducts;
        },
        addItem(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.item.id);
            if (existingItem) {
                const updatedItem = state.items.map((item) => {
                    if (item.id === action.payload.item.id) {
                        return { ...item, amount: item.amount + action.payload.item.amount }
                    } else {
                        return item;
                    }
                });
                state.items = [...updatedItem];
            } else {
                state.items = [...state.items, action.payload.item];
            }
            const calcTotalAmount = Number(state.totalAmount + (action.payload.item.price * action.payload.item.amount)).toFixed(2);
            const calcTotalProducts = state.totalProducts + action.payload.item.amount;
            state.totalAmount = Number(calcTotalAmount);
            state.totalProducts = calcTotalProducts;
            state.touched = true;
        },
        removeItem(state, action) {
            const targetItem = state.items.find(item => item.id === action.payload.id);
            let updatedItems;
            if (targetItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload.id);
            } else {
                updatedItems = state.items.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, amount: item.amount - 1 }
                    } else {
                        return item
                    }
                });
            }
            const calcTotalAmount = Number(state.totalAmount - (targetItem.price)).toFixed(2);
            state.totalAmount = Number(calcTotalAmount);
            state.totalProducts--;
            state.items = [...updatedItems];
            state.touched = true;
        }
    }
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;