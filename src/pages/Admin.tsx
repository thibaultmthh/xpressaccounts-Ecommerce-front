import React from "react";
import { Button } from "@blueprintjs/core";
import { IProduct, IOrder, ICoupon } from "../interfaces";
import AdminProduct from "../components/admin/AdminProduct";
import OpenOrder from "../components/admin/OpenOrder";
import Coupon from "../components/admin/Coupon";
import ClosedOrder from "../components/admin/ClosedOrder";
import ModalEditProduct from "../components/admin/ModalEditProduct";
import ModalEditStock from "../components/admin/ModalEditStock";
import ModalNewCoupon from "../components/admin/ModalNewCoupon";

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
    coupons: ICoupon[],
    couponsId: string[],
    newCouponOpen: boolean
}

export default class Admin extends React.Component<{}, IState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      productList: [], openOrders: [], endedOrders: [], newProductOpen: false, productIdList: [], openOrdersID: [], newProductOpenMode: "", editStockId: "", coupons: [], couponsId: [], newCouponOpen: false,
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

    const couponsRef = firestore.collection("coupons");

    couponsRef.get().then((snapshot) => {
      const coupons: ICoupon[] = [];
      const couponsId: string[] = [];
      snapshot.forEach((doc) => {
        coupons.push(doc.data() as ICoupon);
        couponsId.push(doc.id);
      });
      console.log(coupons, "coupons", couponsId);
      this.setState({ coupons, couponsId });
    });
  }

  render() {
    const {
      productList, openOrders, endedOrders, newProductOpen, productIdList, openOrdersID, newProductOpenMode, editStockId, coupons, couponsId, newCouponOpen,
    } = this.state;
    console.log(couponsId);

    return (
      <div id="admin">
        {newProductOpen ? <ModalEditProduct mode={newProductOpenMode} onClose={() => { this.setState({ newProductOpen: false }); this.refreshLists(); }} /> : null}

        {editStockId ? <ModalEditStock onClose={() => { this.setState({ editStockId: "" }); this.refreshLists(); }} productId={editStockId} /> : "" }

        {newCouponOpen ? <ModalNewCoupon onClose={() => { this.setState({ newCouponOpen: false }); this.refreshLists(); }} /> : null}
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
        <div id="coupons">
          <h2>Coupons</h2>
          <Button onClick={() => this.setState({ newCouponOpen: true })} intent="primary">Create a coupon</Button>
          <div className="adminList">
            {coupons.map((coupon, i) => <Coupon coupon={coupon} id={couponsId[i]} refresh={this.refreshLists} />)}
          </div>
        </div>
      </div>
    );
  }
}
