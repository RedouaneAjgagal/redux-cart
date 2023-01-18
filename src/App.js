import React, { useEffect, useCallback } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { cartUiAction } from './store/cartUI';
let initalState = false;

function App() {
  const { open: cartIsOpen } = useSelector(state => state.cartUiReducer);
  const { cartReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    dispatch(cartUiAction.status({ status: 'pending', title: 'Sending', message: 'Sending data...' }));
    const response = await fetch('https://react-http-ae2f9-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cartReducer)
    });
    if (!response.ok) throw new Error('Something Went Wrong!');
    dispatch(cartUiAction.status({status: 'success', title: 'Succeed!', message: 'Sent cart data successfully'}));
  }, [cartReducer, dispatch])

  useEffect(() => {
    if (!initalState) {
      initalState = true;
      return;
    }

    fetchData().catch(error => dispatch(cartUiAction.status({ status: 'error', title: 'Error', message: 'Sending cart data failed!' })));
  }, [fetchData, dispatch]);

  return (
    <Layout>
      {cartIsOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
