import {ProductModel} from './product.model';

export class CartItemModel {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  constructor(public product: ProductModel, public quantity: number = 1) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.price = product.unitPrice;
  }
}
