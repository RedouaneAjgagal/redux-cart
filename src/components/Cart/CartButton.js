import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartUiAction } from '../../store/cartUI';
const CartButton = (props) => {
  const { totalProducts } = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(cartUiAction.toggle());
  }
  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalProducts}</span>
    </button>
  );
};

export default CartButton;
