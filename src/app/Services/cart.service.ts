import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CartItemModel} from '../Models/cartItem.model'
import {ProductModel} from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Map<number, CartItemModel>();
  private totalItems = new Subject<number>();
  private totalCost = new Subject<number>();

  constructor() {
  }

  addToCart(product: ProductModel) {
    let item = this.cart.get(product.id);
    if (item) item.quantity++;
    else {
      let cartItem: CartItemModel = new CartItemModel(product);
      this.cart.set(product.id, cartItem);
    }
    this.calculateCartTotals();
  }

  // Wouldnt calculate cart like this. instead would +- for each item, not recalculate whole cart
  calculateCartTotals() {
    let quantity = 0;
    let cost = 0;

    this.cart.forEach((cartItem: CartItemModel) => {
      quantity += cartItem.quantity;
      cost += (cartItem.quantity * cartItem.price);
    });

    console.log("ITEMS IN CART " ,quantity);
    console.log("Cost of CART " , cost);

    this.totalCost.next(cost);
    this.totalItems.next(quantity);

  }
}
