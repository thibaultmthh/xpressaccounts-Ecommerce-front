/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Slider } from "@blueprintjs/core";
import React, { useState } from "react";
import { separateur } from "../constantes";
import "../css/product.css";
import { IPrices, IProduct } from "../interfaces";

interface IProps {
  product: IProduct,
  productId: string,
  // eslint-disable-next-line no-unused-vars
  newCheckout: (x: {id: string, qty: number, cost: number, name: string}) => void}

function getPrice(prices: IPrices, qty: number) {
  let pricePerOne = prices[0].price / prices[0].qty;
  let q = prices[0].qty;
  // eslint-disable-next-line no-restricted-syntax
  for (const i in prices) {
    if (Object.prototype.hasOwnProperty.call(prices, i)) {
      const price = prices[i];
      if (price.qty > qty && q > price.qty) {
        pricePerOne = price.price / price.qty;
        q = price.qty;
      }
    }
  }
  return Math.round((qty * pricePerOne) * 10) / 10;
}

export default function Product(props: IProps) {
  const { product, newCheckout, productId } = props;
  const [selected, setSelected] = useState("");
  const [valueSlider, setValueSlider] = useState(product.stock);

  return (
    <div className="product">
      <h1>{product.name}</h1>
      <p className="desc">
        {product.desc.split(separateur).map((l) => (

          <>
            {l}
            <br />
          </>

        ))}
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
        {product.stock > 25 ? <option value="Custom">Custom</option> : null}
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
      {selected === "Custom" && product.stock > 25 ? <Slider min={25} max={product.stock} value={valueSlider} onChange={(v) => setValueSlider(v)} /> : null}
      <br />
      { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Button
        className="buttonV"
        intent="success"
        disabled={!selected}
        onClick={() => {
          if (selected !== "Custom") {
            newCheckout({
              name: product.name, id: productId, qty: Number(selected.split(":")[0]), cost: Number(selected.split(":")[1]),
            });
          } else {
            newCheckout({
              name: product.name, id: productId, qty: valueSlider, cost: getPrice(product.prices, valueSlider),
            });
          }
        }}
      >
        Order now
        {' '}
        {selected === "Custom" ? getPrice(product.prices, valueSlider) : Number(selected.split(":")[1])}
        $
      </Button>

    </div>
  );
}
