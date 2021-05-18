import React from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../css/checkout.css";
import { Button, Overlay } from "@blueprintjs/core";
import { Stripe } from "@stripe/stripe-js";
import initFirebase from '../firebaseInit';

// eslint-disable-next-line camelcase

const firebase = initFirebase();
const functions = firebase.functions();

// eslint-disable-next-line camelcase
async function handleServerResponse(stripe: Stripe, response: {error?: boolean, requires_action?: boolean, payment_intent_client_secret?: string}) {
  console.log("server response : ", response);

  if (response.error) {
    // Show error from server on payment form
  } else if (response.requires_action && response.payment_intent_client_secret) {
    // Use Stripe.js to handle the required card action
    const { error: errorAction, paymentIntent } = await stripe.handleCardAction(response.payment_intent_client_secret);

    if (errorAction) {
      // Show error from Stripe.js in payment form
    } else {
      // The card action has been handled
      // The PaymentIntent can be confirmed again on the server
      functions.httpsCallable("pay")({ payment_intent_id: paymentIntent?.id }).then((r) => {
        handleServerResponse(stripe, r.data);
      });
    }
  } else {
    // Show success message
  }
}

export default function Checkout(props: {
  product: {
    id: string;
    qty: number;
  };
  onClose: ()=>void
}) {
  const { product, onClose } = props;

  const stripe = useStripe();
  const elements = useElements();

  return (
    <Overlay isOpen onClose={onClose}>
      <div id="checkoutOverlay">
        <div id="checkoutComponent">
          <p>
            Product id :
            {product.id}
            , Qty :
            {product.qty}
          </p>

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
            fill
            onClick={async () => {
              const card = elements?.getElement("card");
              if (!card || stripe == null) {
                alert("card empty or idf");
                return;
              }
              console.log(card);
              const res = await stripe?.createPaymentMethod({ type: "card", card });
              if (!res) {
                console.log("chelou : ", res);
                return;
              }
              const { paymentMethod, error } = res;
              if (error || !paymentMethod) {
                console.log("error : ", error);
                alert(error?.message);
              } else {
                console.log(paymentMethod);
                functions.httpsCallable("pay")({ payment_method_id: paymentMethod?.id }).then((response) => {
                  handleServerResponse(stripe, response.data);
                });
              }
            }}
          >
            Pay 25$
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
