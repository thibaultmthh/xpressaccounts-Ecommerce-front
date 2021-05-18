import React from "react";
import { Button } from "@blueprintjs/core";
import { IProduct, IOrder } from "../interfaces";
import AdminProduct from "../components/admin/AdminProduct";
import OpenOrder from "../components/admin/OpenOrder";
import ClosedOrder from "../components/admin/ClosedOrder";
import ModalEditProduct from "../components/admin/ModalEditProduct";
import ModalEditStock from "../components/admin/ModalEditStock";

import initFirebase from '../firebaseInit';

import "@blueprintjs/core/lib/css/blueprint.css";
import "../css/adminProduct.css";

const firebase = initFirebase();
const firestore = firebase.firestore();

interface IState {
    productList: IProduct[]
    productIdList: string[]
    openOrders: IOrder[]
    openOrdersID: string[]
    endedOrders: IOrder[]
    newProductOpen: boolean
    newProductOpenMode: string
    editStockId: string
}

export default class Admin extends React.Component<{}, IState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      productList: [], openOrders: [], endedOrders: [], newProductOpen: false, productIdList: [], openOrdersID: [], newProductOpenMode: "", editStockId: "",
    };
    this.refreshLists = this.refreshLists.bind(this);
  }

  async componentDidMount() {
    this.refreshLists();
  }

  refreshLists() {
    const productRef = firestore.collection("products");
    productRef.where("disabled", "==", false).get().then((snapshot) => {
      const productList : IProduct[] = [];
      const productIdList : string[] = [];
      snapshot.forEach((doc) => {
        productList.push(doc.data() as IProduct);
        productIdList.push(doc.id);
      });
      this.setState({ productList });
      this.setState({ productIdList });
    });

    const ordersRef = firestore.collection("orders");
    ordersRef.where("fulfilled", "!=", true).get().then((snapshot) => {
      const openOrders : IOrder[] = [];
      const openOrdersID: string[] = [];
      snapshot.forEach((doc) => {
        openOrders.push(doc.data() as IOrder);
        openOrdersID.push(doc.id);
      });
      this.setState({ openOrders });
      this.setState({ openOrdersID });
    });
    ordersRef.where("fulfilled", "==", true).get().then((snapshot) => {
      const endedOrders : IOrder[] = [];
      snapshot.forEach((doc) => {
        endedOrders.push(doc.data() as IOrder);
      });
      this.setState({ endedOrders });
    });
  }

  render() {
    const {
      productList, openOrders, endedOrders, newProductOpen, productIdList, openOrdersID, newProductOpenMode, editStockId,
    } = this.state;

    return (
      <div id="admin">
        {newProductOpen ? <ModalEditProduct mode={newProductOpenMode} onClose={() => { this.setState({ newProductOpen: false }); this.refreshLists(); }} /> : null}

        {editStockId ? <ModalEditStock onClose={() => { this.setState({ editStockId: "" }); this.refreshLists(); }} productId={editStockId} /> : "" }

        <div id="products">
          <h2>Products : </h2>
          <Button intent="primary" onClick={() => { this.setState({ newProductOpen: !newProductOpen, newProductOpenMode: "add" }); }}>New product</Button>
          <div className="adminList">

            {
                productList.map((product, i) => (
                  <AdminProduct
                    key={product.name}
                    productId={productIdList[i]}
                    product={product}
                    refresh={this.refreshLists}
                    editButton={() => { this.setState({ newProductOpen: true, newProductOpenMode: productIdList[i] }); }}
                    editStockButton={() => {
                      this.setState({ editStockId: productIdList[i] });
                    }}
                  />
                ))
            }
          </div>
        </div>
        <div id="open orders">
          <h2>Open orders</h2>

          <div className="adminList">
            {openOrders.map((order, i) => <OpenOrder order={order} refresh={this.refreshLists} orderId={openOrdersID[i]} />)}

          </div>
        </div>
        <div id="closed order">
          <h2>Closed orders</h2>

          <div className="adminList">
            {endedOrders.map((order) => <ClosedOrder order={order} />)}
          </div>
        </div>
      </div>
    );
  }
}
