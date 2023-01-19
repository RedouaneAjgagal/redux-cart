import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const { items, totalAmount } = useSelector(state => state.cartReducer);
  const cartMeals = items.map((item) => {
    return <CartItem key={item.id} item={{ title: item.title, price: item.price, quantity: item.amount, id: item.id }} />
  })
  const totalPrice = `Total: $${totalAmount}`
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartMeals}
      </ul>
      <h3>{totalPrice}</h3>
    </Card>
  );
};

export default Cart;
