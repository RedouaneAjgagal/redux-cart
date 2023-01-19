import React, { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData } from './store/cartActions';
import { fetchCartData } from './store/cartActions';
let initalState = false;

function App() {
  const { open: cartIsOpen } = useSelector(state => state.cartUiReducer);
  const { cartReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (!initalState) {
      initalState = true;
      return;
    }
    if (cartReducer.touched) {
      dispatch(sendCartData(cartReducer));
    }
  }, [dispatch, cartReducer]);

  return (
    <Layout>
      {cartIsOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
