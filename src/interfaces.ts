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
  orderId: number
  email: string
  dataRequested: string
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
    needData: boolean
    dataRequest: string
    stock: number
    lockedStock: number
}

export interface ICoupon {
  currentU: number,
  maxU: number,
  percentOff: number
}

export interface ICheckoutProduct {
  id: string
  qty: number
  cost: number
   name:string
   coupon?: string
    needData: boolean
    dataRequest: string
    dataRequested?: string
  }
