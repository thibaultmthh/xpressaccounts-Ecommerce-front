import React, { useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../css/checkout.css";
import { Button, Overlay } from "@blueprintjs/core";
import { Stripe } from "@stripe/stripe-js";
import initFirebase from '../firebaseInit';

// eslint-disable-next-line camelcase

const firebase = initFirebase();
const functions = firebase.functions();

// eslint-disable-next-line camelcase
async function handleServerResponse(stripe: Stripe, d: {setLoading: React.Dispatch<React.SetStateAction<boolean>>, product: any}, response: {error?: boolean, requires_action?: boolean, payment_intent_client_secret?: string}) {
  console.log("server response : ", response);
  const { setLoading, product } = d;

  if (response.error) {
    // Show error from server on payment form
    alert(response.error);
    setLoading(false);
  } else if (response.requires_action && response.payment_intent_client_secret) {
    // Use Stripe.js to handle the required card action
    const { error: errorAction, paymentIntent } = await stripe.handleCardAction(response.payment_intent_client_secret);

    if (errorAction) {
      // Show error from Stripe.js in payment form
    } else {
      // The card action has been handled
      // The PaymentIntent can be confirmed again on the server
      functions.httpsCallable("pay")({ payment_intent_id: paymentIntent?.id, product }).then((r) => {
        handleServerResponse(stripe, { setLoading, product }, r.data);
      });
    }
  } else {
    // Show success message
    setLoading(false);
  }
}

export default function Checkout(props: {
  product: {
    id: string;
    qty: number;
    cost:number;
    name: string
  };
  onClose: ()=>void
}) {
  const { product, onClose } = props;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  return (
    <Overlay isOpen onClose={onClose} canOutsideClickClose>
      <div id="checkoutOverlay">
        <div id="checkoutComponent">
          <h3>
            You are going to buy
            {' '}
            {product.qty}
            {' '}
            {product.name}
          </h3>

          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },

            }}
          />
          <br />
          <Button
            intent="success"
            loading={loading}
            fill
            onClick={async () => {
              if (success) {
                // redirect dashboard
                window.location.replace("/dashboard");
                return;
              }
              setLoading(true);
              const card = elements?.getElement("card");
              if (!card || stripe == null) {
                alert("card empty or idf");
                setLoading(false);

                return;
              }
              console.log(card);
              const res = await stripe?.createPaymentMethod({ type: "card", card });
              if (!res) {
                console.log("chelou : ", res);
                setLoading(false);

                return;
              }
              const { paymentMethod, error } = res;
              if (error || !paymentMethod) {
                console.log("error : ", error);
                alert(error?.message);
                setLoading(false);
              } else {
                console.log(paymentMethod);
                functions.httpsCallable("pay")({ payment_method_id: paymentMethod?.id, product }).then((response) => {
                  setLoading(false);
                  if (response.data.success) {
                    setSuccess(true);
                  }
                  handleServerResponse(stripe, { setLoading, product }, response.data);
                });
              }
            }}
          >
            {success ? "See your order in the dashboard" : `Pay ${product.cost}$`}

          </Button>
          <br />
          {success ? null : <Button intent="warning" fill onClick={onClose}>Cancel</Button>}
        </div>
      </div>
    </Overlay>
  );
}
