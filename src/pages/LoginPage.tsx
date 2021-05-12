import React from "react";
import firebaseNP from "firebase";
import Header from "../components/Header";
import Login from "../components/Login";

export default function LoginPage(props:{user: firebaseNP.User | null}) {
  const { user } = props;
  return (
    <div className="App">
      <Header user={user} />
      <Login />
    </div>
  );
}
