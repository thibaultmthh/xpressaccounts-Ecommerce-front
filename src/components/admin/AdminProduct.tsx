import { Button } from '@blueprintjs/core';
import * as React from 'react';
import { IProduct } from "../../interfaces";

import initFirebase from '../../firebaseInit';

const firebase = initFirebase();
const firestore = firebase.firestore();

export default function AdminProduct(props:{product: IProduct, productId: string, refresh: ()=>void, editButton: ()=>void, editStockButton: ()=>void}) {
  const {
    product, productId, refresh, editButton, editStockButton,
  } = props;
  return (
    <div className="productAdmin">
      <p>{product.name }</p>
      <p>
        Stock :
        {product.stock}
      </p>

      {product.instant ? <Button intent="primary" onClick={editStockButton}>add stock</Button> : null}
      <Button intent="primary" onClick={editButton}>Edit</Button>
      <Button
        intent="danger"
        onClick={() => {
          firestore.collection("products").doc(productId).update({ disabled: true });
          refresh();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
