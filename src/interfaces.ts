import firebaseNP from "firebase";

export interface IOrder {
  date: firebaseNP.firestore.Timestamp;
  deliveryId: string;
  fulfilled: boolean;
  productId: string;
  productName: string;
  quantity: number;
  uid: string;
  orderNb: number
}

export type IPrices = {
        qty: number
        price: number
    }[];

export interface IProduct {
    name: string
    desc: string
    instant: boolean
    prices: IPrices
    disabled: boolean
    stock: number
}
