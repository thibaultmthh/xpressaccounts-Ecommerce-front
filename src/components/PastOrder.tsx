/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { IOrder } from "../interfaces";

function toDate(timestamp:number) {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export default function PastOrder(props: { order: IOrder, onClick: ()=>void }) {
  const { order, onClick } = props;

  return (
    <div className="pastOrder" onClick={onClick}>
      <p className="title">{order.productName}</p>
      <p className="date">{toDate(order.date.seconds)}</p>
      <p className="qty">{order.quantity}</p>
      <p className="orderNB">
        #
        {order.orderId}
      </p>
      <p className="status">{order.fulfilled ? "Delivered" : "Pending"}</p>
    </div>
  );
}
