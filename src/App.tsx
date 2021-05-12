import React from 'react';
import { Route, Switch } from "react-router-dom";
import firebaseNP from "firebase";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import "./css/base.css";
import initFirebase from "./firebaseInit";
import ProductsPage from './pages/ProductsPage';
import "firebase/analytics";

const firebase = initFirebase();
firebase.analytics();

const auth = firebase.auth();

export default class App extends React.Component<{}, {user: firebaseNP.User | null}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      user: null,
    };
  }

    componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  };

  render() {
    const { user } = this.state;
    console.log(user);

  return (
    <Switch>
      <Route exact path="/"><HomePage user={user} /></Route>
      <Route
        path="/login"
      >
        <LoginPage user={user} />
      </Route>
      <Route
        path="/signup"
      >
        <SignupPage user={user} />
      </Route>
      <Route path="/products">
        <ProductsPage user={user} />
      </Route>

    </Switch>
  );
}
}
