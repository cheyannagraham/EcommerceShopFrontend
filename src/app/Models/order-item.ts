import {CartItemModel} from './cartItem.model';

export class OrderItem {
  public imageUrl: string;
  public unitPrice: number;
  public productId: number;
  public quantity: number;

  constructor({imageUrl, price, id, quantity}: any) {
    this.imageUrl = imageUrl;
    this.unitPrice = price;
    this.productId = id;
    this.quantity = quantity;

  }
}
