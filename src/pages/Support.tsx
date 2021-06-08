import React from "react";
import firebaseNP from "firebase";
import Header from "../components/Header";
import "../css/support.css";

export default function Support(props:{user: firebaseNP.User | null}) {
  const { user } = props;

  return (
    <>
      <Header user={user} />
      {' '}
      <div className="support">
        <p>
          For support open a ticket in:
          {' '}
          <a href="https://discord.gg/WJPZtrw7Sq">https://discord.gg/WJPZtrw7Sq</a>
        </p>
      </div>

    </>
  );
}
