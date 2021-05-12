/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import "../css/login.css";
import initFirebase from '../firebaseInit';

const firebase = initFirebase();
const auth = firebase.auth();

function loginfb(email:string, password: string, setErr:React.Dispatch<React.SetStateAction<string>>) {
  auth.signInWithEmailAndPassword(email, password).then(() => { window.location.href = "/"; }).catch((err) => {
    setErr(err.message);
  });
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  return (
    <div id="login" className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
      <p className="errMessage">{errMessage}</p>
      <input
        type="submit"
        onClick={() => {
          loginfb(email, password, setErrMessage);
      }}
      />
      <p>
        <a href="signup">Create an account</a>
        {' '}
        instead
      </p>
    </div>
  );
}
