import React from "react";
import firebaseNP from "firebase";
import Header from "../components/Header";
import "../css/dashboard.css";
import { IOrder } from "../interfaces";
import PastOrder from "../components/PastOrder";
import Delivery from "../components/Delivery";
import initFirebase from "../firebaseInit";

const firebase = initFirebase();
const firestore = firebase.firestore();

interface IProps { user: firebaseNP.User}

interface IState { pastOrders: IOrder[], displayedDeliveryId: string }

export default class Dashboard extends React.Component<IProps, IState> {
  retryGet: number;

  constructor(props:IProps) {
    super(props);
    this.state = {
      pastOrders: [],
      displayedDeliveryId: "",
    };
    this.retryGet = 0;
  }

  async componentDidMount() {
    const { user } = this.props;

    const orderRef = firestore.collection("orders");
    const snapshot = await orderRef.where("uid", "==", user.uid).get();

    const pastOrders: IOrder[] = [];
    snapshot.forEach((doc) => {
      pastOrders.push(doc.data() as IOrder);
    });
    this.setState({ pastOrders });
  }

  render() {
    const { user } = this.props;
    const { pastOrders, displayedDeliveryId } = this.state;
    return (
      <div className="App">
        <Header user={user} />
        <div id="dashboard">
          <Delivery deliveryId={displayedDeliveryId} />

          <div id="pastOrders" className="cont">
            <div className="pastOrder">
              <p className="title">Product</p>
              <p className="date">Date</p>
              <p className="qty">Quantity</p>
              <p className="orderNB">
                Order number
              </p>
              <p className="status">Status</p>
            </div>
            {pastOrders.sort((a, b) => b.date.toMillis() - a.date.toMillis()).map((order) => (
              <PastOrder
                order={order}
                onClick={() => {
                  console.log("clicked", order.deliveryId);

                  this.setState({ displayedDeliveryId: order.deliveryId });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
