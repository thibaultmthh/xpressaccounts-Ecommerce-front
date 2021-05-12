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
        <h1>Xpress accounts</h1>
        <h2>
          Xpress accounts Your Way to Success
        </h2>
        <Link to="products">Browse Products</Link>
      </div>
    </>
  );
}
