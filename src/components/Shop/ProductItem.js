import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description, id } = props;
  const addItemHandler = () => {
    dispatch(cartAction.addItem({
      item: {
        title, price, description, id, amount: 1
      }
    }))
  }
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
