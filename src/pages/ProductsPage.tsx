import React from "react";

import firebaseNP from "firebase";
import { Button } from "@blueprintjs/core";
import Header from "../components/Header";
import Product from "../components/Product";
import "../css/productList.css";
import initFirebase from '../firebaseInit';
import { IProduct } from "../interfaces";
import Checkout from "../components/Checkout";
// eslint-disable-next-line camelcase

const firebase = initFirebase();
const firestore = firebase.firestore();

export default class ProductsPage extends React.Component<{user: firebaseNP.User | null}, {productList: IProduct[], product: {id: string, qty: number}}> {
  constructor(props:{user: firebaseNP.User | null}) {
    super(props);
    this.state = {
      productList: [],
      product: {
        id: "",
        qty: 0,
      },
    };
  }

  async componentDidMount() {
    const productRef = firestore.collection("products");
    const snapshot = await productRef.where("disabled", "==", false).where("stock", ">", 0).get();
    const productList : IProduct[] = [];
    snapshot.forEach((doc) => {
      productList.push(doc.data() as IProduct);
    });
    this.setState({ productList });
  }

  render() {
    const { productList, product } = this.state;
    const { user } = this.props;
    return (
      <div>
        {product.id ? <Checkout product={product} onClose={() => { this.setState({ product: { id: "", qty: 0 } }); }} /> : null}
        <Header user={user} />
        <Button onClick={() => { this.setState({ product: { id: "okk", qty: 1 } }); }}>okkk</Button>
        <div id="productList">
          {productList.map((p) => <Product product={p} />)}

        </div>
      </div>
    );
  }
}
