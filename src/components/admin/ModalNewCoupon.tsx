import {
  Button, Classes, Dialog, InputGroup, NumericInput,
} from "@blueprintjs/core";
import React, { useState } from "react";

import "../../css/coupon.css";

import initFirebase from '../../firebaseInit';

const firebase = initFirebase();
const firestore = firebase.firestore();

function makeid(length: number) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random()
 * charactersLength)));
  }
  return result.join('');
}

export default function ModalNewCoupon(props:{onClose: ()=>void}) {
  const { onClose } = props;
  const [couponName, setCouponName] = useState(makeid(6));
  const [maxU, setMaxU] = useState(1);
  const [percentOff, setPercentOff] = useState(10);

  return (
    <Dialog isOpen onClose={onClose} style={{ padding: "10px" }}>
      <p>Coupon : </p>
      <InputGroup
        value={couponName}
        onChange={(e) => {
          setCouponName(e.target.value);
        }}
      />
      <p>Max use : </p>
      <NumericInput
        min={1}
        max={2000}
        value={maxU}
        onValueChange={(e) => {
          console.log(e);

          setMaxU(e);
        }}
      />
      <p>Percent off : </p>
      <NumericInput
        min={1}
        max={2000}
        value={percentOff}
        onValueChange={(e) => {
          console.log(e);

          setPercentOff(e);
        }}
      />
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>

          <Button onClick={onClose}>Close</Button>

          <Button
            intent="success"
            onClick={() => {
              // save

              firestore.collection("coupons").doc(couponName).set({ maxU, currentU: 0, percentOff });
              onClose();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
