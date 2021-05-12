/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import "../css/login.css";
import initFirebase from '../firebaseInit';

const firebase = initFirebase();
const auth = firebase.auth();

// eslint-disable-next-line max-len
function createAccount(email: string, password: string, setErr:React.Dispatch<React.SetStateAction<string>>) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    window.location.href = "/";
  }).catch((err) => {
    setErr(err.message);
  });
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  return (
    <div id="signup" className="login">
      <h2>Create an account</h2>
      <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirme password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
      <p className="errMessage">{errMessage}</p>
      <input
        type="submit"
        onClick={() => {
          if (password !== repassword) {
            setErrMessage("The passwords didn't match");
            return false;
          }
          return createAccount(email, password, setErrMessage);
        }}
      />
      <p>
        <a
          href="login"

        >
          Login
        </a>
        {' '}
        instead
      </p>
    </div>
  );
}
