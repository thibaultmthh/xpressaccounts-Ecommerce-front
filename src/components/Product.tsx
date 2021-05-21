/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from "@blueprintjs/core";
import React, { useState } from "react";
import "../css/product.css";
import { IProduct } from "../interfaces";

interface IProps {
  product: IProduct,
  productId: string,
  // eslint-disable-next-line no-unused-vars
  newCheckout: (x: {id: string, qty: number, cost: number, name: string}) => void}

export default function Product(props: IProps) {
  const { product, newCheckout, productId } = props;
  const [selected, setSelected] = useState("");

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
      <select
        name="quantity"
        id="quantity-select"
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      >
        <option value="">Select Quantity</option>
        {product.prices.map((price) => {
          if (price.qty > product.stock) { return null; }
          return (
            <option value={`${String(price.qty)}:${String(price.price)}`}>
              {price.qty}
              {' '}
              :
              {' '}
              {price.price}
              $
              {' '}
            </option>
          );
        })}
      </select>
      <br />
      { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Button
        className="buttonV"
        intent="success"
        disabled={!selected}
        onClick={() => {
          newCheckout({
            name: product.name, id: productId, qty: Number(selected.split(":")[0]), cost: Number(selected.split(":")[1]),
          });
        }}
      >
        Order now
      </Button>

    </div>
  );
}
