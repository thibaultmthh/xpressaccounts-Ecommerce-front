import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// eslint-disable-next-line camelcase
import { stripe_pk } from "./constantes";

import "./index.css";

import App from "./App";

const stripePromise = loadStripe(stripe_pk);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>

        <App />
      </Elements>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
