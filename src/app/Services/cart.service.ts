import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CartItemModel} from '../Models/cartItem.model'
import {ProductModel} from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new Map<number, CartItemModel>();
  public totalItems = new Subject<number>();
  public totalCost = new Subject<number>();

  constructor() {
  }

  addToCart(product: ProductModel) {
    let item = this.cart.get(product.id);
    if (item) item.quantity++;
    else {
      item = new CartItemModel(product);
      this.cart.set(product.id, item);
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

    this.totalCost.next(cost);
    this.totalItems.next(quantity);
  }

  updateCart() {}
}
