import React from 'react';

import { IOrder } from "../../interfaces";
import "../../css/openOrder.css";

// import initFirebase from '../../firebaseInit';

// const firebase = initFirebase();
// const firestore = firebase.firestore();

export default function ClosedOrder(props:{order: IOrder}) {
  const { order } = props;
  return (
    <div className="openOrder">
      <p>{order.productName}</p>
      <p>{order.quantity}</p>
      <p>
        #
        {order.orderId}
      </p>

    </div>

  );
}
