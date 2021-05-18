import { Button } from '@blueprintjs/core';
import React, { useState } from 'react';
import ModalFullfill from "./ModalFullfill";
import { IOrder } from "../../interfaces";
import "../../css/openOrder.css";

// import initFirebase from '../../firebaseInit';

// const firebase = initFirebase();
// const firestore = firebase.firestore();

export default function OpenOrders(props:{order: IOrder, refresh: ()=>void, orderId: string}) {
  const { order, refresh, orderId } = props;
  const [fullfill, setFullfill] = useState(false);
  return (
    <>
      {fullfill ? (
        <ModalFullfill onClose={() => { setFullfill(false); refresh(); }} order={order} orderId={orderId} />
      ) : ""}
      <div className="openOrder">
        <p>{order.productName}</p>
        <p>{order.quantity}</p>
        <p>
          #
          {order.orderNb}
        </p>
        <Button intent="primary" onClick={() => setFullfill(true)}> Fullfill</Button>
      </div>
    </>
  );
}
