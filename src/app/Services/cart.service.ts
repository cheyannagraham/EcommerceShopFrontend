import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {CartItemModel} from '../Models/cartItem.model'
import {ProductModel} from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart = new Map<number, CartItemModel>();
  public totalItems = new BehaviorSubject<number>(0);
  public totalCost = new BehaviorSubject<number>(0);
  public cartStorage: Storage = localStorage;

  constructor() {
    let cart = JSON.parse(this.cartStorage.getItem('cart'));
    console.log("Retrieved from storage", cart);
    for (let item in cart) {
      this.cart.set(Number(item), cart[item]);
    }
    if(this.cart.size > 0) this.calculateCartTotals();
  }

  addToCart(product: ProductModel) {
    let item = this.cart.get(product.id);
    if (item) item.quantity++;
    else {
      item = new CartItemModel(product);
      this.cart.set(product.id, item);
    }
    // add cart to local storage
    this.cartStorage.setItem('cart', JSON.stringify(Object.fromEntries(this.cart)));
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
    return cost;
  }

  resetCart() {
    this.cart.clear();
    this.cartStorage.removeItem('cart');
    this.calculateCartTotals();
  }
}
