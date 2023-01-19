import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart';

const CartItem = (props) => {
  const { title, quantity, price, id } = props.item;
  const dispatch = useDispatch()
  const addItemHandler = () => {
    dispatch(cartAction.addItem({ item: {title, price, id, amount: 1 } }))
  }
  const removeItemHandler = () => {
    dispatch(cartAction.removeItem({id}))
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
