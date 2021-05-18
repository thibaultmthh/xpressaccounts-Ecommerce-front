import { TextArea } from "@blueprintjs/core";
import React, { useState } from "react";
import { separateur } from "../constantes";
import initFirebase from "../firebaseInit";

const firebase = initFirebase();
const firestore = firebase.firestore();

export default function Delivery(props:{deliveryId: string}) {
  const { deliveryId } = props;
  const [content, setContent] = useState("Loading");

  setImmediate(async () => {
    if (content === "Loading" && deliveryId) {
      const deliveryRef = firestore.collection('deliveries').doc(deliveryId);
      const doc = await deliveryRef.get();
      if (!doc.exists) {
        setContent("Delivery not found....");
      } else {
        setContent(doc.data()?.data || "Undefined");
      }
    }
  });

  return (
    <div id="orderDetail" className="cont">
      <TextArea fill value={content.replaceAll(separateur, "\n")} />

    </div>
  );
}
