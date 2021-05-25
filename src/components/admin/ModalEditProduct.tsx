import {
  Button, ButtonGroup, Classes, Dialog, InputGroup, Switch, TextArea,
} from '@blueprintjs/core';
import {
  Column, EditableCell, Table,
} from '@blueprintjs/table';
import * as React from 'react';
import { IPrices, IProduct } from '../../interfaces';
import "@blueprintjs/table/lib/css/table.css";

import initFirebase from '../../firebaseInit';
import { separateur } from '../../constantes';

const firebase = initFirebase();
const firestore = firebase.firestore();

interface IProps {onClose: ()=>void, mode: "add" | string}
interface IState {
    name: string
    desc: string
    prices: IPrices
    instant: boolean

}

export default class ModalEditProduct extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      prices: [{ qty: 2, price: 3 }, { qty: 5, price: 6 }],
      instant: true,

    };
    this.confirmCellEdit = this.confirmCellEdit.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
  }

  componentDidMount() {
    const { mode } = this.props;
    if (mode !== "add") {
      firestore.collection("products").doc(mode).get().then((doc) => {
        if (!doc.exists) {
          console.log("wtf no found");
        } else {
          const {
            name, desc, prices, instant,
          } = doc.data() as IProduct;
          this.setState({
            name, desc, prices, instant,
          });
        }
      });
    }
  }

  confirmCellEdit(v: string, r?: number, c?: number) {
    const { prices } = this.state;

    if (!(v && r !== undefined && c !== undefined)) {
      return;
    }
    if (Number.isNaN(Number(v))) {
      return;
    }

    const newPrices = prices.slice();
    if (c === 0) {
      newPrices[r].qty = Number(v);
    }
    if (c === 1) {
      newPrices[r].price = Number(v);
    }
    this.setState({ prices: newPrices });
    console.log(prices);
  }

  confirmEdit() {
    console.log("coucou");

    const {
      name, desc, prices, instant,
    } = this.state;
    const { mode, onClose } = this.props;
    if (mode === "add") {
      firestore.collection("products").add({
        name,
        desc,
        prices,
        stock: 0,
        instant,
      }).then(() => { onClose(); }).catch((e) => console.log(e));
    } else {
      firestore.collection("products").doc(mode).update({
        name, desc, prices, instant,
      }).then(() => { onClose(); })
        .catch((e) => console.log(e));
    }
  }

  render() {
    const { onClose } = this.props;
    const {
      name, desc, prices, instant,
    } = this.state;
    return (
      <Dialog isOpen title="Edit products" onClose={onClose}>

        <InputGroup
          placeholder="Product name"
          fill
          value={name}
          onChange={(event) => {
            this.setState({ name: event.target.value });
          }}
        />
        <TextArea
          placeholder="Product description"
          fill
          value={desc.replaceAll(separateur, "\n")}
          onChange={(event) => {
            this.setState({ desc: event.target.value.replaceAll("\n", separateur) });
          }}
        />

        <Switch checked={instant} label="instant delivery" onChange={() => { this.setState({ instant: !instant }); }} />

        <p>Set prices : </p>

        <Table numRows={prices.length}>
          <Column
            name="Quantity"
            cellRenderer={(i) => (
              <EditableCell
                value={String(prices[i].qty)}
                rowIndex={i}
                columnIndex={0}
                onChange={this.confirmCellEdit}
                onConfirm={this.confirmCellEdit}
              />
            )}
          />
          <Column
            name="Price ($)"
            cellRenderer={(i) => (
              <EditableCell
                value={String(prices[i].price)}
                rowIndex={i}
                columnIndex={1}
                onChange={this.confirmCellEdit}
                onConfirm={this.confirmCellEdit}
              />
            )}
          />
        </Table>
        <ButtonGroup>
          <Button onClick={() => {
            const newPrices = prices.slice();
            newPrices.push({ qty: 0, price: 0 });
            this.setState({ prices: newPrices });
          }}
          >
            +
          </Button>
          <Button onClick={() => {
            const newPrices = prices.slice();
            newPrices.pop();
            this.setState({ prices: newPrices });
          }}
          >
            -
          </Button>
        </ButtonGroup>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>

            <Button onClick={onClose}>Close</Button>

            <Button
              intent="primary"
              onClick={this.confirmEdit}
            >
              Edit product
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
