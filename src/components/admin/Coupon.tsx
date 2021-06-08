import { Button } from "@blueprintjs/core";
import React from "react";
import { ICoupon } from "../../interfaces";
import "../../css/coupon.css";

import initFirebase from '../../firebaseInit';

const firebase = initFirebase();
const firestore = firebase.firestore();

export default function Coupon(props: {coupon: ICoupon, id: string, refresh: ()=>void}) {
  const { coupon, id, refresh } = props;
  return (
    <div className="coupon">
      <p>
        {id}
        {' '}
        {coupon.currentU}
        /
        {coupon.maxU}
        {" "}
        {coupon.percentOff}
        %
      </p>
      <Button
        intent="danger"
        onClick={async () => {
          await firestore.collection("coupons").doc(id).delete();
          refresh();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
