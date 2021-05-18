import React, { useState } from 'react';
import {
  Button, Classes, Dialog, TextArea,
} from '@blueprintjs/core';
import initFirebase from '../../firebaseInit';
import { IOrder } from '../../interfaces';
import { separateur } from '../../constantes';

const firebase = initFirebase();
const firestore = firebase.firestore();

export default function ModalFullfill(props:{order: IOrder, onClose: ()=>void, orderId: string}) {
  const { order, onClose, orderId } = props;
  const { deliveryId } = order;
  const [deliveryText, setDeliveryText] = useState("");
  const [deliverySize, setDeliverySize] = useState(0);
  return (
    <Dialog isOpen>
      <h2>
        Fullfill the order
        {" "}
        {order.productName}
        {' '}
        Quantity :
        {' '}
        {deliverySize}
        /
        {order.quantity}
      </h2>
      <TextArea onChange={(e) => {
        setDeliverySize(e.target.value.split("\n").length);
        setDeliveryText(e.target.value);
      }}
      />
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>

          <Button onClick={onClose}>Close</Button>

          <Button
            intent={deliverySize === order.quantity ? "success" : "warning"}
            onClick={() => {
              // save

              firestore.collection("deliveries").doc(deliveryId).update({ data: deliveryText.replaceAll("\n", separateur) });
              firestore.collection("orders").doc(orderId).update({ fulfilled: true });
              onClose();
            }}
          >
            Fullfill and send email
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
