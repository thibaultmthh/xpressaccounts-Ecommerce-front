import React from "react";
import firebaseNP from "firebase";
import Header from "../components/Header";
import Product, { IProduct } from "../components/Product";
import "../css/productList.css";
import initFirebase from '../firebaseInit';

const firebase = initFirebase();
const firestore = firebase.firestore();

export default class ProductsPage extends React.Component<{user: firebaseNP.User | null}, {productList: IProduct[]}> {
  constructor(props:{user: firebaseNP.User | null}) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  async componentDidMount() {
    const productRef = firestore.collection("products");
    const snapshot = await productRef.where("stock", ">", 0).get();
    const productList : IProduct[] = [];
    snapshot.forEach((doc) => {
      productList.push(doc.data() as IProduct);
    });
    this.setState({ productList });
  }

  render() {
    const { productList } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Header user={user} />
        <div id="productList">
          {productList.map((p) => <Product product={p} />)}

        </div>
      </div>
  );
  }
}
