/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import firebaseNP from "firebase";
import "../css/header.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logogif.gif";

import initFirebase from "../firebaseInit";

const firebase = initFirebase();
const auth = firebase.auth();

interface IProps {
  user: firebaseNP.User | null;
}

export default function Header(props: IProps) {
  const { user } = props;
  const history = useHistory();
  return (
    <header>

      <img
        src={logo}
        alt="logo"
        onClick={() => {
          history.push("/");
        }}
      />
      <div>
        {user !== null ? (
          <>
            <Link to="support">Support</Link>
            <Link to="dashboard">Dashboard</Link>

            <a href="#">{user.email}</a>
            <a
              href="#"
              onClick={() => {
                auth
                  .signOut()
                  .then(() => {
                    window.location.href = "/login";
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }}
            >
              Logout
            </a>
          </>
        ) : (
          <a href="login">Login</a>
        )}
      </div>
    </header>
  );
}
