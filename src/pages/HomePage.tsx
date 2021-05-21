import React from "react";
import { Link } from "react-router-dom";
import firebaseNP from "firebase";

import Header from "../components/Header";
import "../css/home.css";

export default function HomePage(props:{user: firebaseNP.User | null}) {
  const { user } = props;
  return (
    <>
      <Header user={user} />
      <div id="home">

        <h1>The Xpress Way</h1>
        <h2>
          Xpress Accounts has shown time after time consistency and proven success. With so many options available your fingertips there is no reason to pay for overpriced accounts

        </h2>
        <Link to="products">Browse Products</Link>
      </div>
    </>
  );
}
