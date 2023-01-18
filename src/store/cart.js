import { createSlice } from "@reduxjs/toolkit";
const initialCartState = {
    items: [],
    totalAmount: 0,
    totalProducts: 0
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
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
            const calcTotalAmount = state.totalAmount + (action.payload.item.price * action.payload.item.amount);
            const calcTotalProducts = state.totalProducts + action.payload.item.amount;
            state.totalAmount = calcTotalAmount;
            state.totalProducts = calcTotalProducts;
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
            state.totalAmount = state.totalAmount - targetItem.price
            state.totalProducts--;
            state.items = [...updatedItems];
        }
    }
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;