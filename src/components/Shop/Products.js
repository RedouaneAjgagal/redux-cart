import React from 'react';
import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { products } from '../../productsData/products';

const Products = (props) => {
  const meals = products.map((item) => {
    return <ProductItem key={item.id} title={item.title} price={item.price} description={item.description} id={item.id} />
  });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {meals}
      </ul>
    </section>
  );
};

export default React.memo(Products);
