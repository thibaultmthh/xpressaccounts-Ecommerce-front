import { TextArea } from "@blueprintjs/core";
import React, { useState } from "react";
import { separateur } from "../constantes";
import initFirebase from "../firebaseInit";

const firebase = initFirebase();
const firestore = firebase.firestore();

export default function Delivery(props:{deliveryId: string}) {
  const { deliveryId } = props;
  const [content, setContent] = useState("Loading");
  const [dId, setDId] = useState("");

  // eslint-disable-next-line no-unused-expressions
  const now = async () => {
    if (dId !== deliveryId && deliveryId) {
      const deliveryRef = firestore.collection('deliveries').doc(deliveryId);
      const doc = await deliveryRef.get();
      if (!doc.exists) {
        setContent("Delivery not found....");
      } else {
        setContent(doc.data()?.data || "Undefined");
        setDId(deliveryId);
      }
    }
  };
  now();

  return (
    <div id="orderDetail" className="cont">
      <TextArea fill value={content.replaceAll(separateur, "\n")} style={{ height: "100%" }} />

    </div>
  );
}
