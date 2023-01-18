import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction } from '../../store/cart';
const CartButton = (props) => {
  const { totalProducts } = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(cartAction.toggleCart());
  }
  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalProducts}</span>
    </button>
  );
};

export default CartButton;
