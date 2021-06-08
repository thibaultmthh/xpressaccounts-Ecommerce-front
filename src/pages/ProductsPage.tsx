import React from "react";

import firebaseNP from "firebase";

import Header from "../components/Header";
import Product from "../components/Product";
import "../css/productList.css";
import initFirebase from '../firebaseInit';
import { IProduct, ICheckoutProduct } from "../interfaces";
import Checkout from "../components/Checkout";
// eslint-disable-next-line camelcase

const firebase = initFirebase();
const firestore = firebase.firestore();

export default class ProductsPage extends React.Component<{user: firebaseNP.User | null}, {productList: IProduct[], productListId: string[], product: ICheckoutProduct}> {
  constructor(props:{user: firebaseNP.User | null}) {
    super(props);
    this.state = {
      productList: [],
      productListId: [],
      product: {
        id: "",
        qty: 0,
        cost: 0,
        name: "",
        needData: false,
        dataRequest: "",
      },
    };
  }

  async componentDidMount() {
    const productRef = firestore.collection("products");
    const snapshot = await productRef.where("disabled", "==", false).where("stock", ">", 0).get();
    const productList : IProduct[] = [];
    const productListId : string[] = [];
    snapshot.forEach((doc) => {
      productList.push(doc.data() as IProduct);
      productListId.push(doc.id);
    });
    this.setState({ productList, productListId });
  }

  render() {
    const { productList, product, productListId } = this.state;
    const { user } = this.props;
    return (
      <div>
        {product.id ? (
          <Checkout
            product={product}
            onClose={() => {
              this.setState({
                product: {
                  id: "",
                  qty: 0,
                  cost: 0,
                  name: "",
                  needData: false,
                  dataRequest: "",
                },
              });
            }}
          />
        ) : null}
        <Header user={user} />

        <div id="productList">
          {productList.map((p, i) => (
            <Product
              product={p}
              productId={productListId[i]}
              newCheckout={(data: ICheckoutProduct) => {
                //
                this.setState({
                  product: data,
                });
              }}
            />
          ))}

        </div>
      </div>
    );
  }
}
