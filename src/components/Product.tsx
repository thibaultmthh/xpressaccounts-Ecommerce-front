/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "../css/product.css";
import { IProduct } from "../interfaces";

export default function Product(props: {product: IProduct}) {
  const { product } = props;
  console.log(product.prices);

  return (
    <div className="product">
      <h1>{product.name}</h1>
      <p className="desc">
        {product.desc}
      </p>
      <p>
        {product.instant ? "Instant delivery" : "Delayed delivery"}
      </p>

      <label htmlFor="quantity-select">Quantity : </label>
      <select name="quantity" id="quantity-select">
        <option value="">Select Quantity</option>
        {product.prices.map((price) => (

          <option value={String(price.qty)}>
            {price.qty}
            {' '}
            :
            {' '}
            {price.price}
            $
            {' '}
          </option>
        ))}
      </select>
      <br />
      <a className="buttonV" href="order">Order now</a>
    </div>
  );
}
