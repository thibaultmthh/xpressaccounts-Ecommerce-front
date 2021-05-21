import {
  Button, Classes, Dialog, TextArea,
} from "@blueprintjs/core";
import React from "react";
import firebaseNP from "firebase";

import initFirebase from '../../firebaseInit';

const firebase = initFirebase();
const firestore = firebase.firestore();

interface IProps {onClose: ()=>void, productId: string}

interface IState {
    stock: string[]
}

export default class ModalEditStockx extends React.Component<IProps, IState> {
  docRef: firebaseNP.firestore.DocumentReference | undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {
      stock: [],
    };
    this.confirm = this.confirm.bind(this);
  }

  async componentDidMount() {
    const { productId } = this.props;
    const snapshot = await firestore.collection("stocks").where("productId", "==", productId).get();
    if (snapshot.empty) {
      this.docRef = await firestore.collection("stocks").add({ stock: [], productId });
    }
    let stock: string[] = [];
    snapshot.forEach((doc) => {
      stock = doc.data().stock;
      this.docRef = doc.ref;
    });
    this.setState({ stock });
  }

  async confirm() {
    let { stock } = this.state;
    const { onClose, productId } = this.props;
    const docAtm = await this.docRef?.get();
    if (!docAtm?.exists) {
      console.log("oo");
      alert("Error doc not exits");
      onClose();
      return;
    }
    stock = stock.filter((x) => !docAtm?.data()?.alreadySold.includes(x));
    this.docRef?.update({ stock });
    firestore.collection("products").doc(productId).update({ stock: stock.length });
    onClose();
  }

  render() {
    const { onClose } = this.props;
    const { stock } = this.state;
    return (
      <Dialog isOpen onClose={onClose} style={{ minHeight: "300px" }}>
        <p>
          Current stock :
          {stock.length}
        </p>
        <TextArea fill value={stock.join("\n")} onChange={(e) => { this.setState({ stock: e.target.value.split("\n") }); }} />
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>

            <Button onClick={onClose}>Close</Button>

            <Button
              intent="primary"
              onClick={this.confirm}

            >
              Add stock
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
